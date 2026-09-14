<template>
  <v-container v-if="rocket">
    <v-btn
      to="/"
      variant="text"
      prepend-icon="mdi-arrow-left"
      class="mb-4 pl-0"
    >
      Back to list
    </v-btn>

    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <RocketImage
          :src="rocket.imageUrl"
          :height="360"
        />
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <h1 class="text-h3 mb-4">
          {{ rocket.fullName }}
        </h1>

        <p class="text-body-1">
          {{ rocket.description ?? 'No description available.' }}
        </p>

        <v-divider class="my-6" />

        <div class="d-flex flex-column ga-4">
          <div>
            <p class="text-caption text-medium-emphasis text-uppercase">
              Cost per launch
            </p>
            <p class="text-h6">
              {{ rocket.launchCost != null ? formatCost(rocket.launchCost) : '—' }}
            </p>
          </div>

          <div>
            <p class="text-caption text-medium-emphasis text-uppercase">
              Country
            </p>
            <p class="text-h6">
              {{ rocket.countryCode ?? '—' }}
            </p>
          </div>

          <div>
            <p class="text-caption text-medium-emphasis text-uppercase">
              First flight
            </p>
            <p class="text-h6">
              {{ rocket.maidenFlight != null ? formatDate(rocket.maidenFlight) : '—' }}
            </p>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>

  <v-container v-else-if="loading">
    <div class="d-flex justify-center mt-16">
      <v-progress-circular
        indeterminate
        color="primary"
        size="48"
      />
    </div>
  </v-container>

  <v-container v-else>
    <v-alert
      type="error"
      variant="tonal"
      prominent
      class="mt-8"
    >
      <p class="text-h6">
        Failed to load rocket
      </p>
      <p class="text-body-2">
        {{ error }}
      </p>
      <v-btn
        class="mt-4"
        color="error"
        variant="flat"
        @click="load"
      >
        Retry
      </v-btn>
    </v-alert>
  </v-container>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { useRocketsStore } from '@/stores/rockets'
  import { formatCost, formatDate } from '@/utils/format'

  const route = useRoute()
  const rocketId = Number(route.params.id)

  const rocketsStore = useRocketsStore()

  const rocket = computed(() => rocketsStore.findRocket(rocketId))

  const loading = ref(false)
  const error = ref<string | null>(null)

  async function load () {
    if (rocket.value) return
    loading.value = true
    error.value = null
    try {
      await rocketsStore.loadRocket(rocketId)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load rocket'
    } finally {
      loading.value = false
    }
  }

  onMounted(load)
</script>
