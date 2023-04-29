export interface Comment {
  id: string
  parentCommentId: any
  body: string
  myVoteDirection: string
  upVotesCount: number
  downVotesCount: number
  author: string
  createdAt: string
  depth: number
  children: Comment[]
}