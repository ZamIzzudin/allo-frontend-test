<template>
  <v-dialog
    v-model="dialog"
    max-width="600"
  >
    <template #activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="primary"
        variant="tonal"
        prepend-icon="mdi-plus"
      >
        Add rocket
      </v-btn>
    </template>

    <v-card title="Add rocket">
      <v-card-text>
        <v-form
          v-model="valid"
          @submit.prevent="submit"
        >
          <v-text-field
            v-model="form.fullName"
            label="Name"
            :rules="nameRules"
          />

          <v-textarea
            v-model="form.description"
            label="Description (optional)"
            rows="3"
          />

          <v-text-field
            v-model="form.imageUrl"
            label="Image URL (optional)"
          />

          <v-text-field
            v-model="form.launchCost"
            label="Cost per launch (optional)"
            type="number"
          />

          <v-text-field
            v-model="form.countryCode"
            label="Country (optional)"
          />

          <v-text-field
            v-model="form.maidenFlight"
            label="First flight (optional)"
            type="date"
          />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn
          variant="text"
          @click="dialog = false"
        >
          Cancel
        </v-btn>

        <v-btn
          color="primary"
          variant="flat"
          :disabled="!valid"
          @click="submit"
        >
          Add
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useRocketsStore } from '@/stores/rockets'

  const emit = defineEmits<{ added: [] }>()

  const rocketsStore = useRocketsStore()

  const dialog = ref(false)
  const valid = ref(false)

  function emptyForm () {
    return {
      fullName: '',
      description: '',
      imageUrl: '',
      launchCost: '',
      countryCode: '',
      maidenFlight: '',
    }
  }

  const form = ref(emptyForm())

  const nameRules = [
    (value: string) => !!value.trim() || 'Name is required',
  ]

  function submit () {
    if (!valid.value) return

    rocketsStore.addRocket({
      fullName: form.value.fullName.trim(),
      description: form.value.description.trim() || null,
      imageUrl: form.value.imageUrl.trim() || null,
      launchCost: form.value.launchCost ? Number(form.value.launchCost) : null,
      countryCode: form.value.countryCode.trim() || null,
      maidenFlight: form.value.maidenFlight || null,
    })

    form.value = emptyForm()
    dialog.value = false
    emit('added')
  }
</script>
