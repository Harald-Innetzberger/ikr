import 'vuetify/styles';

import { createVuetify, type ThemeDefinition } from 'vuetify';
import { mdi } from 'vuetify/iconsets/mdi-svg';

const myCustomIkrTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    primary: '#4527A0',
    secondary: '#03DAC6',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
};

export default createVuetify({
  theme: {
    defaultTheme: 'myCustomIkrTheme',
    themes: {
      myCustomIkrTheme,
    },
  },
  icons: {
    defaultSet: 'mdi',
    sets: {
      mdi,
    },
  },
});
