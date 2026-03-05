<script setup lang="ts">
import type { DynamicFormField } from "~~/data/data"

const props = withDefaults(defineProps<{
  fields: readonly DynamicFormField[]
  errors?: Record<string, string>
  tone?: "cyan" | "emerald"
}>(), {
  errors: () => ({}),
  tone: "cyan"
})

const model = defineModel<Record<string, string>>({ required: true })
const numbersOnlyRegex = /[^0-9]/g

const defaultStateClass = computed(() =>
  props.tone === "emerald"
    ? "border-slate-300 focus:border-emerald-500 focus:ring-emerald-200"
    : "border-slate-300 focus:border-cyan-500 focus:ring-cyan-200"
)

const errorStateClass = "border-rose-300 focus:border-rose-500 focus:ring-rose-200"

function sanitizeFieldValue(field: DynamicFormField, value: string) {
  if (field.sanitize === "numbersOnly") {
    return value.replace(numbersOnlyRegex, "")
  }

  return value
}

function updateFieldValue(field: DynamicFormField, value: string) {
  model.value[field.key] = sanitizeFieldValue(field, value)
}

function onInput(field: DynamicFormField, event: Event) {
  const target = event.target as HTMLInputElement | null

  if (!target) {
    return
  }

  updateFieldValue(field, target.value)
}

function onSelect(field: DynamicFormField, event: Event) {
  const target = event.target as HTMLSelectElement | null

  if (!target) {
    return
  }

  updateFieldValue(field, target.value)
}
</script>

<template>
  <label
    v-for="field in fields"
    :key="field.key"
    class="text-sm font-medium text-slate-700"
    :class="[field.wrapperClass, field.marginClass]"
  >
    {{ field.label }} <span v-if="field.required" class="text-rose-600">*</span>
    <select
      v-if="field.type === 'select'"
      :required="field.required"
      :value="model[field.key]"
      class="mt-2 w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:bg-white focus:ring-2"
      :class="errors[field.key] ? errorStateClass : defaultStateClass"
      @change="onSelect(field, $event)"
    >
      <option value="" disabled>{{ field.placeholder }}</option>
      <option v-for="option in field.options ?? []" :key="`${field.key}-${option}`" :value="option">
        {{ option }}
      </option>
    </select>
    <input
      v-else
      :value="model[field.key]"
      :type="field.type"
      :required="field.required"
      :placeholder="field.placeholder"
      :autocomplete="field.autoComplete"
      :min="field.min"
      :step="field.step"
      class="mt-2 w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:bg-white focus:ring-2"
      :class="errors[field.key] ? errorStateClass : defaultStateClass"
      @input="onInput(field, $event)"
    />
    <p v-if="errors[field.key]" class="mt-1 text-xs font-medium text-rose-600">
      {{ errors[field.key] }}
    </p>
  </label>
</template>
