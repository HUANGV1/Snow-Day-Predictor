"use client";

import { Brain, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PredictionCardsProps {
  modelProbability: number;
  crowdProbability: number;
}

export function PredictionCards({ modelProbability, crowdProbability }: PredictionCardsProps) {
  const getColorClass = (value: number) => {
    if (value >= 70) return "text-success";
    if (value >= 40) return "text-warning";
    return "text-muted-foreground";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Brain className="h-4 w-4" />
            Model Prediction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-2">
            <span className={cn("text-4xl font-bold font-mono", getColorClass(modelProbability))}>
              {modelProbability}%
            </span>
            <span className="text-sm text-muted-foreground mb-1">ML model</span>
          </div>
          <div className="mt-3 h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all duration-500", {
                "bg-success": modelProbability >= 70,
                "bg-warning": modelProbability >= 40 && modelProbability < 70,
                "bg-muted-foreground": modelProbability < 40,
              })}
              style={{ width: `${modelProbability}%` }}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Users className="h-4 w-4" />
            Crowd Prediction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-2">
            <span className={cn("text-4xl font-bold font-mono", getColorClass(crowdProbability))}>
              {crowdProbability}%
            </span>
            <span className="text-sm text-muted-foreground mb-1">market price</span>
          </div>
          <div className="mt-3 h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all duration-500", {
                "bg-success": crowdProbability >= 70,
                "bg-warning": crowdProbability >= 40 && crowdProbability < 70,
                "bg-muted-foreground": crowdProbability < 40,
              })}
              style={{ width: `${crowdProbability}%` }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
