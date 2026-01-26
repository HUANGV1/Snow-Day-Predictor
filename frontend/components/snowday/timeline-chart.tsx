"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ReferenceDot,
} from "recharts";
import { Activity, Clock } from "lucide-react";
import { chartData, timelineData } from "@/lib/mock-data";

const chartConfig = {
  probability: {
    label: "Probability",
    color: "var(--color-primary)",
  },
};

export function TimelineChart() {
  // Find events for markers
  const eventsWithData = chartData.filter((item) => item.event);

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Probability Timeline
          </CardTitle>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Last 72 hours</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart
            data={chartData}
            margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
          >
            <defs>
              <linearGradient id="probabilityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--color-border)"
            />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
            />
            <YAxis
              domain={[0, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              tickFormatter={(value) => `${value}%`}
            />
            <ChartTooltip
              content={<ChartTooltipContent labelKey="label" />}
            />
            <Area
              type="monotone"
              dataKey="probability"
              stroke="var(--color-primary)"
              strokeWidth={2}
              fill="url(#probabilityGradient)"
            />
            {/* Event markers */}
            {eventsWithData.map((event, index) => (
              <ReferenceDot
                key={index}
                x={event.label}
                y={event.probability}
                r={6}
                fill="var(--color-primary)"
                stroke="var(--color-background)"
                strokeWidth={2}
              />
            ))}
          </AreaChart>
        </ChartContainer>

        {/* Event Legend */}
        <div className="mt-6 space-y-3">
          <div className="text-sm font-medium text-foreground">Key Events</div>
          <div className="flex flex-wrap gap-2">
            {timelineData
              .filter((item) => item.event)
              .map((item, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  <span className="w-2 h-2 rounded-full bg-primary mr-2" />
                  {item.event}
                </Badge>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
