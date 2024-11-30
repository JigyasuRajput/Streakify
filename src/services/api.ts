import { PlatformSubmission } from '../types/submission';
import toast from 'react-hot-toast';

export async function fetchLeetCodeSubmissions(username: string): Promise<PlatformSubmission[]> {
  try {
    // First try the leetcode-stats-api
    const statsResponse = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
    const statsData = await statsResponse.json();
    
    if (statsData.status === 'error' || !statsData.totalSolved) {
      throw new Error('Failed to fetch from leetcode-stats-api');
    }

    // Then fetch the submission calendar from LeetCode's GraphQL API
    const graphqlResponse = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query userProfileCalendar($username: String!) {
            matchedUser(username: $username) {
              userCalendar {
                activeYears
                submissionCalendar
              }
            }
          }
        `,
        variables: { username }
      })
    });

    const graphqlData = await graphqlResponse.json();
    
    if (!graphqlData.data?.matchedUser?.userCalendar?.submissionCalendar) {
      throw new Error('No submission data found');
    }

    const calendar = JSON.parse(graphqlData.data.matchedUser.userCalendar.submissionCalendar);
    
    return Object.entries(calendar).map(([timestamp, count]) => ({
      date: new Date(parseInt(timestamp) * 1000).toISOString().split('T')[0],
      count: typeof count === 'number' ? count : 0,
      platform: 'leetcode'
    }));
  } catch (error) {
    console.error('Error fetching LeetCode submissions:', error);
    toast.error(`Failed to fetch LeetCode data for user: ${username}`);
    return [];
  }
}

export async function fetchCodeForcesSubmissions(handle: string): Promise<PlatformSubmission[]> {
  try {
    const response = await fetch(`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=1000`);
    if (!response.ok) {
      throw new Error('CodeForces API request failed');
    }
    
    const data = await response.json();
    
    if (data.status !== 'OK' || !Array.isArray(data.result)) {
      throw new Error('Invalid response from CodeForces API');
    }

    const submissionsByDate = new Map<string, number>();
    
    data.result.forEach((submission: any) => {
      if (submission.verdict === 'OK') {
        const date = new Date(submission.creationTimeSeconds * 1000);
        const dateStr = date.toISOString().split('T')[0];
        submissionsByDate.set(dateStr, (submissionsByDate.get(dateStr) || 0) + 1);
      }
    });

    return Array.from(submissionsByDate.entries()).map(([date, count]) => ({
      date,
      count,
      platform: 'codeforces'
    }));
  } catch (error) {
    console.error('Error fetching CodeForces submissions:', error);
    toast.error(`Failed to fetch CodeForces data for user: ${handle}`);
    return [];
  }
}