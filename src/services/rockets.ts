import { getJson } from '@/utils/http'
import type { Rocket } from '@/types/rocket'

const BASE_URL = 'https://lldev.thespacedevs.com/2.2.0'

interface LauncherConfig {
  id: number
  full_name: string
  description: string | null
  image_url: string | null
  launch_cost: string | null
  maiden_flight: string | null
  manufacturer: {
    country_code: string | null
  } | null
}

interface LauncherListResponse {
  results: LauncherConfig[]
}

// Utils to Mapping Data
function toRocket (launcher: LauncherConfig): Rocket {
  return {
    id: launcher.id,
    fullName: launcher.full_name,
    description: launcher.description,
    imageUrl: launcher.image_url,
    launchCost: launcher.launch_cost != null ? Number(launcher.launch_cost) : null,
    countryCode: launcher.manufacturer?.country_code ?? null,
    maidenFlight: launcher.maiden_flight,
  }
}

export async function fetchRockets (): Promise<Rocket[]> {
  const data = await getJson<LauncherListResponse>(
    `${BASE_URL}/config/launcher/?manufacturer__name=SpaceX&mode=detailed&limit=20`,
  )
  return data.results.map(toRocket)
}

export async function fetchRocket (id: number): Promise<Rocket> {
  const data = await getJson<LauncherConfig>(`${BASE_URL}/config/launcher/${id}/`)
  return toRocket(data)
}
