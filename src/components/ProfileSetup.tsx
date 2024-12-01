import React, { useState } from "react";
import { Activity } from "lucide-react";

// Local type definition to replace external import
interface UserProfile {
  leetcodeUsername: string;
  codeforcesHandle: string;
  codechefUsername?: string;
  geeksforgeeksUsername?: string;
}

interface ProfileSetupProps {
  onComplete: (profile: UserProfile) => void;
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ onComplete }) => {
  const [profile, setProfile] = useState<UserProfile>({
    leetcodeUsername: "",
    codeforcesHandle: "",
    codechefUsername: "",
    geeksforgeeksUsername: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.leetcodeUsername && !profile.codeforcesHandle) {
      setError("Please enter at least one platform username");
      return;
    }
    // Clear any previous error
    setError(null);
    onComplete(profile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-gray-900 p-6 rounded-lg shadow-2xl w-full max-w-md overflow-hidden">
        <div className="flex items-center gap-3 mb-6">
          <Activity className="w-6 h-6 text-green-500" />
          <h2 className="text-xl font-semibold text-white">
            Setup Your Coding Profiles
          </h2>
        </div>
        {error && (
          <div className="bg-red-600/20 border border-red-600 text-red-300 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              LeetCode Username
            </label>
            <input
              type="text"
              value={profile.leetcodeUsername}
              onChange={(e) =>
                setProfile((prev) => ({
                  ...prev,
                  leetcodeUsername: e.target.value.trim(),
                }))
              }
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your LeetCode username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              CodeForces Handle
            </label>
            <input
              type="text"
              value={profile.codeforcesHandle}
              onChange={(e) =>
                setProfile((prev) => ({
                  ...prev,
                  codeforcesHandle: e.target.value.trim(),
                }))
              }
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your CodeForces handle"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md transition-all duration-200 ease-in-out hover:bg-green-700 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Save Profiles
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;
