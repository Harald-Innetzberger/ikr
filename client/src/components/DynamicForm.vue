<template>
  <Form @submit="onSubmit" :initial-values="initialFormData">
    <div
      v-for="{ as, name, label, options, ...attrs } in schema.fields"
      :key="name"
    >
      <label :for="name">{{ label }}</label>
      <Field
        :as="as"
        :id="name"
        :name="name"
        v-bind="attrs"
        @input="
          showSubmitButton === false
            ? onSubmit({ accountNumber: $event.target.value })
            : null
        "
      >
        <template v-if="options && options.length">
          <option
            v-for="(option, index) in options"
            :key="index"
            :value="option.value"
            :selected="option.value"
          >
            {{ option.text }}
          </option>
        </template>
      </Field>
      <ErrorMessage :name="name" class="smiley" />
    </div>
    <button v-if="showSubmitButton" type="submit" class="v-btn bg-primary">
      {{ buttonLabel }}
    </button>
  </Form>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';

defineProps({
  schema: {
    type: Object,
    required: true,
  },
  initialFormData: {
    type: Object,
    required: false,
  },
  showSubmitButton: {
    type: Boolean,
    default: true,
    required: false,
  },
  buttonLabel: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(['update']);

// Submit on button click or on live input if submit button is false
function onSubmit(value: any) {
  emit('update', value);
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
select,
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
