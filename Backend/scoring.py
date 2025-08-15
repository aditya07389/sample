import pandas as pd

# === Step 1: Load dataset ===
original_df = pd.read_csv("Solar_Dataset.csv")

# === Step 2: Z-score normalize selected features ===
features = [
    'solar_radiation',
    'solar_irradiance_kWh/m2/day',
    'rainfall',
    'avg_temp_C',
    'avg_humidity_%',
    'api_elevation'
]

df = original_df.copy()
for col in features:
    mean = df[col].mean()
    std = df[col].std(ddof=0)
    df[col + '_z'] = (df[col] - mean) / std

# === Step 3: LULC Mapping to Raw Scores with Null fill ===
lulc_score_map = {
    "Evergreen Needleleaf Forest":        -1.0,
    "Evergreen Broadleaf Forest":        -1.0,
    "Deciduous Needleleaf Forest":       -0.8,
    "Deciduous Broadleaf Forest":        -0.8,
    "Mixed Forests":                     -0.8,
    "Closed Shrublands":                  0.8,
    "Open Shrublands":                    0.8,
    "Woody Savannas":                     0.4,
    "Savannas":                           0.4,
    "Grasslands":                         0.7,
    "Permanent Wetlands":                -1.0,
    "Croplands":                          0.5,
    "Cropland/Natural Vegetation Mosaic": 0.5,
    "Urban and Built-up":                 0.2,
    "Water Bodies":                      -1.0,
    "Snow and Ice":                      -1.0,
    "Barren or Sparsely Vegetated":       1.0,
    "Others":                            0.0,
}


df['lulc_class'] = df['lulc_class'].fillna("Others")
df['lulc_raw_score'] = df['lulc_class'].map(lulc_score_map).fillna(0.0)

# === Step 4: Normalized AHP Weights ===
weights = {
    'solar_radiation_z':             0.26,
    'solar_irradiance_kWh/m2/day_z':0.24,
    'rainfall_z':                   -0.15,
    'avg_temp_C_z':                  -0.04,
    'avg_humidity_%_z':             -0.13,
    'api_elevation_z':               -0.06,
    'lulc_raw_score':                0.12,
}
# === Step 5: Compute Weighted AHP Raw Score ===
df['score_raw'] = sum(df[col] * w for col, w in weights.items())

# === Step 6: Threshold Penalty/Bonus Logic ===
def threshold_adjustment(row):
    penalty = 0

    # Elevation penalty: >1000 m is less desirable
    if row['api_elevation'] > 1500:
        penalty -= 0.2
    elif row['api_elevation'] > 1000:
        penalty -= 0.1

    # Rainfall penalty: >1200 mm reduces GHI
    if row['rainfall'] > 2000:
        penalty -= 0.3
    elif row['rainfall'] > 1500:
        penalty -= 0.2
    elif row['rainfall'] > 1200:
        penalty -= 0.1

    # Humidity penalty: >75% is unfavorable
    if row['avg_humidity_%'] > 85:
        penalty -= 0.3
    elif row['avg_humidity_%'] > 75:
        penalty -= 0.2
    elif row['avg_humidity_%'] > 70:
        penalty -= 0.1

    # Irradiance (GHI) penalty: <4.5 very poor, <5.0 still poor
    if row['solar_irradiance_kWh/m2/day'] < 4.5:
        penalty -= 0.3
    elif row['solar_irradiance_kWh/m2/day'] < 5.0:
        penalty -= 0.1
    elif row['solar_irradiance_kWh/m2/day'] > 6.0:
        penalty += 0.1  # Bonus for high GHI

    # Temperature penalty: above 30 °C hurts panel efficiency
    if row['avg_temp_C'] > 35:
        penalty -= 0.2
    elif row['avg_temp_C'] > 30:
        penalty -= 0.1
    elif row['avg_temp_C'] < 25:
        penalty += 0.05  # Slight bonus for cooler sites

    return penalty


df['penalty'] = df.apply(threshold_adjustment, axis=1)

# === Step 7: Combine AHP Score and Thresholds ===
df['score_adjusted'] = df['score_raw'] + df['penalty']

# === Step 8: Normalize final score to 0–100 range using percentile rank ===
df['score'] = df['score_adjusted'].rank(pct=True) * 100

# === Optional: Save normalized features ===
norm_feats = [f + '_z' for f in features]
df[norm_feats].to_csv("Normalized_Features.csv", index=False)
print(" Z-score normalized features saved to Normalized_Features.csv")

# === Save scores only ===
df[['score']].to_csv("Scores_Only.csv", index=False)
print(" Percentile-based scores saved to Scores_Only.csv")

# === Final output: original data + score ===
final_df = original_df.copy()
final_df['score'] = df['score']
final_df.to_csv("Solar_Dataset_With_Score_Test.csv", index=False)
print(" Final dataset with score saved to Solar_Dataset_With_Score_Test.csv")