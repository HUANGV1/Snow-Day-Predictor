"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, TrendingUp, TrendingDown, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { factors } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function FactorsPanel() {
  const maxImpact = Math.max(...factors.map((f) => Math.abs(f.impact)));

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          Why This Prediction?
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Top factors influencing the snow day probability
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {factors.map((factor, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {factor.positive ? (
                  <TrendingUp className="h-4 w-4 text-success" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-destructive" />
                )}
                <span className="text-sm font-medium text-foreground">
                  {factor.name}
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="text-muted-foreground hover:text-foreground">
                        <Info className="h-3.5 w-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{factor.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Badge
                variant="secondary"
                className={cn(
                  factor.positive
                    ? "bg-success/20 text-success"
                    : "bg-destructive/20 text-destructive"
                )}
              >
                {factor.positive ? "+" : ""}{factor.impact}%
              </Badge>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  factor.positive ? "bg-success" : "bg-destructive"
                )}
                style={{
                  width: `${(Math.abs(factor.impact) / maxImpact) * 100}%`,
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground">{factor.description}</p>
          </div>
        ))}

        {/* Summary */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Net positive impact</span>
            <span className="font-mono font-bold text-success">
              +{factors.reduce((sum, f) => sum + f.impact, 0)}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
