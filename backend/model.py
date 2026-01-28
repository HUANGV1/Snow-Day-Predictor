import joblib
import pandas as pd

FEATURES = [
    "snowfall_overnight_cm",
    "snowfall_24h_cm",
    "temp_min_overnight_c",
    "wind_gust_overnight_kmh"
]


model = joblib.load("../snowday_model.pkl")
scaler = joblib.load("../snowday_scaler.pkl")

def predict_snowday(features: dict):
    X = pd.DataFrame([features], columns=FEATURES)
    X_scaled = scaler.transform(X)

    prob = model.predict_proba(X_scaled)[0, 1]

    contributions = X_scaled[0] * model.coef_[0]
    explanation = sorted(
        zip(FEATURES, contributions),
        key=lambda x: abs(x[1]),
        reverse=True
    )

    return {
        "probability": prob,
        "top_factors": [
            {"feature": f, "impact": float(v)}
            for f, v in explanation[:3]
        ]
    }
