import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { fetchRocket, fetchRockets } from '@/services/rockets'
import type { NewRocket, Rocket } from '@/types/rocket'

export const useRocketsStore = defineStore('rockets', () => {
  const apiRockets = ref<Rocket[]>([])
  const localRockets = ref<Rocket[]>([])
  const rockets = computed(() => [...localRockets.value, ...apiRockets.value])

  const loading = ref(false)
  const error = ref<string | null>(null)

  const loaded = ref(false)

  async function load () {
    if (loaded.value || loading.value) return
    loading.value = true
    error.value = null
    try {
      apiRockets.value = await fetchRockets()
      loaded.value = true
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load rockets'
    } finally {
      loading.value = false
    }
  }

  function findRocket (id: number): Rocket | undefined {
    return rockets.value.find(rocket => rocket.id === id)
  }

  async function loadRocket (id: number): Promise<Rocket> {
    const cached = findRocket(id)
    if (cached) return cached
    const rocket = await fetchRocket(id)
    apiRockets.value.push(rocket)
    return rocket
  }

  function addRocket (input: NewRocket): Rocket {
    const rocket: Rocket = { id: Date.now(), ...input }
    localRockets.value.unshift(rocket)
    return rocket
  }

  return { rockets, loading, error, loaded, load, findRocket, loadRocket, addRocket }
})
