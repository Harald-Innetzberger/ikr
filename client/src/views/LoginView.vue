<script setup lang="ts">
import { VRow, VCol } from 'vuetify/components';
import axios from 'axios';
import type { UserModel } from '@/models/UserModel';
import DynamicForm from '@/components/DynamicForm.vue';
import * as yup from 'yup';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
const router = useRouter();

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
    await axios.post<UserModel>(`/api/user/login`, value);
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
        :buttonLabel="'Anmelden'"
        @update="login"
      />
    </v-col>
  </v-row>
</template>
