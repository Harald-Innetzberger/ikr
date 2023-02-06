<template>
  <v-footer class="justify-center">
    <span class="bg-primary w-100 text-right pr-4">
      IKR Kontenrahmen - {{ new Date().getFullYear() }}
      |
      <router-link to="/register" class="text-yellow"
        >Account anlegen</router-link
      >
    </span>
  </v-footer>
</template>
<script setup lang="ts">
import { VFooter } from 'vuetify/components';
</script>
