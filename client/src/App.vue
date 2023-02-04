<template>
  <v-card variant="flat">
    <v-layout>
      <v-app>
        <v-app-bar color="primary" prominent>
          <v-app-bar-nav-icon
            variant="text"
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
          <v-toolbar-title>IKR Kontenrahmen</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn
            to="/"
            class="ma-2"
            variant="text"
            :icon="mdiSearchWeb"
            title="Eintrag suchen"
          />

          <v-btn
            to="/create-ikr"
            class="ma-2"
            variant="text"
            :icon="mdiPlusCircle"
            title="Eintrag hinzufügen"
          />

          <v-btn v-if="'#'" to="/login" class="ma-2"> Login</v-btn>
          <v-btn v-else to="/logout"> Logout</v-btn>
        </v-app-bar>
        <!-- Navigation Drawer -->
        <v-navigation-drawer v-model="drawer">
          <v-list>
            <v-list-item
              prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
              title="Claudia Innetzberger"
              subtitle="claudia.innetzberger@magenta.de"
            ></v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list density="compact" nav>
            <v-list-item
              :prepend-icon="mdiFolder"
              title="My Files"
              value="myfiles"
            ></v-list-item>
            <v-list-item
              :prepend-icon="mdiAccountMultiple"
              title="Shared with me"
              value="shared"
            ></v-list-item>
            <v-list-item
              :prepend-icon="mdiAccount"
              title="Starred"
              value="starred"
            ></v-list-item>
          </v-list>
        </v-navigation-drawer>
        <!-- Main Content -->
        <v-main>
          <v-container fluid>
            <RouterView />
          </v-container>
        </v-main>
        <v-footer class="justify-center">
          <div class="bg-primary text-center w-100">
            IKR Kontenrahmen - {{ new Date().getFullYear() }}
          </div>
        </v-footer>
      </v-app>
    </v-layout>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { VList, VListItem } from 'vuetify/components/VList';
import { VDivider } from 'vuetify/components/VDivider';
import { VNavigationDrawer } from 'vuetify/components/VNavigationDrawer';
import { mdiAccount, mdiFolder, mdiAccountMultiple } from '@mdi/js';
import {
  VApp,
  VAppBar,
  VMain,
  VContainer,
  VFooter,
  VBtn,
  VLayout,
  VCard,
  VToolbarTitle,
  VSpacer,
} from 'vuetify/components';
import { mdiPlusCircle, mdiSearchWeb } from '@mdi/js';
const drawer = ref(false);
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
