<template>
  <v-app-bar color="primary" prominent>
    <v-toolbar-title>IKR Kontenrahmen</v-toolbar-title>

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

    <v-btn v-if="'#'" to="/login"> Login</v-btn>
    <v-btn v-else to="/logout"> Logout</v-btn>
  </v-app-bar>
</template>
<script setup lang="ts">
import { VAppBar, VBtn, VToolbarTitle, VSpacer } from 'vuetify/components';
</script>
