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

    <template v-else>
      <v-text-field
        v-model="filter"
        prepend-inner-icon="mdi-magnify"
        placeholder="Search rockets by name"
        clearable
        hide-details
        density="comfortable"
        class="mb-6"
        style="max-width: 400px"
      />

      <p
        v-if="filteredRockets.length === 0"
        class="text-center text-medium-emphasis mt-8"
      >
        No rockets match your search.
      </p>

      <v-row v-else>
        <v-col
          v-for="rocket in filteredRockets"
          :key="rocket.id"
          cols="12"
          sm="6"
          md="4"
        >
          <RocketCard :rocket="rocket" />
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script setup lang="ts">
  import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
  import { useRocketsStore } from '@/stores/rockets'
  import { debounce } from '@/utils/debounce'

  const rocketsStore = useRocketsStore()

  const filter = ref<string | null>('')
  const searchQuery = ref('')

  const applyFilter = debounce((value: string) => {
    searchQuery.value = value.trim().toLowerCase()
  }, 300)

  watch(filter, value => {
    if (!value) {
      applyFilter.cancel()
      searchQuery.value = ''
      return
    }
    applyFilter(value)
  })

  onBeforeUnmount(() => applyFilter.cancel())

  const filteredRockets = computed(() => {
    if (!searchQuery.value) return rocketsStore.rockets
    return rocketsStore.rockets.filter(rocket =>
      rocket.fullName.toLowerCase().includes(searchQuery.value),
    )
  })

  onMounted(() => {
    rocketsStore.load()
  })
</script>
