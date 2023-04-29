export interface Poll {
    pollId: string
    title: string
    hasMyVote: boolean
    options: PollOption[]
    totalVotesCount: number
    commentCount: number
    tags: string[]
    author: string
    createdAt: string
  }
  
  export interface PollOption {
    id: string
    title: string
    votesCount?: number
    hasMyVote: boolean
  }
  