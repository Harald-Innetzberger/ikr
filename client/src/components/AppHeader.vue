<script setup lang="ts">
import {
  VDivider,
  VAppBar,
  VBtn,
  VToolbarTitle,
  VSpacer,
} from 'vuetify/components';
import { useUserStore } from '@/stores/user';
import { useThemeStore } from '@/stores/theme';
import { useRouter } from 'vue-router';
import { inject } from 'vue';
import { mdiWeatherNight, mdiWhiteBalanceSunny } from '@mdi/js';
import { useTheme } from 'vuetify/lib/framework.mjs';
import { onMounted } from 'vue';

const router = useRouter();
const userStore = useUserStore();
const themeStore = useThemeStore();

const $http: any = inject('$myHttp');

const theme = useTheme();

async function doLogout() {
  // reset user login in store
  userStore.resetUser();
  // destroy session on server
  try {
    await $http.post(`/api/user/logout`);
    router.push('/login');
  } catch (error: any) {
    console.log(error);
  }
}

function switchTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
  themeStore.setTheme(theme.global.name.value);
}

onMounted(() => {
  if (themeStore.getTheme) {
    theme.global.name.value = themeStore.getTheme;
  }
});
</script>

<template>
  <v-app-bar color="primary" prominent>
    <v-toolbar-title
      >IKR Kontenrahmen
      <v-divider />
      <span class="text-body-2" v-if="userStore.getUser"
        >Willkommen
        <span class="text-yellow">{{
          userStore.getUser['email'] + ' (' + userStore.getUser['role'] + ')'
        }}</span></span
      ></v-toolbar-title
    >
    <v-spacer></v-spacer>

    <!-- switch light / dark mode -->
    <v-btn
      class="mr-1"
      @click="switchTheme"
      :title="'Aktuelles Theme ' + theme.global.name.value"
      :icon="
        theme.global.name.value === 'light'
          ? mdiWeatherNight
          : mdiWhiteBalanceSunny
      "
    />

    <v-btn class="mr-1" to="/" variant="text" title="Eintrag suchen"
      >Suche</v-btn
    >
    <v-btn class="mr-1" to="/create" variant="text" title="Eintrag hinzufügen"
      >Erstellen</v-btn
    >
    <v-btn class="mr-1" to="/list" variant="text" title="Kontenrahmen auflisten"
      >Liste</v-btn
    >
    <v-btn v-if="!userStore.getUser" to="/login">Login</v-btn>
    <v-btn v-else @click="doLogout()">Logout</v-btn>
  </v-app-bar>
</template>
