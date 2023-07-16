import { Store, _GettersTree, defineStore } from 'pinia';
import { Poll, PollDetailedResults } from 'src/api/models/poll';
import { Comment } from 'src/api/models/comment';
import { axiosPollit } from 'src/axios';
import { usingLoaderAsync } from 'src/misc/usingLoader';

export interface PollFeedFilters {
  search: string | null;
  tags: string[] | null;
}

interface PollStoreActions {
  fetchMore: () => Promise<boolean>;
  setCurrentPoll: (id: string) => Promise<void>;
  refreshPoll: (id: string) => Promise<void>;
  setFilters: (filters: PollFeedFilters) => void;
  reset: () => void;
  publishPoll: (
    title: string,
    pollOptions: string[],
    tags: string[]
  ) => Promise<void>;
  castVoteToPoll: (pollId: string, optionId: string) => Promise<void>;
  postCommentOnPoll: (
    pollId: string,
    parentCommentId: string | undefined | null,
    commentBody: string
  ) => Promise<void>;
}

interface PollStoreState {
  polls: Poll[] | null;
  currentPage: number | null;
  hasNextPage: boolean;
  currentPoll: Poll | null;
  currentPollDetailedResults: PollDetailedResults | null;
  currentPollComments: Comment[] | null;
  currentPollNotFound: boolean;
  filters: PollFeedFilters;
}

type PollStoreGetters = _GettersTree<PollStoreState>;

export type PollStore = Store<
  string,
  PollStoreState,
  PollStoreGetters,
  PollStoreActions
>;

const buildDefaultState = () => {
  return {
    polls: null,
    currentPage: null,
    hasNextPage: true,
    currentPoll: null,
    currentPollComments: null,
    currentPollNotFound: false,
    filters: {
      search: null,
      tags: null,
    },
  };
};

export const usePollStore = defineStore<
  string,
  PollStoreState,
  PollStoreGetters,
  PollStoreActions
>('PollStore', {
  state: buildDefaultState,
  actions: {
    async fetchMore() {
      if (this.polls == null) this.polls = [];

      if (this.currentPage == null) this.currentPage = 0;
      else this.currentPage += 1;

      let url = `polls/feed?page=${this.currentPage}&pageSize=20`;
      if (this.filters.tags != null && this.filters.tags?.length > 0) {
        this.filters.tags.forEach((tag) => {
          url += '&tags=' + tag;
        });
      }
      if (this.filters.search == null) {
        url += '&orderBy=createdAt&order=descending';
      } else {
        url += '&search=' + this.filters.search;
      }

      const { items, options, hasNextPage } = (await axiosPollit.get(url)).data;

      this.polls.push(...items);
      this.currentPage = options.pageNumber;
      this.hasNextPage = hasNextPage;

      return hasNextPage;
    },
    setCurrentPoll(id: string) {
      return usingLoaderAsync(async () => {
        this.currentPollNotFound = false;
        this.currentPollComments = [];

        this.currentPoll =
          this.polls?.filter((p) => p.pollId == id)?.[0] ??
          (await axiosPollit.get(`polls/feed?page=0&pageSize=1&pollId=${id}`))
            .data.items?.[0] ??
          null;

        const getCommentsAsync = axiosPollit.get(
          `polls/${id}/comments?MaxRecursiveDepth=200`
        );

        try {
          this.currentPollComments = (await getCommentsAsync).data.items;
        } catch (e) {}

        const getDetailedPollResultsAsync = axiosPollit.get(`polls/${id}/results`);

        try {
          this.currentPollDetailedResults = (await getDetailedPollResultsAsync).data;
        } catch (e) {}

        if (this.currentPoll == null) {
          this.currentPollNotFound = true;
          return;
        }
      });
    },
    async refreshPoll(id: string) {
      const refreshedPoll =
        (await axiosPollit.get(`polls/feed?page=0&pageSize=1&pollId=${id}`))
          .data.items?.[0] ?? null;

      if (!refreshedPoll) return;

      if (this.currentPoll?.pollId === id) {
        this.currentPoll = refreshedPoll;
      }

      if (this.polls != null) {
        const index = this.polls.map((p) => p.pollId).indexOf(id);
        if (index >= 0) {
          this.polls![index] = refreshedPoll;
        }
      }
    },
    setFilters(filters: PollFeedFilters) {
      this.filters = filters;
    },
    reset() {
      this.$state = buildDefaultState();
    },
    publishPoll(title: string, pollOptions: string[], tags: string[]) {
      return usingLoaderAsync(async () => {
        const res = (
          await axiosPollit.post('polls', {
            title: title,
            options: pollOptions,
            tags: tags,
          })
        ).data;
        this.router.push({ name: 'Poll', params: { pollId: res.pollId } });
      });
    },
    async castVoteToPoll(pollId: string, optionId: string) {
      await axiosPollit.post(`polls/${pollId}/options/${optionId}/votes`);
      await this.refreshPoll(pollId);
    },
    postCommentOnPoll(
      pollId: string,
      parentCommentId: string | undefined | null,
      commentBody: string
    ) {
      return usingLoaderAsync(async () => {
        await axiosPollit.post(`polls/${pollId}/comments`, {
          parentCommentId,
          commentBody,
        });
        await this.setCurrentPoll(pollId);
      });
    },
  },
  getters: {},
});
