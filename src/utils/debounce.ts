export interface DebouncedFunction<T extends (...args: never[]) => void> {
  (...args: Parameters<T>): void
  cancel (): void
}

export function debounce<T extends (...args: never[]) => void> (
  fn: T,
  delay = 300,
): DebouncedFunction<T> {
  let timer: ReturnType<typeof setTimeout> | undefined

  const debounced = ((...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }) as DebouncedFunction<T>
  debounced.cancel = () => clearTimeout(timer)

  return debounced
}
