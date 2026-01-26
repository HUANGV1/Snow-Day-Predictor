"use client";

import { useState } from "react";
import { Header } from "@/components/snowday/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { userStats } from "@/lib/mock-data";
import { ArrowLeft, Mail, User, Settings, LogOut } from "lucide-react";
import Link from "next/link";

export default function AccountPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "Snow Day Player",
    email: "user@example.com",
    school: "Your School",
    notifications: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // TODO: Save changes to backend
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="max-w-2xl space-y-6">
          {/* Profile Header */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
                <p className="text-muted-foreground">Manage your account information and preferences</p>
              </div>
              <Badge variant="secondary" className="text-base">
                Rank #{userStats.rank}
              </Badge>
            </div>
          </Card>

          {/* Account Information */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Profile Information</h2>
                <p className="text-sm text-muted-foreground">Your account details</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Username */}
              <div>
                <label className="text-sm font-medium mb-2 block">Username</label>
                {isEditing ? (
                  <Input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                ) : (
                  <div className="px-3 py-2 rounded-md bg-secondary text-foreground">
                    {formData.username}
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </label>
                {isEditing ? (
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                ) : (
                  <div className="px-3 py-2 rounded-md bg-secondary text-foreground">
                    {formData.email}
                  </div>
                )}
              </div>

              {/* School */}
              <div>
                <label className="text-sm font-medium mb-2 block">School</label>
                {isEditing ? (
                  <Input
                    type="text"
                    name="school"
                    value={formData.school}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                ) : (
                  <div className="px-3 py-2 rounded-md bg-secondary text-foreground">
                    {formData.school}
                  </div>
                )}
              </div>

              {/* Edit/Save Button */}
              <div className="flex gap-3 pt-4">
                {isEditing ? (
                  <>
                    <Button onClick={handleSave} className="flex-1">
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    className="w-full"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </Card>

          {/* Account Stats */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Account Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Current Rank</p>
                <p className="text-2xl font-bold text-primary">#{userStats.rank}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Predictions Made</p>
                <p className="text-2xl font-bold text-primary">{userStats.totalPredictions}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Accuracy Rate</p>
                <p className="text-2xl font-bold text-primary">{userStats.accuracy}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Consecutive Wins</p>
                <p className="text-2xl font-bold text-primary">{userStats.currentStreak}</p>
              </div>
            </div>
          </Card>

          {/* Danger Zone */}
          <Card className="p-6 border-destructive/50">
            <h2 className="text-xl font-semibold mb-4 text-destructive">Danger Zone</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button variant="destructive" className="w-full">
              <LogOut className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
}
