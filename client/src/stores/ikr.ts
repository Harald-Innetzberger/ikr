import { defineStore } from 'pinia';

export const useIkrStore = defineStore('ikr', {
  state: () => {
    return { ikr: null };
  },
  actions: {
    setIkr(data: any) {
      this.ikr = data;
    },
    resetIkr() {
      this.ikr = null;
    },
  },
  getters: {
    getIkr: (state) => {
      return state.ikr;
    },
  },
  persist: {
    storage: sessionStorage,
  },
});
