export interface Comment {
  author: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  body: string;
  replies: Comment[];
}