<script setup lang="ts">
import { VCard, VCardTitle, VTextField } from 'vuetify/components';
import { VDataTable } from 'vuetify/labs/VDataTable';
import { mdiMagnify, mdiClose } from '@mdi/js';
import { ref, inject, onMounted } from 'vue';
import type { IkrModel } from '@/models/IkrModel';

const $http: any = inject('$myHttp');

const items = ref<IkrModel>();
const loading = ref(true);
const search = ref('');
const headers = ref([
  { title: 'Nummer', key: 'number' },
  { title: 'Name', key: 'name' },
  { title: 'Kategorie', key: 'category' },
]);
const sortBy = ref([{ key: 'number', order: 'asc' }]);

async function getAllIkrs() {
  try {
    const { data } = await $http.get('/api/ikr');
    items.value = await data;
    loading.value = false;
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  getAllIkrs();
});
</script>

<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        label="Suche ..."
        single-line
        hide-details
        clearable
        :clear-icon="mdiClose"
        :append-inner-icon="mdiMagnify"
      ></v-text-field>
    </v-card-title>
    <v-data-table
      v-model:sort-by="sortBy"
      density="compact"
      :loading="loading"
      loading-text="Kontenrahmen werden geladen ..."
      :headers="headers"
      :items="items"
      :search="search"
    />
  </v-card>
</template>
