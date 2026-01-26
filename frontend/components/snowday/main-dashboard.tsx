"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProbabilityGauge } from "./probability-gauge";
import { CountdownTimer } from "./countdown-timer";
import { SchoolSelector } from "./school-selector";
import { PredictionCards } from "./prediction-cards";
import { currentPrediction } from "@/lib/mock-data";
import { TrendingUp, Activity } from "lucide-react";

export function MainDashboard() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="bg-card border-border overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <CardContent className="pt-8 pb-8 relative">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex flex-col items-center lg:items-start gap-6 flex-1">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground text-center lg:text-left text-balance">
                  Snow Day Probability
                </h1>
                <p className="text-muted-foreground mt-1 text-center lg:text-left">
                  Real-time prediction for tomorrow
                </p>
              </div>
              <SchoolSelector />
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-success">
                  <TrendingUp className="h-4 w-4" />
                  <span>+7% in last 6h</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Activity className="h-4 w-4" />
                  <span>High confidence</span>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0">
              <ProbabilityGauge probability={currentPrediction.modelProbability} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Countdown & Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-card border-border lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Decision Countdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CountdownTimer targetDate={currentPrediction.decisionTime} />
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <PredictionCards
            modelProbability={currentPrediction.modelProbability}
            crowdProbability={currentPrediction.crowdProbability}
          />
        </div>
      </div>
    </div>
  );
}
