from model import predict_snowday
import json

# Test with sample weather data
test_features = {
    "snowfall_overnight_cm": 5.0,
    "snowfall_24h_cm": 10.0,
    "temp_min_overnight_c": -5.0,
    "wind_gust_overnight_kmh": 30.0
}

result = predict_snowday(test_features)

print("Snow Day Prediction Result:")
print(json.dumps(result, indent=2))
print(f"\nProbability: {result['probability']:.2%}")
print("\nTop Factors:")
for factor in result['top_factors']:
    print(f"  - {factor['feature']}: {factor['impact']:.4f}")
