<script setup lang="ts">
import { ref } from 'vue';
import DynamicForm from '@/components/DynamicForm.vue';
import * as yup from 'yup';
import { useIkrStore } from '@/stores/ikr';
import axios from 'axios';
import { VRow, VCol, VAlert } from 'vuetify/components';
import { mdiInformationOutline } from '@mdi/js';
import type { IkrModel } from '@/models/IkrModel';

const initialFormData = ref<IkrModel>({
  category: 0,
  number: 0,
  description: '',
  name: '',
});

const msg = ref('');

// Create all required form fields for schema.
const formSchema = {
  fields: [
    {
      label: 'Kontoklasse',
      name: 'category',
      as: 'input',
      type: 'number',
      rules: yup.number().required(),
    },
    {
      label: 'Kontonummer',
      name: 'number',
      as: 'input',
      type: 'number',
      rules: yup.number().required(),
    },
    {
      label: 'Kontobeschreibung',
      name: 'description',
      as: 'textarea',
      rows: 4,
      cols: 50,
      type: 'text',
      rules: yup.string().required(),
    },
    {
      label: 'Kontoname',
      name: 'name',
      type: 'text',
      as: 'input',
      rules: yup.string().required(),
    },
  ],
};

const ikrStore = useIkrStore();
if (ikrStore.getIkr) {
  const { ikr } = ikrStore.getIkr;
  initialFormData.value = ikr;
}

async function update(value: any) {
  try {
    '_id' in value // edit mode = _id in value ...
      ? await axios.post<IkrModel>(`/api/ikr/${value._id}`, value)
      : await axios.post<IkrModel>(`/api/ikr/`, value);
    // msg ...
    msg.value = '_id' in value ? 'Eintrag bearbeitet' : 'Eintrag hinzugefügt';
  } catch (error: any) {
    msg.value = error.response.data.message;
  }
}
</script>

<template>
  <v-row dense>
    <v-col cols="12">
      <v-alert v-if="msg" type="info" :icon="mdiInformationOutline">
        {{ msg }}
      </v-alert>
      <DynamicForm
        :schema="formSchema"
        :initialFormData="initialFormData"
        @update="update"
      />
    </v-col>
  </v-row>
</template>
