<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer expand-on-hover rail permanent>
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
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { VLayout } from 'vuetify/components/VLayout';
import { VCard } from 'vuetify/components/VCard';
import { VList, VListItem } from 'vuetify/components/VList';
import { VDivider } from 'vuetify/components/VDivider';
import { VNavigationDrawer } from 'vuetify/components/VNavigationDrawer';
import { mdiAccount, mdiFolder, mdiAccountMultiple } from '@mdi/js';

export default defineComponent({
  name: 'app-navigation',
  components: {
    VCard,
    VLayout,
    VList,
    VListItem,
    VDivider,
    VNavigationDrawer,
  },
  data() {
    return {
      mdiAccount,
      mdiFolder,
      mdiAccountMultiple,
    };
  },
});
</script>
