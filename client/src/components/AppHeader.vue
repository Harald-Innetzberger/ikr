<script setup lang="ts">
import {
  VDivider,
  VAppBar,
  VBtn,
  VToolbarTitle,
  VSpacer,
} from 'vuetify/components';
import axios from 'axios';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
const router = useRouter();
const userStore = useUserStore();

async function doLogout() {
  // reset user login in store
  userStore.resetUser();
  // destroy session on server
  try {
    await axios.post(`/api/user/logout`);
    router.push('/login');
  } catch (error: any) {
    console.log(error);
  }
}
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
    <v-btn class="mr-1" to="/" variant="text" title="Eintrag suchen"
      >Suche</v-btn
    >
    <v-btn
      class="mr-1"
      to="/create-ikr"
      variant="text"
      title="Eintrag hinzufügen"
      >Erstellen</v-btn
    >
    <v-btn v-if="!userStore.getUser" to="/login">Login</v-btn>
    <v-btn v-else @click="doLogout()">Logout</v-btn>
  </v-app-bar>
</template>
