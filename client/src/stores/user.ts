import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => {
    return { user: null };
  },
  actions: {
    setUser(data: any) {
      this.user = data;
    },
    resetUser() {
      this.user = null;
    },
  },
  getters: {
    getUser: (state) => {
      return state.user;
    },
  },
  persist: {
    storage: sessionStorage,
  },
});
