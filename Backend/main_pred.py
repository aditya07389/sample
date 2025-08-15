import pandas as pd
import numpy as np
# from geopy.geocoders import Nominatim
# from geopy.distance import geodesic
# from tensorflow.keras.models import load_model
import joblib

# === Helper functions ===

def get_coordinates(location_name):
    geolocator = Nominatim(user_agent="solar_nn_predictor")
    location = geolocator.geocode(location_name)
    if location:
        return location.latitude, location.longitude
    else:
        print(f"Location '{location_name}' not found.")
        return None, None

def get_region_bounds(latitude, longitude, offset=0.2):
    """
    Returns bounding box [lat_min, lat_max, lon_min, lon_max]
    around the point with specified offset in degrees.
    """
    return [latitude - offset, latitude + offset, longitude - offset, longitude + offset]

def interpolate_missing_data(df, feature_columns):
    """
    Interpolate and fill missing data in the feature columns.
    """
    df[feature_columns] = df[feature_columns].interpolate(method='linear') \
        .fillna(method='bfill').fillna(method='ffill')
    return df

def find_closest_points(df, lat, lon, n=5):
    """
    Find n closest points in df to given lat/lon.
    """
    df['distance'] = df.apply(lambda row: geodesic((lat, lon), (row['lat'], row['lon'])).km, axis=1)
    closest_df = df.nsmallest(n, 'distance').drop(columns=['distance'])
    return closest_df

def predict_for_locations(df, preprocessor, model, feature_columns):
    """
    Predict solar score for given dataframe df with features.
    """
    X = df[feature_columns]
    X_processed = preprocessor.transform(X)
    preds = model.predict(X_processed).flatten()
    df = df.copy()
    df['predicted_score'] = preds
    return df

# === Main prediction workflow ===

def predict_best_locations_around(location_name):
    # Load your data, model and preprocessor
    dataset_file = "Solar_Dataset_With_Score_Test.csv"
    model_file = "nn_model.h5"
    preprocessor_file = "solar_preprocessor.joblib"

    print(f"Loading dataset from {dataset_file}...")
    df = pd.read_csv(dataset_file)
    df = df.dropna(subset=['score'])  # Drop rows missing target

    print(f"Loading preprocessor from {preprocessor_file}...")
    preprocessor = joblib.load(preprocessor_file)

    print(f"Loading model from {model_file}...")
    model = load_model(model_file,compile=False)

    # Features used for prediction
    feature_columns = [
        'lat', 'lon', 'rainfall', 'solar_radiation',
        'solar_irradiance_kWh/m2/day', 'avg_temp_C',
        'avg_humidity_%', 'api_elevation', 'lulc_class'
    ]

    # Get input location coordinates
    lat, lon = get_coordinates(location_name)
    if lat is None or lon is None:
        return None

    print(f"Coordinates for '{location_name}': Latitude={lat:.5f}, Longitude={lon:.5f}")

    # Get bounding box around location
    region_bounds = get_region_bounds(lat, lon, offset=0.2)  # approx ±0.2 degrees ~ 20-22km
    print(f"Filtering dataset for region bounds: {region_bounds}")

    # Filter dataset within bounding box
    region_df = df[
        (df['lat'] >= region_bounds[0]) & (df['lat'] <= region_bounds[1]) &
        (df['lon'] >= region_bounds[2]) & (df['lon'] <= region_bounds[3])
    ].copy()

    if region_df.empty:
        print("No data points found in the region.")
        return None

    # Interpolate missing data in feature columns (excluding 'lat' and 'lon')
    interp_features = [f for f in feature_columns if f not in ['lat', 'lon']]
    region_df = interpolate_missing_data(region_df, interp_features)

    # Find closest points to user location
    closest_points = find_closest_points(region_df, lat, lon, n=10)

    # Predict solar scores for these points
    predictions_df = predict_for_locations(closest_points, preprocessor, model, feature_columns)

    # Sort by predicted score descending and get top 5
    top5 = predictions_df.sort_values(by='predicted_score', ascending=False).head(5)

    print("\nTop 5 predicted solar scores near your location:")
    print(top5[['lat', 'lon', 'predicted_score']])

    return top5

# === If run as script ===

if __name__ == "__main__":
    location_input = input("Enter a location name (e.g., Bengaluru): ").strip()
    predict_best_locations_around(location_input)