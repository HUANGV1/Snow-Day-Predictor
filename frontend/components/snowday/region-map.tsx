"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Map, MapPin, Filter } from "lucide-react";
import { regionData, schoolBoards } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function RegionMap() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");

  const getProbabilityColor = (probability: number) => {
    if (probability >= 70) return "bg-success";
    if (probability >= 50) return "bg-warning";
    return "bg-muted-foreground";
  };

  const getProbabilityColorText = (probability: number) => {
    if (probability >= 70) return "text-success";
    if (probability >= 50) return "text-warning";
    return "text-muted-foreground";
  };

  const filteredRegions = regionData.filter((region) => {
    if (filter === "all") return true;
    if (filter === "high") return region.probability >= 70;
    if (filter === "medium") return region.probability >= 50 && region.probability < 70;
    if (filter === "low") return region.probability < 50;
    return true;
  });

  const selectedRegionData = regionData.find((r) => r.id === selectedRegion);

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <CardTitle className="flex items-center gap-2">
            <Map className="h-5 w-5 text-primary" />
            Regional Overview
          </CardTitle>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[140px] bg-secondary border-border">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="high">High (70%+)</SelectItem>
                <SelectItem value="medium">Medium (50-70%)</SelectItem>
                <SelectItem value="low">Low ({"<"}50%)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Mock Map Visualization */}
        <div className="relative bg-secondary rounded-lg p-4 min-h-[400px]">
          {/* Grid overlay to simulate map */}
          <div className="absolute inset-4 grid grid-cols-4 grid-rows-3 gap-2">
            {filteredRegions.map((region) => (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(region.id)}
                className={cn(
                  "relative rounded-lg transition-all hover:scale-105 flex flex-col items-center justify-center gap-2 p-3",
                  getProbabilityColor(region.probability),
                  "bg-opacity-20 hover:bg-opacity-30 border-2",
                  selectedRegion === region.id
                    ? "border-primary ring-2 ring-primary/50"
                    : "border-transparent"
                )}
              >
                <MapPin
                  className={cn(
                    "h-5 w-5",
                    getProbabilityColorText(region.probability)
                  )}
                />
                <span className="text-xs font-medium text-foreground truncate max-w-full">
                  {region.name}
                </span>
                <span
                  className={cn(
                    "text-lg font-bold font-mono",
                    getProbabilityColorText(region.probability)
                  )}
                >
                  {region.probability}%
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-success" />
            <span className="text-sm text-muted-foreground">High (70%+)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-warning" />
            <span className="text-sm text-muted-foreground">Medium (50-70%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-muted-foreground" />
            <span className="text-sm text-muted-foreground">Low ({"<"}50%)</span>
          </div>
        </div>

        {/* Selected Region Details */}
        {selectedRegionData && (
          <div className="mt-4 p-4 bg-secondary rounded-lg border border-border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">
                  {selectedRegionData.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Click for detailed school board info
                </p>
              </div>
              <div className="text-right">
                <div
                  className={cn(
                    "text-3xl font-bold font-mono",
                    getProbabilityColorText(selectedRegionData.probability)
                  )}
                >
                  {selectedRegionData.probability}%
                </div>
                <Badge
                  variant="secondary"
                  className={cn(
                    selectedRegionData.probability >= 70
                      ? "bg-success/20 text-success"
                      : selectedRegionData.probability >= 50
                      ? "bg-warning/20 text-warning"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {selectedRegionData.probability >= 70
                    ? "Likely"
                    : selectedRegionData.probability >= 50
                    ? "Possible"
                    : "Unlikely"}
                </Badge>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
