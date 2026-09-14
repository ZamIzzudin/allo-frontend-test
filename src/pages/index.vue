<template>
  <v-container>
    <h1 class="text-h4 mb-6">
      SpaceX Rockets
    </h1>

    <div
      v-if="rocketsStore.loading"
      class="d-flex justify-center mt-16"
    >
      <v-progress-circular
        indeterminate
        color="primary"
        size="48"
      />
    </div>

    <v-alert
      v-else-if="rocketsStore.error"
      type="error"
      variant="tonal"
      prominent
      class="mt-8"
    >
      <p class="text-h6">
        Failed to load rockets
      </p>
      <p class="text-body-2">
        {{ rocketsStore.error }}
      </p>
      <v-btn
        class="mt-4"
        color="error"
        variant="flat"
        @click="rocketsStore.load()"
      >
        Retry
      </v-btn>
    </v-alert>

    <v-row v-else>
      <v-col
        v-for="rocket in rocketsStore.rockets"
        :key="rocket.id"
        cols="12"
        sm="6"
        md="4"
      >
        <RocketCard :rocket="rocket" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useRocketsStore } from '@/stores/rockets'

  const rocketsStore = useRocketsStore()

  onMounted(() => {
    rocketsStore.load()
  })
</script>
