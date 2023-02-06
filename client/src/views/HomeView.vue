<template>
  <v-row>
    <v-col cols="12" sm="3">
      <v-card min-height="150">
        <v-toolbar
          density="compact"
          title="Kontonummer"
          elevation="3"
          color="primary"
        ></v-toolbar>
        <v-card-text>
          <v-form ref="numberInputForm">
            <v-text-field
              dense
              v-model.number="accountNumberInput"
              type="number"
              @input="getDetailsOnInput"
              hide-details
              :append-inner-icon="selectedIkr ? mdiPencil : ''"
              :append-icon="selectedIkr ? mdiTrashCanOutline : ''"
              @click:append-inner="editIkrData"
              @click:append="deleteEntry"
            ></v-text-field>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" sm="4">
      <v-card min-height="150">
        <v-toolbar
          density="compact"
          title="Kontoklasse"
          elevation="3"
          color="primary"
        ></v-toolbar>
        <v-card-text>
          {{ selectedIkr ? selectedIkr['category'] : '' }}
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" sm="5">
      <v-card min-height="150">
        <v-toolbar
          density="compact"
          title="Kontobezeichnung"
          elevation="3"
          color="primary"
        ></v-toolbar>
        <v-card-text>
          {{ selectedIkr ? selectedIkr['name'] : '' }}
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card min-height="150">
        <v-toolbar
          density="compact"
          title="Kontobeschreibung"
          elevation="3"
          color="primary"
        ></v-toolbar>
        <v-card-text>
          <pre>{{ selectedIkr ? selectedIkr['description'] : '' }}</pre>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import {
  VRow,
  VCol,
  VToolbar,
  VCard,
  VCardText,
  VTextField,
  VForm,
} from 'vuetify/components';

import { mdiPencil, mdiTrashCanOutline } from '@mdi/js';
import { useIkrStore } from '@/stores/ikr';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
const router = useRouter();

const selectedIkr = ref(null);
const accountNumberInput = ref(null);
const numberInputForm = ref(null);

const ikrStore = useIkrStore();
ikrStore.resetIkr();

// edit ikr data
function editIkrData() {
  ikrStore.setIkr({ ikr: selectedIkr.value });
  router.push({ name: 'createIkr' });
}

// show ikr via account number input
async function getDetailsOnInput() {
  try {
    const response = await axios.get(`/api/ikr/${accountNumberInput.value}`, {
      withCredentials: true,
    });
    selectedIkr.value = response.data[0];
  } catch (error) {
    console.log(error);
  }
}

// delete ikr entry
async function deleteEntry() {
  if (
    window.confirm('Sind Sie sicher, dass Sie diesen Eintrag löschen wollen?')
  ) {
    const id = selectedIkr.value['_id'];
    try {
      await axios.delete(`api/ikr/${id}`, {
        withCredentials: true,
      });
      selectedIkr.value = null;
      numberInputForm.value.reset();
      toast('Eintrag gelöscht', { type: 'success' });
    } catch (error) {
      console.log(error);
      toast('Fehler beim Löschen', { type: 'error' });
    }
  }
}
</script>
<style scoped>
pre {
  padding-left: 0;
}
</style>
