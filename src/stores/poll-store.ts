import { Store, _GettersTree, defineStore } from 'pinia'
import { Poll } from 'src/api/models/poll'
import { Comment } from 'src/api/models/comment'
import { axiosPollit } from 'src/axios'

interface PollStoreActions {
    fetchMore: () => Promise<boolean>
}

interface PollStoreState {
    polls: Poll[] | null,
    currentPage: number | null
    hasNextPage: boolean,
    currentPollId: string | null;
}

interface PollStoreGetters extends _GettersTree<PollStoreState> {
    currentPoll: () => Poll | null;
    currentPollComments: () => Comment[] | null;
}

export type PollStore = Store<string, PollStoreState, PollStoreGetters, PollStoreActions>;

export const usePollStore = defineStore<string, PollStoreState, PollStoreGetters, PollStoreActions>('PollStore', {
    state: () => {
        return {
            polls: null,
            currentPage: null,
            hasNextPage: true,
            currentPollId: null
        }
    },
    actions: {
        async fetchMore() {
            if (this.polls == null)
                this.polls = [];
            
            if (this.currentPage == null)
                this.currentPage = 0;
            else
                this.currentPage += 1;

            const {items, options, hasNextPage} = (await axiosPollit.get(`polls/feed?page=${this.currentPage}&pageSize=1`)).data;
            
            this.polls.push(...items);
            this.currentPage = options.pageNumber;
            this.hasNextPage = hasNextPage;

            return hasNextPage;
        },
    },
    getters: {
        currentPoll() { 
            return this.state.polls == null || this.state.currentPollId == null 
            ? null 
            : this.state.polls[this.state.currentPollId] 
        },
        currentPollComments() {
            return [
                {
                    author: 'didou',
                    createdAt: "2023-04-15T13:21:16.466386Z",
                    upvotes: 18,
                    downvotes: 8,
                    body: 'Gigachads drink tea',
                    replies: [
                        {
                            author: 'didou',
                            createdAt: "2023-04-15T13:21:16.466386Z",
                            upvotes: 18,
                            downvotes: 8,
                            body: 'Gigachads drink tea',
                        }
                    ],
                },
                {
                    author: 'didou',
                    createdAt: "2023-04-15T13:21:16.466386Z",
                    upvotes: 18,
                    downvotes: 8,
                    body: 'Gigachads drink tea',
                    replies: [
                        {
                            author: 'didou',
                            createdAt: "2023-04-15T13:21:16.466386Z",
                            upvotes: 18,
                            downvotes: 8,
                            body: 'Gigachads drink tea',
                        }
                    ],
                }
            ] as Comment[]
        }
    },
})