import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: '',
  }),
  actions: {
    setTheme(data: string) {
      this.theme = data;
    },
  },
  getters: {
    getTheme: (state) => {
      return state.theme;
    },
  },
  persist: true,
});
