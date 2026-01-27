import pandas as pd
import joblib

from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, brier_score_loss

df = pd.read_csv("snow_day_dataset.csv")

FEATURES = [
    "snowfall_overnight_cm",
    "snowfall_24h_cm",
    "temp_min_overnight_c",
    "wind_gust_overnight_kmh"
]

X = df[FEATURES]
y = df["closed"]

# Split data 
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# Scaling
scaler = StandardScaler()

X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Model
model = LogisticRegression(
    solver="lbfgs",
    max_iter=1000,
    l1_ratio=0
)


model.fit(X_train_scaled, y_train)



# Probability of closure
probs = model.predict_proba(X_test_scaled)[:, 1]

preds = (probs >= 0.5).astype(int)
print("Accuracy:", accuracy_score(y_test, preds))

print("Brier score:", brier_score_loss(y_test, probs))

coef_df = pd.DataFrame({
    "feature": FEATURES,
    "coefficient": model.coef_[0]
}).sort_values(by="coefficient", key=abs, ascending=False)

print(coef_df)

def predict_and_explain(input_row, top_k=3):
    X_row = pd.DataFrame(
        [input_row[FEATURES].values],
        columns=FEATURES
    )

    X_scaled = scaler.transform(X_row)
    prob = model.predict_proba(X_scaled)[0, 1]

    contributions = X_scaled[0] * model.coef_[0]

    explanation = sorted(
        zip(FEATURES, contributions),
        key=lambda x: abs(x[1]),
        reverse=True
    )

    return prob, explanation[:top_k]

def pretty_print_prediction(label, row):
    prob, factors = predict_and_explain(row)

    print(f"\n{label}")
    print("-" * len(label))
    print(f"Snow Day Probability: {prob:.2%}")
    print("Top contributing factors:")

    for feature, value in factors:
        direction = "↑" if value > 0 else "↓"
        print(f"  {direction} {feature} ({value:+.2f})")


# Example

# example_row = df.iloc[0]

closed_day = df[df["closed"] == 1].iloc[0]
open_day = df[df["closed"] == 0].iloc[0]

pretty_print_prediction("Known Closed Day", closed_day)
pretty_print_prediction("Known Open Day", open_day)


# Save model and scaler
joblib.dump(model, "snowday_model.pkl")
joblib.dump(scaler, "snowday_scaler.pkl")

print("\nModel and scaler saved.")