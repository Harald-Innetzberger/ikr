<template>
  <v-app>
    <app-navigation />
    <v-app-bar title="IKR Kontenrahmen" color="primary">
      <template #append>
        <v-btn to="/" class="ma-2" :prepend-icon="mdiSearchWeb"> Suche </v-btn>

        <v-btn to="/create-ikr" class="ma-2" :prepend-icon="mdiPlusCircle">
          Eintrag hinzufügen
        </v-btn>
      </template>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <!-- selected content -->
        <RouterView />
      </v-container>
    </v-main>
    <v-footer class="justify-center">
      <div class="bg-primary text-center w-100">
        IKR Kontenrahmen - {{ new Date().getFullYear() }}
      </div>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  VApp,
  VAppBar,
  VMain,
  VContainer,
  VFooter,
  VBtn,
} from 'vuetify/components';
import AppNavigation from './components/AppNavigation.vue';
import { mdiPlusCircle, mdiSearchWeb } from '@mdi/js';

export default defineComponent({
  components: {
    VApp,
    VAppBar,
    AppNavigation,
    VContainer,
    VMain,
    VFooter,
    VBtn,
  },
  setup() {
    return {
      mdiPlusCircle,
      mdiSearchWeb,
    };
  },
});
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
