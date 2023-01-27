<template>
  <Form @submit="onSubmit" :initial-values="initialFormData">
    <div v-for="{ as, name, label, ...attrs } in schema.fields" :key="name">
      <label :for="name">{{ label }}</label>
      <Field :as="as" :id="name" :name="name" v-bind="attrs" />
      <ErrorMessage :name="name" class="smiley" />
    </div>
    <button type="submit">Submit</button>
  </Form>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';

defineProps({
  // Schema
  schema: {
    type: Object,
    required: true,
  },
  // Initial Form Data
  initialFormData: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['update']);

function onSubmit(values: any) {
  // Submit values to API...
  emit('update', values);
}
</script>
<style scoped>
span[role='alert'] {
  color: red;
  font-size: 1.2em;
  font-weight: bold;
  background-color: #ccc;
  padding: 3px;
}
.smiley::before {
  font-size: 20px;
  content: '\1F622';
  padding: 5px;
}
label {
  font-size: 1.8em;
  font-weight: bold;
}
input,
textarea {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0 10px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1.8em;
  font-family: Calibri, 'Trebuchet MS', sans-serif;
}

button {
  width: 100%;
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.5em;
  margin-top: 30px;
}

button:hover {
  background-color: #45a049;
}
</style>
