<template>
  <v-card :to="`/rockets/${rocket.id}`">
    <RocketImage
      :src="rocket.imageUrl"
      :height="200"
    />

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
