export interface Submission {
  date: string;
  count: number;
}

export interface PlatformSubmission extends Submission {
  platform: string;
}