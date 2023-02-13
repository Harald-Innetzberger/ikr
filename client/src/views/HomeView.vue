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
        <v-card-item>
          <DynamicForm
            :schema="formSchema"
            :show-submit-button="false"
            @update="getDetailsOnInput"
          />
        </v-card-item>
        <v-card-actions v-if="showEditDelIcons">
          <v-spacer></v-spacer>
          <v-btn
            :icon="mdiPencil"
            @click="editIkrData"
            size="small"
            variant="text"
            title="Eintrag bearbeiten"
          />
          <v-btn
            :icon="mdiTrashCanOutline"
            @click="deleteEntry"
            size="small"
            variant="text"
            title="Eintrag löschen"
          />
        </v-card-actions>
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
        <v-card-text class="card-description">
          <pre>{{ selectedIkr ? selectedIkr['description'] : '' }}</pre>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  VRow,
  VCol,
  VToolbar,
  VCard,
  VCardItem,
  VCardText,
  VCardActions,
  VSpacer,
  VBtn,
} from 'vuetify/components';
import { inject } from 'vue';
import { mdiPencil, mdiTrashCanOutline } from '@mdi/js';
import { useUserStore } from '@/stores/user';
import { useIkrStore } from '@/stores/ikr';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import * as yup from 'yup';
import DynamicForm from '@/components/DynamicForm.vue';
const router = useRouter();

const $http: any = inject('$myHttp');

const selectedIkr = ref(null);
const userStore = useUserStore();
const ikrStore = useIkrStore();
ikrStore.resetIkr();

// Create all required form fields for schema.
const formSchema = {
  fields: [
    {
      label: '',
      name: 'accountNumber',
      as: 'input',
      type: 'number',
      rules: yup.number().required().min(1).max(4),
    },
  ],
};

// show/hide edit and delete icons in template
const showEditDelIcons = computed(() => {
  return (
    userStore.getUser && userStore.getUser.role === 'admin' && selectedIkr.value
  );
});

// edit ikr data
function editIkrData() {
  ikrStore.setIkr({ ikr: selectedIkr.value });
  router.push({ name: 'createIkr' });
}

// show ikr via account number input
async function getDetailsOnInput(data: any) {
  const { accountNumber } = data;
  if (!accountNumber) {
    selectedIkr.value = null;
  } else {
    try {
      const response = await $http.get(`/api/ikr/${accountNumber}`, {
        withCredentials: true,
      });
      selectedIkr.value = response.data[0];
    } catch (error) {
      console.log(error);
    }
  }
}

// delete ikr entry
async function deleteEntry() {
  if (
    window.confirm('Sind Sie sicher, dass Sie diesen Eintrag löschen wollen?')
  ) {
    const id = selectedIkr.value['_id'];
    try {
      await $http.delete(`api/ikr/${id}`, {
        withCredentials: true,
      });
      selectedIkr.value = null;
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
.card-description {
  width: calc(100vw - 50px);
  overflow-x: auto;
}
</style>
