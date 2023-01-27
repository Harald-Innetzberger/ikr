<script setup lang="ts">
import { ref } from 'vue';
import DynamicForm from '@/components/DynamicForm.vue';
import * as yup from 'yup';
import { useIkrStore } from '@/stores/ikr';
import axios from 'axios';
import { VRow, VCol } from 'vuetify/components';
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
      'v-model': 'formdata.category',
      label: 'Kontoklasse',
      name: 'category',
      as: 'input',
      type: 'number',
      rules: yup.number().required(),
    },
    {
      'v-model': 'formdata.number',
      model: 'formdata.number',
      label: 'Kontonummer',
      name: 'number',
      as: 'input',
      type: 'number',
      rules: yup.number().required(),
    },
    {
      'v-model': 'formdata.description',
      label: 'Kontobeschreibung',
      name: 'description',
      as: 'textarea',
      rows: 4,
      cols: 50,
      type: 'text',
      rules: yup.string().required(),
    },
    {
      'v-model': 'formdata.name',
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
  console.log(value);
  try {
    const response =
      '_id' in value // edit mode = _id in value ...
        ? await axios.post<IkrModel>(`/api/ikr/${value._id}`, value)
        : await axios.post<IkrModel>(`/api/ikr/`, value);
    // msg ...
    msg.value =
      response.data && response.status === 200
        ? '_id' in value
          ? 'Eintrag bearbeitet'
          : 'Eintrag hinzugefügt'
        : '';
  } catch (error: any) {
    msg.value = error.response.data.message;
  }
}
</script>

<template>
  <v-row dense>
    <v-col cols="12">
      <DynamicForm
        :schema="formSchema"
        :initialFormData="initialFormData"
        @update="update"
      />
      {{ msg }}
    </v-col>
  </v-row>
</template>
