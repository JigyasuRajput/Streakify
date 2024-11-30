import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import { UserProfile } from '../types/user';
import toast from 'react-hot-toast';

interface ProfileSetupProps {
  onComplete: (profile: UserProfile) => void;
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ onComplete }) => {
  const [profile, setProfile] = useState<UserProfile>({
    leetcodeUsername: '',
    codeforcesHandle: '',
    codechefUsername: '',
    geeksforgeeksUsername: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.leetcodeUsername && !profile.codeforcesHandle && 
        !profile.codechefUsername && !profile.geeksforgeeksUsername) {
      toast.error('Please enter at least one platform username');
      return;
    }
    onComplete(profile);
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-xl max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Activity className="w-6 h-6 text-green-500" />
        <h2 className="text-xl font-semibold text-white">Setup Your Coding Profiles</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            LeetCode Username
          </label>
          <input
            type="text"
            value={profile.leetcodeUsername}
            onChange={(e) => setProfile(prev => ({
              ...prev,
              leetcodeUsername: e.target.value.trim()
            }))}
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
            onChange={(e) => setProfile(prev => ({
              ...prev,
              codeforcesHandle: e.target.value.trim()
            }))}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your CodeForces handle"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            CodeChef Username
          </label>
          <input
            type="text"
            value={profile.codechefUsername}
            onChange={(e) => setProfile(prev => ({
              ...prev,
              codechefUsername: e.target.value.trim()
            }))}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your CodeChef username"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            GeeksforGeeks Username
          </label>
          <input
            type="text"
            value={profile.geeksforgeeksUsername}
            onChange={(e) => setProfile(prev => ({
              ...prev,
              geeksforgeeksUsername: e.target.value.trim()
            }))}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your GeeksforGeeks username"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md transition-colors hover:bg-green-700"
        >
          Save Profiles
        </button>
      </form>
    </div>
  );
};

export default ProfileSetup;