import 'vuetify/styles';

import { createVuetify, type ThemeDefinition } from 'vuetify';
import { mdi } from 'vuetify/iconsets/mdi-svg';

const light: ThemeDefinition = {
  dark: false,
};

const dark: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#00695C',
  },
};

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light,
      dark,
    },
  },
  icons: {
    defaultSet: 'mdi',
    sets: {
      mdi,
    },
  },
});
