<script setup lang="ts">
import { VRow, VCol, VAlert } from 'vuetify/components';
import { mdiInformationOutline } from '@mdi/js';
import axios from 'axios';
import type { UserModel } from '@/models/UserModel';
import DynamicForm from '@/components/DynamicForm.vue';
import * as yup from 'yup';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const msg = ref('');

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
      type: 'text',
      rules: yup.string().required(),
    },
  ],
};

async function login(value: any) {
  try {
    await axios.post<UserModel>(`/api/user/login`, value);
    // msg ...
    msg.value = 'Angemeldet ...';
    router.push('/');
  } catch (error: any) {
    msg.value = 'E-Mail und/oder Passwort falsch.';
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
        :buttonLabel="'Anmelden'"
        @update="login"
      />
    </v-col>
  </v-row>
</template>
