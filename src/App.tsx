import { useState, useEffect } from "react";
import { Activity } from "lucide-react";
import { Toaster } from "react-hot-toast";
import ProfileSetup from "./components/ProfileSetup";
import Heatmap from "./components/Heatmap";
import HeatmapLegend from "./components/HeatmapLegend";
import SubmissionGraph from "./components/SubmissionGraph";
import {
  fetchLeetCodeSubmissions,
  fetchCodeForcesSubmissions,
} from "./services/api";
import { PlatformSubmission } from "./types/submission";
import { UserProfile } from "./types/user";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [profile, setProfile] = useLocalStorage<UserProfile | null>(
    "userProfile",
    null
  );
  const [submissions, setSubmissions] = useState<PlatformSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      fetchData();
    }
  }, [profile]);

  const fetchData = async () => {
    if (!profile) return;

    console.log("Fetching data for profile:", profile);
    setLoading(true);
    setError(null);
    try {
      const promises = [];
      if (profile.leetcodeUsername) {
        promises.push(fetchLeetCodeSubmissions(profile.leetcodeUsername));
      }
      if (profile.codeforcesHandle) {
        promises.push(fetchCodeForcesSubmissions(profile.codeforcesHandle));
      }

      const results = await Promise.all(promises);
      const combinedSubmissions = results
        .flat()
        .sort(
          (a: PlatformSubmission, b: PlatformSubmission) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      console.log("Combined submissions:", combinedSubmissions);
      setSubmissions(combinedSubmissions);
    } catch (err) {
      console.error("Error fetching submission data:", err);
      if (err instanceof Error) {
        setError(err.message || "Failed to fetch submission data");
      } else {
        setError("Failed to fetch submission data");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleProfileComplete = (newProfile: UserProfile) => {
    setProfile(newProfile);
  };

  const handleReset = () => {
    setProfile(null);
    setSubmissions([]);
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <ProfileSetup onComplete={handleProfileComplete} />
          <Toaster position="bottom-right" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 md:p-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-green-500" />
            <h1 className="text-xl font-bold">Streakify</h1>
          </div>
          <button
            onClick={handleReset}
            className="px-4 py-2 text-sm bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Reset Profiles
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-green-500" />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-8">{error}</div>
        ) : (
          <div className="space-y-6">
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                <Heatmap submissions={submissions} />
                <HeatmapLegend />
              </div>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                <SubmissionGraph submissions={submissions} />
              </div>
            </div>
          </div>
        )}
        <Toaster position="bottom-right" />
      </div>
    </div>
  );
}

export default App;
