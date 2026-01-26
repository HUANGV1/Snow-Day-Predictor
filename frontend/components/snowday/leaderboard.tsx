"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Star, Target, Zap, Award } from "lucide-react";
import { leaderboard, userStats } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const getBadgeIcon = (badge: string) => {
  switch (badge) {
    case "Weather Prophet":
      return <Star className="h-3 w-3" />;
    case "Snowday Sniper":
      return <Target className="h-3 w-3" />;
    case "Storm Chaser":
      return <Zap className="h-3 w-3" />;
    default:
      return <Award className="h-3 w-3" />;
  }
};

const getRankIcon = (rank: number) => {
  if (rank === 1)
    return <Trophy className="h-5 w-5 text-warning" />;
  if (rank === 2)
    return <Medal className="h-5 w-5 text-muted-foreground" />;
  if (rank === 3)
    return <Medal className="h-5 w-5 text-warning/60" />;
  return <span className="text-sm font-mono text-muted-foreground">#{rank}</span>;
};

export function Leaderboard() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Top Predictors
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Ranked by prediction accuracy this season
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {leaderboard.map((user, index) => (
          <div
            key={user.rank}
            className={cn(
              "flex items-center gap-4 p-3 rounded-lg transition-colors",
              index === 0
                ? "bg-warning/10 border border-warning/20"
                : "bg-secondary hover:bg-secondary/80"
            )}
          >
            <div className="w-8 flex justify-center">
              {getRankIcon(user.rank)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground truncate">
                  {user.username}
                </span>
                <Badge variant="secondary" className="text-xs flex items-center gap-1">
                  {getBadgeIcon(user.badge)}
                  <span className="hidden sm:inline">{user.badge}</span>
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground">
                {user.predictions} predictions
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold font-mono text-success">
                {user.accuracy}%
              </div>
              <div className="text-xs text-muted-foreground">accuracy</div>
            </div>
          </div>
        ))}

        {/* Current User Card */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center gap-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
            <div className="w-8 flex justify-center">
              <span className="text-sm font-mono font-bold text-primary">
                #{userStats.rank}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">You</span>
                <Badge variant="secondary" className="text-xs">
                  {userStats.currentStreak} streak
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground">
                {userStats.totalPredictions} predictions
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold font-mono text-primary">
                {userStats.accuracy}%
              </div>
              <div className="text-xs text-muted-foreground">accuracy</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
