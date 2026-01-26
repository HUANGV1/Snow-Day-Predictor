"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/snowday/header";
import { MainDashboard } from "@/components/snowday/main-dashboard";
import { TradingPanel } from "@/components/snowday/trading-panel";
import { TimelineChart } from "@/components/snowday/timeline-chart";
import { RegionMap } from "@/components/snowday/region-map";
import { FactorsPanel } from "@/components/snowday/factors-panel";
import { Leaderboard } from "@/components/snowday/leaderboard";
import { UserBadges } from "@/components/snowday/user-badges";
import { LayoutDashboard, LineChart, Map, Trophy } from "lucide-react";

export default function SnowDayPredictorPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-lg mx-auto bg-secondary">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              <span className="hidden sm:inline">Timeline</span>
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-2">
              <Map className="h-4 w-4" />
              <span className="hidden sm:inline">Map</span>
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <span className="hidden sm:inline">Ranks</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <MainDashboard />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TradingPanel />
              <FactorsPanel />
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <TimelineChart />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FactorsPanel />
              <TradingPanel />
            </div>
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <RegionMap />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TimelineChart />
              <FactorsPanel />
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Leaderboard />
              <UserBadges />
            </div>
            <TradingPanel />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>SnowDay Predictor Demo</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
