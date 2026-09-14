# CHANGES

## feat:(add rocket store)

- Add `src/stores/rockets.ts`: pinia setup store with the rocket list
  cache and `loading` / `error` / `loaded` state
- `load()` doubles as retry and skips refetching once loaded, keeping
  repeat visits within the API rate limit
