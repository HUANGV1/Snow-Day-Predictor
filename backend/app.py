from fastapi import FastAPI
from pydantic import BaseModel
from model import predict_snowday

app = FastAPI(title="Snowday Predictor API")

class PredictRequest(BaseModel):
    snowfall_overnight_cm: float
    snowfall_24h_cm: float
    temp_min_overnight_c: float
    wind_gust_overnight_kmh:float

@app.post("/predict")
def predict(request : PredictRequest):
    return predict_snowday(request.dict())