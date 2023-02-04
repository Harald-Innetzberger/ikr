<template>
  <v-card>
    <v-layout>
      <v-app>
        <!-- App Bar -->
        <app-header />
        <!-- Dynamic Main Content -->
        <v-main>
          <v-container fluid>
            <RouterView />
          </v-container>
        </v-main>
        <!-- App Footer -->
        <app-footer />
      </v-app>
    </v-layout>
  </v-card>
</template>

<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import { VApp, VMain, VContainer, VLayout, VCard } from 'vuetify/components';
</script>
<style>
html,
body {
  font-family: Calibri light, Roboto, Candara, Segoe, 'Segoe UI', Optima, Arial,
    sans-serif;
}
.v-field__field {
  font-size: 1.6rem;
}
.v-card .v-card-text {
  font-size: 1.6rem;
  line-height: 1.5em;
}
</style>
