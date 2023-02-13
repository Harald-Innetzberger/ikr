<script setup lang="ts">
import { VRow, VCol } from 'vuetify/components';
import DynamicForm from '@/components/DynamicForm.vue';
import * as yup from 'yup';
import { toast } from 'vue3-toastify';
import { inject } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const $http: any = inject('$myHttp');

// Create all required form fields for schema.
const formSchema = {
  fields: [
    {
      label: 'E-Mail',
      name: 'email',
      as: 'input',
      type: 'text',
      rules: yup.string().email().min(5).required(),
    },
    {
      label: 'Passwort',
      name: 'password',
      as: 'input',
      type: 'password',
      rules: yup.string().required(),
    },
  ],
};

async function login(value: any) {
  try {
    await $http.post(`/api/user/login`, value);
    router.push('/');
    toast('Anmeldung erfolgreich ...', { type: 'success' });
  } catch (error: any) {
    toast('Falsches Passwort und / oder Benutzername', { type: 'error' });
  }
}
</script>
<template>
  <v-row dense>
    <v-col cols="12">
      <DynamicForm
        :schema="formSchema"
        :show-submit-button="true"
        :button-label="'Anmelden'"
        @update="login"
      />
    </v-col>
  </v-row>
</template>
