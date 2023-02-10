<script setup lang="ts">
import { VRow, VCol } from 'vuetify/components';
import axios from 'axios';
import type { UserModel } from '@/models/UserModel';
import DynamicForm from '@/components/DynamicForm.vue';
import * as yup from 'yup';
import { toast } from 'vue3-toastify';
import { inject } from 'vue';

const $http: any = inject('$myHttp');

// Create all required form fields for schema.
const formSchema = {
  fields: [
    {
      label: 'Name',
      name: 'name',
      as: 'input',
      type: 'text',
      rules: yup.string().min(5).max(30),
    },
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
    {
      label: 'Benutzerrolle',
      name: 'role',
      as: 'select',
      options: [
        { text: 'Benutzer', value: 'user' },
        { text: 'Administrator', value: 'admin' },
      ],
      rules: yup.string().required(),
    },
  ],
};

async function register(value: any) {
  try {
    await $http.post(`/api/user/register`, value);
    // router.push('/');
    toast('Benutzeraccount angelegt', { type: 'success' });
  } catch (error: any) {
    toast('Ein Account mit dieser E-Mail Adresse existiert bereits', {
      type: 'error',
    });
  }
}
</script>
<template>
  <v-row dense>
    <v-col cols="12">
      <DynamicForm
        :schema="formSchema"
        :buttonLabel="'Registrieren'"
        @update="register"
      />
    </v-col>
  </v-row>
</template>
