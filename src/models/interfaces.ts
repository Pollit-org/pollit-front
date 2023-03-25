export interface User {
  username: string;
  profileLink: string;
}

export interface VotingOption {
  name: string;
  numVotes: number;
}

export interface Tag {
  name: string;
  link: string;
}

export interface Comment {
  user: User;
  timeSincePost: string;
  upvotes: number;
  downvotes: number;
  commentText: string;
  replies: Comment[];
}

export interface Post {
  user: User;
  title: string;
  timeSincePost: string;
  votingOptions: VotingOption[];
  tags: Tag[];
  comments: Comment[];
}

export interface Feed {
  posts: Post[];
}

export interface RootObject {
  feed: Feed;
}
