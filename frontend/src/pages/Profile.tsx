
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Star, CheckCircle, Clock, Home, User as UserIcon, BookOpen } from "lucide-react";

// Utility to safely extract user fields
function getSafeUserForm(user: any) {
  return {
    name: typeof user?.name === "string" ? user.name : "",
    email: typeof user?.email === "string" ? user.email : "",
    hostel: typeof user?.hostel === "string" ? user.hostel : "",
    bio: typeof user?.bio === "string" ? user.bio : "",
    reputation: typeof user?.reputation === "number" ? user.reputation : 0,
    avatarSeed:
      typeof user?.avatarSeed === "string"
        ? user.avatarSeed
        : typeof user?.name === "string" && user.name
        ? user.name
        : Math.random().toString(36).substring(2, 10),
    interests: Array.isArray(user?.interests) ? user.interests : [],
  };
}

const getRandomSeed = () => Math.random().toString(36).substring(2, 10);
const DICEBEAR_STYLE = "avataaars"; // DiceBear style

const Profile = () => {
  const { isDayMarket } = useTheme();
  const { user } = useAuth();
  const isAuthenticated = !!user;
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    hostel: "",
    bio: "",
    reputation: 0,
    avatarSeed: getRandomSeed(),
    interests: [] as string[],
  });
  const [interestInput, setInterestInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // Recent activity mock data
  const [recentActivity] = useState([
    { type: "listing", text: "Added a new listing: 'Used Laptop'", date: "2 days ago" },
    { type: "barter", text: "Completed a barter with Saksham", date: "4 days ago" },
    { type: "profile", text: "Updated profile information", date: "1 week ago" },
  ]);

  useEffect(() => {
    if (user) setForm(getSafeUserForm(user));
  }, [user]);

  const avatarUrl = `https://api.dicebear.com/9.x/${DICEBEAR_STYLE}/svg?seed=${encodeURIComponent(form.avatarSeed)}&radius=50&size=128`;

  // Interests/skills input logic
  const handleInterestInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterestInput(e.target.value);
  };
  const handleInterestKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      (e.key === "Enter" || e.key === ",") &&
      interestInput.trim() &&
      !form.interests.includes(interestInput.trim())
    ) {
      setForm({ ...form, interests: [...form.interests, interestInput.trim()] });
      setInterestInput("");
      e.preventDefault();
    }
  };
  const removeInterest = (interest: string) => {
    setForm({ ...form, interests: form.interests.filter((i) => i !== interest) });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNewAvatar = () => {
    setForm({ ...form, avatarSeed: getRandomSeed() });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await fetch("/user/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          hostel: form.hostel,
          bio: form.bio,
          avatarSeed: form.avatarSeed,
          interests: form.interests,
        }),
      });
      setEditMode(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    if (user) setForm(getSafeUserForm(user));
    setInterestInput("");
  };

  if (!isAuthenticated) return null;

  // Attractive badge helpers
  const badgeClass = "inline-flex items-center px-3 py-1 rounded-full font-semibold text-xs shadow transition-all";
  const hostelBadgeClass = "bg-gradient-to-r from-blue-400 to-blue-600 text-white border-2 border-blue-200";
  const repBadgeClass = "bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 text-yellow-900 border-2 border-yellow-300";
  const verifiedBadgeClass = "bg-gradient-to-r from-green-400 to-green-600 text-white border-2 border-green-200 shadow-lg animate-pulse";

  // Example stats (replace with real data if available)
  const stats = [
    { label: "Listings", value: 12, color: "bg-indigo-100 text-indigo-800 border-indigo-300" },
    { label: "Barters", value: 3, color: "bg-pink-100 text-pink-800 border-pink-300" },
    { label: "Reputation", value: form.reputation, color: repBadgeClass },
  ];

  return (
    <Layout>
      <div className={`w-full py-12 px-4 min-h-screen ${
        isDayMarket
          ? "bg-gradient-to-br from-white to-daymarket-100"
          : "bg-gradient-to-br from-[#181824] via-[#232946] to-[#8F43EE]"
      }`}>
        <div className="container mx-auto max-w-2xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl md:text-4xl font-bold">Account Settings</h1>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="h-4 w-4" />
              Home
            </Button>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className={isDayMarket ? "" : "bg-[#232946] text-gray-100 shadow-lg"}>
              <CardHeader className="flex flex-col items-center">
                <div className="relative group">
                  <div className={`rounded-full overflow-hidden border-4 transition-shadow duration-300 ${
                    isDayMarket
                      ? "border-red-500 shadow-[0_0_16px_4px_#ef444444] hover:shadow-[0_0_32px_8px_#ef444488]"//"border-primary"
                      : "border-[#8F43EE] shadow-[0_0_16px_4px_#8F43EE88] group-hover:shadow-[0_0_32px_8px_#8F43EEcc]"
                  }`} style={{ width: 120, height: 120 }}>
                    <img
                      src={avatarUrl}
                      alt={form.name || "User"}
                      width={120}
                      height={120}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  {/* Verified badge */}
                  <span className={`${badgeClass} ${verifiedBadgeClass} absolute bottom-2 right-2`}>
                    <CheckCircle className="h-4 w-4 mr-1" /> Verified
                  </span>
                  {!isDayMarket && (
                    <svg className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-30" width="48" height="48" fill="none" viewBox="0 0 48 48">
                      <ellipse cx="24" cy="24" rx="20" ry="8" fill="#8F43EE" />
                    </svg>
                  )}
                </div>
                <CardTitle className="text-2xl mt-4">{form.name || "Your Profile"}</CardTitle>
                <div className="text-sm text-muted-foreground">{form.email}</div>
                <div className="flex gap-2 mt-2">
                  <span className={`${badgeClass} ${hostelBadgeClass}`}>
                    {form.hostel || "No hostel"}
                  </span>
                  <span className={`${badgeClass} ${repBadgeClass} flex items-center`}>
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                    {form.reputation}
                  </span>
                </div>
                {/* Stats badges */}
                <div className="flex gap-3 mt-4">
                  {stats.map((stat, i) => (
                    <span key={i} className={`${badgeClass} border ${stat.color}`}>
                      {stat.label}: <span className="ml-1 font-bold">{stat.value}</span>
                    </span>
                  ))}
                </div>
                {/* Interests/Skills */}
                <div className="w-full mt-4">
                  <label className="text-sm font-medium mb-1 block text-center">Interests/Skills</label>
                  {editMode ? (
                    <>
                      <div className="flex flex-wrap gap-2 mb-2 justify-center">
                        {form.interests.map((interest, i) => (
                          <Badge key={i} variant="secondary" className="flex items-center gap-1">
                            {interest}
                            <button
                              type="button"
                              className="ml-1 text-xs text-red-500 hover:text-red-700"
                              onClick={() => removeInterest(interest)}
                              aria-label={`Remove ${interest}`}
                            >
                              ×
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <input
                        type="text"
                        value={interestInput}
                        onChange={handleInterestInput}
                        onKeyDown={handleInterestKeyDown}
                        className={`w-full p-2 border rounded-md ${
                          isDayMarket ? "bg-white text-black" : "bg-gray-900 text-white"
                        }`}
                        placeholder="Type an interest and press Enter"
                      />
                    </>
                  ) : (
                    <div className="flex flex-wrap gap-2 justify-center">
                      {form.interests.length > 0 ? (
                        form.interests.map((interest, i) => (
                          <Badge key={i} variant="secondary">
                            {interest}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-muted-foreground text-sm">No interests set</span>
                      )}
                    </div>
                  )}
                </div>
                {editMode && (
                  <Button variant="outline" size="sm" className="mt-4" onClick={handleNewAvatar}>
                    🎲 New Avatar
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {/* Bio, Full Name, Hostel */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-pink-500 p-2">
                      <BookOpen className="h-5 w-5 text-white" />
                    </span>
                    <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Bio</span>
                  </h2>
                  <div className="rounded-lg border border-purple-200 bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:bg-[#2a2040] p-4 shadow-sm">
                    {editMode ? (
                      <textarea
                        name="bio"
                        className={`w-full p-2 border rounded-md resize-none ${
                          isDayMarket ? "bg-white text-black" : "bg-gray-900 text-white"
                        }`}
                        value={form.bio}
                        onChange={handleChange}
                        maxLength={120}
                        rows={3}
                        placeholder="Tell us about yourself"
                      />
                    ) : (
                      <p className="text-muted-foreground whitespace-pre-line font-medium">
                        {form.bio || <span className="italic text-black-400">No bio set</span>}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="text-sm font-semibold flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-blue-600 p-1">
                        <UserIcon className="h-4 w-4 text-white" />
                      </span>
                      <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Full Name</span>
                    </label>
                    {editMode ? (
                      <input
                        name="name"
                        type="text"
                        className={`w-full p-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 transition ${
                          isDayMarket ? "bg-white text-black" : "bg-gray-900 text-white"
                        }`}
                        value={form.name}
                        onChange={handleChange}
                        maxLength={30}
                        placeholder="Enter your name"
                      />
                    ) : (
                      <div className="p-2 font-semibold text-lg">{form.name}</div>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-semibold flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400 p-1">
                        <Home className="h-4 w-4 text-white" />
                      </span>
                      <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Hostel</span>
                    </label>
                    {editMode ? (
                      <select
                        name="hostel"
                        className={`w-full p-3 border-2 border-indigo-200 rounded-lg focus:ring-2 focus:ring-cyan-400 transition ${
                          isDayMarket ? "bg-white text-black" : "bg-gray-900 text-white"
                        }`}
                        value={form.hostel}
                        onChange={handleChange}
                      >
                        <option value="">Select Hostel</option>
                        <option value="Hostel J">Hostel J</option>
                        <option value="Hostel K">Hostel K</option>
                        <option value="Hostel L">Hostel L</option>
                        <option value="Hostel M">Hostel M</option>
                        <option value="Hostel N">Hostel N</option>
                        <option value="Hostel O">Hostel O</option>
                      </select>
                    ) : (
                      <div className="p-2 font-semibold">{form.hostel || "Not set"}</div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 mt-6">
                  {editMode ? (
                    <>
                      <Button
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={handleSave}
                        disabled={loading}
                      >
                        {loading ? "Saving..." : "Save Changes"}
                      </Button>
                      <Button variant="outline" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" onClick={() => setEditMode(true)}>
                      Edit Profile
                    </Button>
                  )}
                </div>
                {/* Recent Activity Section */}
                <div className="mt-8 px-2 pb-2">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Clock className="h-5 w-5" /> Recent Activity
                  </h2>
                  <ul className="space-y-3">
                    {recentActivity.map((activity, index) => (
                      <li key={index} className={`flex items-center p-3 rounded-xl shadow-sm ${
                        isDayMarket ? "bg-blue-50" : "bg-[#2d3250] border border-[#8F43EE]/30"
                      }`}>
                        <span className={`inline-block w-2 h-2 rounded-full mr-3 ${
                          activity.type === "listing" ? "bg-indigo-400" :
                          activity.type === "barter" ? "bg-pink-400" : "bg-yellow-400"
                        }`}></span>
                        <span className="text-sm">
                          {activity.text}
                          <span className="ml-2 text-xs text-muted-foreground">({activity.date})</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;