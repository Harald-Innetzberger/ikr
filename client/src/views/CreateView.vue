<script setup lang="ts">
import { ref } from 'vue';
import DynamicForm from '@/components/DynamicForm.vue';
import * as yup from 'yup';
import { useIkrStore } from '@/stores/ikr';
import { VRow, VCol } from 'vuetify/components';
import type { IkrModel } from '@/models/IkrModel';
import { toast } from 'vue3-toastify';
import { inject } from 'vue';

const $http: any = inject('$myHttp');

const initialFormData = ref<IkrModel>({
  category: 0,
  number: 0,
  description: '',
  name: '',
});

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
      ? await $http.post(`/api/ikr/${value._id}`, value, {
          withCredentials: true,
        })
      : await $http.post(`/api/ikr/`, value, {
          withCredentials: true,
        });
    // msg ...
    toast('_id' in value ? 'Eintrag bearbeitet' : 'Eintrag hinzugefügt', {
      type: 'success',
    });
  } catch (error: any) {
    toast(error.response.data.message, { type: 'error' });
  }
}
</script>

<template>
  <v-row dense>
    <v-col cols="12">
      <DynamicForm
        :schema="formSchema"
        :initialFormData="initialFormData"
        :showSubmitButton="true"
        @update="update"
      />
    </v-col>
  </v-row>
</template>
