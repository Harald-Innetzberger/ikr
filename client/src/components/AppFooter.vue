<template>
  <v-footer class="justify-center">
    <div class="bg-primary text-center w-100">
      IKR Kontenrahmen - {{ new Date().getFullYear() }}
    </div>
  </v-footer>
</template>
<script setup lang="ts">
import { VFooter } from 'vuetify/components';
</script>
