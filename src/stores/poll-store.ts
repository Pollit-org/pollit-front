import { Store, _GettersTree, defineStore } from 'pinia';
import { Poll } from 'src/api/models/poll';
import { Comment } from 'src/api/models/comment';
import { axiosPollit } from 'src/axios';
import { usingLoaderAsync } from 'src/misc/usingLoader';
import { AxiosError } from 'axios';

interface PollStoreActions {
  fetchMore: () => Promise<boolean>;
  setCurrentPollId: (id: string) => Promise<void>;
}

interface PollStoreState {
  polls: Poll[] | null;
  currentPage: number | null;
  hasNextPage: boolean;
  currentPoll: Poll | null;
  currentPollComments: Comment[] | null;
  currentPollNotFound: boolean;
}

type PollStoreGetters = _GettersTree<PollStoreState>;

export type PollStore = Store<
  string,
  PollStoreState,
  PollStoreGetters,
  PollStoreActions
>;

export const usePollStore = defineStore<
  string,
  PollStoreState,
  PollStoreGetters,
  PollStoreActions
>('PollStore', {
  state: () => {
    return {
      polls: null,
      currentPage: null,
      hasNextPage: true,
      currentPoll: null,
      currentPollComments: null,
      currentPollNotFound: false,
    };
  },
  actions: {
    async fetchMore() {
      if (this.polls == null) this.polls = [];

      if (this.currentPage == null) this.currentPage = 0;
      else this.currentPage += 1;

      const { items, options, hasNextPage } = (
        await axiosPollit.get(
          `polls/feed?page=${this.currentPage}&pageSize=1&orderBy=createdAt&order=descending`
        )
      ).data;

      this.polls.push(...items);
      this.currentPage = options.pageNumber;
      this.hasNextPage = hasNextPage;

      return hasNextPage;
    },
    setCurrentPollId(id: string) {
      return usingLoaderAsync(async () => {
        const currentPollFilter =
          this.polls?.filter((p) => p.pollId == id) ?? [];
        if (currentPollFilter.length > 0)
          this.currentPoll = currentPollFilter[0];

        const getCommentsAsync = axiosPollit.get(`polls/${id}/comments`);

        this.currentPollComments = [];
        this.currentPoll =
          (await axiosPollit.get(`polls/feed?page=0&pageSize=1&pollId=${id}`))
            .data.items?.[0] ?? null;

        try {
          this.currentPollComments = (await getCommentsAsync).data.items;
        } catch (e) {}

        if (this.currentPoll == null) {
          this.currentPollNotFound = true;
          return;
        }
      });
    },
  },
  getters: {},
});
