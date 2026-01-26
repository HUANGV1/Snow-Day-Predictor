"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Wallet, ArrowRightLeft } from "lucide-react";
import { marketData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function TradingPanel() {
  const [selectedOutcome, setSelectedOutcome] = useState<"yes" | "no">("yes");
  const [amount, setAmount] = useState("");
  const [action, setAction] = useState<"buy" | "sell">("buy");

  const price = selectedOutcome === "yes" ? marketData.yesPrice : marketData.noPrice;
  const shares = amount ? Math.floor(Number(amount) / price) : 0;
  const potentialPayout = shares * 1;

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ArrowRightLeft className="h-5 w-5 text-primary" />
            Prediction Market
          </CardTitle>
          <Badge variant="secondary" className="font-mono">
            24h Vol: {marketData.volume24h.toLocaleString()} pts
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Contract Prices */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setSelectedOutcome("yes")}
            className={cn(
              "p-4 rounded-lg border-2 transition-all text-left",
              selectedOutcome === "yes"
                ? "border-success bg-success/10"
                : "border-border bg-secondary hover:border-muted-foreground"
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-foreground">YES</span>
              <TrendingUp className={cn("h-4 w-4", selectedOutcome === "yes" ? "text-success" : "text-muted-foreground")} />
            </div>
            <div className="text-3xl font-bold font-mono text-success">
              ${marketData.yesPrice.toFixed(2)}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {Math.round(marketData.yesPrice * 100)}% implied
            </div>
          </button>

          <button
            onClick={() => setSelectedOutcome("no")}
            className={cn(
              "p-4 rounded-lg border-2 transition-all text-left",
              selectedOutcome === "no"
                ? "border-destructive bg-destructive/10"
                : "border-border bg-secondary hover:border-muted-foreground"
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-foreground">NO</span>
              <TrendingDown className={cn("h-4 w-4", selectedOutcome === "no" ? "text-destructive" : "text-muted-foreground")} />
            </div>
            <div className="text-3xl font-bold font-mono text-destructive">
              ${marketData.noPrice.toFixed(2)}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {Math.round(marketData.noPrice * 100)}% implied
            </div>
          </button>
        </div>

        {/* Trading Interface */}
        <Tabs value={action} onValueChange={(v) => setAction(v as "buy" | "sell")}>
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="buy">Buy</TabsTrigger>
            <TabsTrigger value="sell">Sell</TabsTrigger>
          </TabsList>
          <TabsContent value="buy" className="space-y-4 mt-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Amount (points)</label>
              <Input
                type="number"
                placeholder="Enter amount..."
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-secondary border-border font-mono"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Available balance</span>
              <span className="font-mono text-foreground">{marketData.userBalance.toLocaleString()} pts</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Shares to receive</span>
              <span className="font-mono text-foreground">{shares}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Potential payout</span>
              <span className="font-mono text-success">{potentialPayout.toLocaleString()} pts</span>
            </div>
            <Button 
              className={cn(
                "w-full",
                selectedOutcome === "yes" 
                  ? "bg-success hover:bg-success/90 text-success-foreground" 
                  : "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              )}
              disabled={!amount || Number(amount) <= 0}
            >
              Buy {selectedOutcome.toUpperCase()} @ ${price.toFixed(2)}
            </Button>
          </TabsContent>
          <TabsContent value="sell" className="space-y-4 mt-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Shares to sell</label>
              <Input
                type="number"
                placeholder="Enter shares..."
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-secondary border-border font-mono"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Your YES position</span>
              <span className="font-mono text-foreground">{marketData.userPosition.yes} shares</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Your NO position</span>
              <span className="font-mono text-foreground">{marketData.userPosition.no} shares</span>
            </div>
            <Button 
              variant="outline"
              className="w-full bg-transparent"
              disabled={!amount || Number(amount) <= 0}
            >
              Sell {selectedOutcome.toUpperCase()} @ ${price.toFixed(2)}
            </Button>
          </TabsContent>
        </Tabs>

        {/* User Position Summary */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center gap-2 mb-3">
            <Wallet className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Your Position</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary rounded-lg p-3">
              <div className="text-sm text-muted-foreground">YES Shares</div>
              <div className="text-xl font-bold font-mono text-success">{marketData.userPosition.yes}</div>
            </div>
            <div className="bg-secondary rounded-lg p-3">
              <div className="text-sm text-muted-foreground">NO Shares</div>
              <div className="text-xl font-bold font-mono text-destructive">{marketData.userPosition.no}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
