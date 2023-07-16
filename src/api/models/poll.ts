export interface Poll {
  pollId: string;
  title: string;
  hasMyVote: boolean;
  options: PollOption[];
  totalVotesCount: number;
  commentCount: number;
  tags: string[];
  author: string;
  createdAt: string;
}

export interface PollOption {
  id: string;
  title: string;
  votesCount?: number;
  hasMyVote: boolean;
}

export interface PollDetailedResults {
  pollId: string;
  options: PollOptionResults[];
  totalVotesCount: number;
}

export interface PollOptionResults {
  title: string;
  votesCount: number;
  votesPerFeature: FeatureVotes[];
}

export interface FeatureVotes {
  name: string;
  intervals: FeatureInterval;
}

export interface FeatureInterval {
  label: string;
  votesCount: number;
}
