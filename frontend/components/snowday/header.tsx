"use client";

import { Snowflake, Wallet, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { userStats, marketData } from "@/lib/mock-data";
import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-primary/20 flex items-center justify-center">
              <Snowflake className="h-5 w-5 text-primary" />
            </div>
            <span className="text-lg font-semibold text-foreground">SnowDay</span>
          </div>
          <Badge variant="secondary" className="hidden sm:flex">
            Beta
          </Badge>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary">
            <Wallet className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium font-mono">{marketData.userBalance.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground">pts</span>
          </div>
          
          <Link href="/account">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>

          <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-sm font-medium text-primary">
              #{userStats.rank}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
