import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.metrics import mean_squared_error, r2_score
# from tensorflow.keras.models import Sequential
# from tensorflow.keras.layers import Dense
# from tensorflow.keras.callbacks import EarlyStopping
import joblib  # <--- import joblib for saving preprocessor

# === Load dataset and drop rows with missing target ===
df = pd.read_csv("Solar_Dataset_Scored.csv")
df = df.dropna(subset=['score'])  # ← remove rows where y is NaN

# === Features and target ===
features = [
    'lat', 'lon', 'rainfall', 'solar_radiation',
    'solar_irradiance_kWh/m2/day', 'avg_temp_C',
    'avg_humidity_%', 'api_elevation', 'lulc_class'
]
target = 'score'
X = df[features]
y = df[target]

# === Stratified binning of target for splits ===
y_bins = pd.qcut(y, q=5, labels=False)

# First split: train vs. temp (val+test)
X_train, X_temp, y_train, y_temp = train_test_split(
    X, y,
    test_size=0.3,
    stratify=y_bins,
    random_state=42
)

# Bin y_temp into 2 groups for val/test split
y_temp_bins = pd.qcut(y_temp, q=2, labels=False)
X_val, X_test, y_val, y_test = train_test_split(
    X_temp, y_temp,
    test_size=0.5,
    stratify=y_temp_bins,
    random_state=42
)

# === Preprocessing pipeline ===
numeric_features = X.select_dtypes(include=np.number).columns.tolist()
categorical_features = ['lulc_class']

preprocessor = ColumnTransformer([
    ('num', StandardScaler(), numeric_features),
    ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features),
])

# Fit preprocessor on training data and transform
X_train_processed = preprocessor.fit_transform(X_train)

# Save the fitted preprocessor to a joblib file for future use
joblib.dump(preprocessor, 'solar_preprocessor.joblib')

# Transform validation and test data
X_val_processed   = preprocessor.transform(X_val)
X_test_processed  = preprocessor.transform(X_test)

# === Build & compile model ===
model = Sequential([
    Dense(64, activation='relu', input_shape=(X_train_processed.shape[1],)),
    Dense(32, activation='relu'),
    Dense(1)
])
model.compile(optimizer='adam', loss='mse', metrics=['mae'])

# === Train with early stopping ===
early_stop = EarlyStopping(patience=10, restore_best_weights=True)
history = model.fit(
    X_train_processed, y_train,
    validation_data=(X_val_processed, y_val),
    epochs=100,
    batch_size=32,
    callbacks=[early_stop],
    verbose=0
)

# === Predictions ===
y_train_pred = model.predict(X_train_processed).flatten()
y_val_pred   = model.predict(X_val_processed).flatten()
y_test_pred  = model.predict(X_test_processed).flatten()

# === Metrics helper ===
def print_metrics(name, y_true, y_pred):
    rmse = np.sqrt(mean_squared_error(y_true, y_pred))  # RMSE = sqrt(MSE)
    r2   = r2_score(y_true, y_pred)
    print(f"{name} RMSE: {rmse:.2f}, R²: {r2:.2f}")

print_metrics("Train",      y_train, y_train_pred)
print_metrics("Validation", y_val,   y_val_pred)
print_metrics("Test",       y_test,  y_test_pred)

# === Save model & predictions ===
model.save('nn_model.h5')
pd.DataFrame({'Actual': y_test.values, 'Predicted': y_test_pred}) \
  .to_csv('nn_predictions.csv', index=False)

# === Plotting function ===
def plot_actual_vs_pred(y_true, y_pred, title, filename):
    plt.figure(figsize=(6, 6))
    plt.scatter(y_true, y_pred, alpha=0.5, edgecolor='k')
    mn = min(y_true.min(), y_pred.min())
    mx = max(y_true.max(), y_pred.max())
    plt.plot([mn, mx], [mn, mx], 'r--')
    plt.xlabel("Actual Score")
    plt.ylabel("Predicted Score")
    plt.title(title)
    plt.grid(True)
    plt.savefig(filename, dpi=300)
    plt.close()

# Save scatter plots
plot_actual_vs_pred(y_train, y_train_pred, "Train: Actual vs Predicted", "nn_train_plot.png")
plot_actual_vs_pred(y_val,   y_val_pred,   "Validation: Actual vs Predicted", "nn_val_plot.png")
plot_actual_vs_pred(y_test,  y_test_pred,  "Test: Actual vs Predicted", "nn_test_plot.png")

# === Plot training loss curve ===
plt.figure()
plt.plot(history.history['loss'], label='Train Loss')
plt.plot(history.history['val_loss'], label='Validation Loss')
plt.xlabel("Epochs")
plt.ylabel("Loss (MSE)")
plt.title("NN Training Loss Curve")
plt.legend()
plt.grid(True)
plt.savefig("nn_loss_curve.png", dpi=300)
plt.close()