"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Star, Target, Zap, Snowflake, Sun, Eye, Clock } from "lucide-react";
import { userStats } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const allBadges = [
  {
    id: "weather-prophet",
    name: "Weather Prophet",
    description: "Predicted 10+ snow days correctly",
    icon: Star,
    earned: false,
  },
  {
    id: "snowday-sniper",
    name: "Snowday Sniper",
    description: "5 correct predictions in a row",
    icon: Target,
    earned: false,
  },
  {
    id: "winter-watcher",
    name: "Winter Watcher",
    description: "Active for entire winter season",
    icon: Eye,
    earned: true,
  },
  {
    id: "storm-chaser",
    name: "Storm Chaser",
    description: "Predicted during 3 major storms",
    icon: Zap,
    earned: false,
  },
  {
    id: "early-bird",
    name: "Early Bird",
    description: "First to predict 24h+ in advance",
    icon: Clock,
    earned: true,
  },
  {
    id: "frost-finder",
    name: "Frost Finder",
    description: "90%+ accuracy in a month",
    icon: Snowflake,
    earned: false,
  },
];

export function UserBadges() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          Your Badges
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {userStats.badges.length} of {allBadges.length} earned
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {allBadges.map((badge) => {
            const isEarned = userStats.badges.includes(badge.name);
            const Icon = badge.icon;
            return (
              <div
                key={badge.id}
                className={cn(
                  "p-4 rounded-lg border text-center transition-all",
                  isEarned
                    ? "bg-primary/10 border-primary/20"
                    : "bg-secondary border-border opacity-50"
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center",
                    isEarned ? "bg-primary/20" : "bg-muted"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5",
                      isEarned ? "text-primary" : "text-muted-foreground"
                    )}
                  />
                </div>
                <div
                  className={cn(
                    "text-xs font-medium mb-1",
                    isEarned ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {badge.name}
                </div>
                <div className="text-[10px] text-muted-foreground line-clamp-2">
                  {badge.description}
                </div>
              </div>
            );
          })}
        </div>

        {/* Season Summary */}
        <div className="mt-6 p-4 bg-secondary rounded-lg">
          <h4 className="text-sm font-medium text-foreground mb-3">
            Season Summary
          </h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold font-mono text-primary">
                {userStats.correctPredictions}
              </div>
              <div className="text-xs text-muted-foreground">Correct</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-foreground">
                {userStats.totalPredictions}
              </div>
              <div className="text-xs text-muted-foreground">Total</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-success">
                {userStats.currentStreak}
              </div>
              <div className="text-xs text-muted-foreground">Streak</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
