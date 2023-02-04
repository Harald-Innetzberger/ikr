<template>
  <v-row>
    <v-col cols="12" sm="2">
      <v-card>
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
    <v-col cols="12" sm="10">
      <v-card>
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
    <v-col cols="12" sm="3">
      <v-card>
        <v-toolbar
          density="compact"
          title="Kontonummer"
          elevation="3"
          color="primary"
        ></v-toolbar>
        <v-card-text>
          <v-form ref="numberInputForm">
            <v-text-field
              v-model="accountNumberInput"
              type="number"
              @input="getDetailsOnInput"
              :rules="[
                (v) =>
                  (v && v.length && v.length <= 4) ||
                  'Min. 1, Max. 4 characters',
              ]"
              hide-details
            ></v-text-field>
          </v-form>
        </v-card-text>
        <!-- action buttons -->
        <v-card-actions v-if="selectedIkr">
          <v-row>
            <v-col cols="12">
              <v-btn
                class="ma-2"
                stacked
                :prepend-icon="mdiPencil"
                variant="tonal"
                color="primary"
                @click="editIkrData"
                title="Eintrag bearbeiten"
              >
                Eintrag bearbeiten
              </v-btn>
              <v-btn
                stacked
                :prepend-icon="mdiTrashCanOutline"
                variant="tonal"
                color="error"
                @click="deleteEntry"
                title="Eintrag löschen"
              >
                Eintrag löschen
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12" sm="9">
      <v-card>
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
  VCardActions,
  VTextField,
  VBtn,
  VForm,
} from 'vuetify/components';

import { mdiPencil, mdiTrashCanOutline } from '@mdi/js';
import { useIkrStore } from '@/stores/ikr';
import { useRouter } from 'vue-router';
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
    } catch (error) {
      console.log(error);
    }
  }
}
</script>
<style scoped>
pre {
  padding-left: 0;
}
</style>
