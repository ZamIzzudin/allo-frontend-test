<template>
  <v-card>
    <v-img
      v-if="rocket.imageUrl"
      :src="rocket.imageUrl"
      cover
      height="200"
    />
    <v-sheet
      v-else
      color="grey-darken-3"
      height="200"
      class="d-flex align-center justify-center"
    >
      <v-icon
        icon="mdi-rocket-launch-outline"
        size="48"
      />
    </v-sheet>

    <v-card-title>{{ rocket.fullName }}</v-card-title>

    <v-card-text>
      <p
        v-if="rocket.description"
        class="description"
      >
        {{ rocket.description }}
      </p>
      <p
        v-else
        class="description text-medium-emphasis"
      >
        No description available.
      </p>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
  import type { Rocket } from '@/types/rocket'

  defineProps<{ rocket: Rocket }>()
</script>

<style scoped>
  .description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
</style>
