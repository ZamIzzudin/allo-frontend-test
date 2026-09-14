import { ref } from 'vue'
import { defineStore } from 'pinia'

import { fetchRocket, fetchRockets } from '@/services/rockets'
import type { Rocket } from '@/types/rocket'

export const useRocketsStore = defineStore('rockets', () => {
  const rockets = ref<Rocket[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const loaded = ref(false)

  async function load () {
    if (loaded.value || loading.value) return
    loading.value = true
    error.value = null
    try {
      rockets.value = await fetchRockets()
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
    rockets.value.push(rocket)
    return rocket
  }

  return { rockets, loading, error, loaded, load, findRocket, loadRocket }
})
