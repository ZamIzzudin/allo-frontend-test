## Summary

Develop two-screen website displaying SpaceX rockets: a **list screen** (image, name, description and filterable by name) and
a **detail screen** (image, name, description, cost per launch, country, first flight).

Data comes from the Launch Library 2 API (`2.2.0`, `lldev` host, all 13 rockets in a single request). Adding a rocket is `local-only`(the new rocket appears in the running app, is filterable, and has a working detail screen)

## Requirements Checklist

**Functional**

- [v] List screen shows rocket image, name, and description
- [v] Filter rockets on the list screen (debounced name search)
- [v] Add a new rocket locally : appears in the running app
- [v] Detail screen by clicking a rocket: image, name, description, cost per launch, country, first flight
- [v] Both screens still display correctly with missing data (several rockets have no `launch_cost`, `image_url`, or  
   `maiden_flight`)

**Non-functional**

- [v] Launch Library 2 API : `2.2.0` on `lldev.thespacedevs.com` exactly as specified
- [v] State management : Pinia setup store as the single source of truth
- [v] Lifecycle hooks : loading in `onMounted`, debounced-timer cleanup on unmount
- [v] Reusable components : `RocketCard`, `RocketImage`, `AddRocketDialog`
- [v] UI states : Loading / Fail + Retry / Success on both screens
- [v] Responsive : Vuetify grid: 3 columns on desktop, 2 on small screens, 1 on mobile

## Technical Decisions

**API boundary (`src/services/`, `src/types/`)** : raw snake_case payloads with nullable fields are mapped once into  
 a clean `Rocket` model (`launch_cost` string → `number | null`); components never touch raw API shapes. `getJson`  
 throws on non-OK responses so every failure reaches the retry UI through a single path.

**Store split (`src/stores/rockets.ts`)** : the API cache (`apiRockets`) and locally added rockets (`localRockets`)  
 are separate refs combined by one computed, because a refetch replaces the cache wholesale and must never wipe local  
 additions. `load()` guards against duplicate requests and doubles as the retry action (a failed load leaves `loaded`  
 false, so a second call simply refetches).

**Cache-first detail screen** : navigating from the list costs zero extra requests, since all rockets arrive in one  
 request; a direct URL visit fetches the single-rocket endpoint and pushes the result into the cache for future visits.

**Filter (`src/pages/index.vue` + `src/utils/debounce.ts`)** : filtering runs client-side over the cached list: 13  
 items and a 15 req/h anonymous rate limit make per-keystroke requests a non-starter. Input is debounced 300 ms through  
 a typed generic util exposing `cancel()`; clearing the field applies instantly. Filter state stays local to the page  
 since nothing else consumes it.

**Adding rockets (`AddRocketDialog`)** : validated form (name required, everything else optional, empty fields map to
`null`). Local rockets get a `Date.now()` id that cannot collide with Launch Library's small database ids, so their  
detail screen works like any other. The list clears the active filter on add, guaranteeing the new card is visible.
