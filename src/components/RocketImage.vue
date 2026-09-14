<template>
  <v-img
    v-if="src"
    :src="src"
    cover
    :height="height"
  />
  <v-sheet
    v-else
    color="grey-darken-3"
    :height="height"
    class="d-flex align-center justify-center"
  >
    <v-icon
      icon="mdi-rocket-launch-outline"
      size="48"
    />
  </v-sheet>
</template>

<script setup lang="ts">
  defineProps<{
    src: string | null
    height: number
  }>()
</script>
