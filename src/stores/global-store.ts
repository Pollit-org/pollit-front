import { defineStore, Store, type _GettersTree } from 'pinia';
import { IDisposable } from 'src/misc/Disposable';
import Router from 'src/router';

export interface ILoader extends IDisposable {
  id: string;
  dispose: () => void | Promise<void>;
}

interface GlobalStoreActions {
  setApiError: (apiError: string) => Promise<void> | void;
  newLoader: () => ILoader;
  stopLoader: (loaderId: string) => Promise<void> | void;
  navigateBackOrDefault: (default_?: string) => void;
}

interface GlobalStoreState {
  apiError: string | null;
  activeLoaders: Set<string>;
}

interface GlobalStoreGetters extends _GettersTree<GlobalStoreState> {
  isLoading: () => boolean;
}

function generateRandomId(length: number) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
    counter += 1;
  }
  return result;
}

export type GlobalStore = Store<
  string,
  GlobalStoreState,
  GlobalStoreGetters,
  GlobalStoreActions
>;

export const useGlobalStore = defineStore<
  string,
  GlobalStoreState,
  GlobalStoreGetters,
  GlobalStoreActions
>('GlobalStore', {
  state: () => {
    return {
      apiError: null,
      activeLoaders: new Set<string>(),
    };
  },
  persist: false,
  actions: {
    setApiError(apiError: string) {
      this.apiError = apiError;
    },
    newLoader() {
      const loaderId = generateRandomId(16);
      const loader: ILoader = {
        id: loaderId,
        dispose: () => this.stopLoader(loaderId),
      };
      this.activeLoaders.add(loader.id);
      return loader;
    },
    stopLoader(loaderId: string) {
      this.activeLoaders.delete(loaderId);
    },
    navigateBackOrDefault(default_ = 'Home') {
      if (window.history.length > 2) Router.go(-1);
      else Router.push({ name: default_ });
    },
  },
  getters: {
    isLoading() {
      return this.activeLoaders.size > 0;
    },
  },
});
