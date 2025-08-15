from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
# from tensorflow.keras.models import load_model
# from geopy.geocoders import Nominatim
# from geopy.distance import geodesic
import numpy as np

app = Flask(__name__)
CORS(app)

def get_coordinates(location_name):
    geolocator = Nominatim(user_agent="solar_nn_predictor")
    location = geolocator.geocode(location_name)
    if location:
        return location.latitude, location.longitude
    else:
        return None, None

def get_region_bounds(latitude, longitude, offset=0.2):
    return [latitude - offset, latitude + offset, longitude - offset, longitude + offset]

def interpolate_missing_data(df, feature_columns):
    df[feature_columns] = df[feature_columns].interpolate(method='linear') \
        .fillna(method='bfill').fillna(method='ffill')
    return df

def find_closest_points(df, lat, lon, n=5):
    df['distance'] = df.apply(lambda row: geodesic((lat, lon), (row['lat'], row['lon'])).km, axis=1)
    closest_df = df.nsmallest(n, 'distance').drop(columns=['distance'])
    return closest_df

def predict_for_locations(df, preprocessor, model, feature_columns):
    X = df[feature_columns]
    X_processed = preprocessor.transform(X)
    preds = model.predict(X_processed).flatten()
    df = df.copy()
    df['predicted_score'] = preds
    return df

def predict_best_locations_around(location_name):
    dataset_file = "Solar_Dataset_With_Score_Test.csv"
    model_file = "nn_model.h5"
    preprocessor_file = "solar_preprocessor.joblib"

    df = pd.read_csv(dataset_file)
    df = df.dropna(subset=['score'])
    preprocessor = joblib.load(preprocessor_file)
    model = load_model(model_file, compile=False)
    feature_columns = [
        'lat', 'lon', 'rainfall', 'solar_radiation',
        'solar_irradiance_kWh/m2/day', 'avg_temp_C',
        'avg_humidity_%', 'api_elevation', 'lulc_class'
    ]
    lat, lon = get_coordinates(location_name)
    if lat is None or lon is None:
        return None, "Location not found."
    region_bounds = get_region_bounds(lat, lon, offset=0.2)
    region_df = df[
        (df['lat'] >= region_bounds[0]) & (df['lat'] <= region_bounds[1]) &
        (df['lon'] >= region_bounds[2]) & (df['lon'] <= region_bounds[3])
    ].copy()
    if region_df.empty:
        return None, "No data points found in the region."
    interp_features = [f for f in feature_columns if f not in ['lat', 'lon']]
    region_df = interpolate_missing_data(region_df, interp_features)
    closest_points = find_closest_points(region_df, lat, lon, n=10)
    predictions_df = predict_for_locations(closest_points, preprocessor, model, feature_columns)
    top5 = predictions_df.sort_values(by='predicted_score', ascending=False).head(5)
    # Prepare output
    result = []
    for _, row in top5.iterrows():
        result.append({
            "lat": float(row['lat']),
            "lon": float(row['lon']),
            "predicted_score": float(row['predicted_score'])
        })
    return result, None

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    location = data.get('location')
    if not location or not isinstance(location, str):
        return jsonify({"error": "Invalid input. Please provide a location name."}), 400
    try:
        results, error = predict_best_locations_around(location)
        if error:
            return jsonify({"error": error}), 400
        return jsonify({"results": results})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True) 