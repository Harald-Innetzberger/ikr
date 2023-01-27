<script lang="ts">
import { defineComponent, ref } from 'vue';
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
import { mdiMinusCircle, mdiPencil } from '@mdi/js';
import { useIkrStore } from '@/stores/ikr';
import router from '@/router';

export default defineComponent({
  components: {
    VRow,
    VCol,
    VToolbar,
    VCard,
    VCardText,
    VCardActions,
    VTextField,
    VBtn,
    VForm,
  },
  setup() {
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
        const response = await axios.get(
          `/api/ikr/${accountNumberInput.value}`
        );
        selectedIkr.value = response.data[0];
      } catch (error) {
        console.log(error);
      }
    }

    // delete ikr entry
    async function deleteEntry() {
      if (
        window.confirm(
          'Sind Sie sicher, dass Sie diesen Eintrag löschen wollen?'
        )
      ) {
        const id = selectedIkr.value['_id'];
        try {
          await axios.delete(`api/ikr/${id}`);
          selectedIkr.value = null;
          numberInputForm.value.reset();
        } catch (error) {
          console.log(error);
        }
      }
    }

    return {
      selectedIkr,
      accountNumberInput,
      getDetailsOnInput,
      deleteEntry,
      mdiMinusCircle,
      mdiPencil,
      numberInputForm,
      editIkrData,
    };
  },
});
</script>

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
        <v-card-text class="text-center">
          {{ selectedIkr ? selectedIkr['category'] : '---' }}
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
          {{ selectedIkr ? selectedIkr['name'] : '---' }}
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
              label="Suche ..."
              @input="getDetailsOnInput"
              :rules="[
                (v) =>
                  (v && v.length && v.length <= 4) ||
                  'Min. 1, Max. 4 characters',
              ]"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <!-- action buttons -->
        <v-card-actions>
          <v-btn
            v-if="selectedIkr"
            class="ma-2"
            size="x-small"
            color="primary"
            variant="outlined"
            :prepend-icon="mdiPencil"
            @click="editIkrData"
          >
            Eintrag bearbeiten
          </v-btn>
          <v-btn
            v-if="selectedIkr"
            class="ma-2"
            size="x-small"
            color="error"
            variant="outlined"
            :prepend-icon="mdiMinusCircle"
            @click="deleteEntry"
          >
            Eintrag löschen
          </v-btn>
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
          {{ selectedIkr ? selectedIkr['description'] : '---' }}
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
