export function useDebounceOnRef<T>(value: T, delay: number = 200) {
    let timeout: ReturnType<typeof setTimeout>
    return customRef((track, trigger) => {
        return {
            get() {
                track()
                return value
            },
            set(newValue) {
                if (timeout) clearTimeout(timeout)
                timeout = setTimeout(() => {
                    value = newValue
                    trigger()
                }, delay)
            }
        }
    })
}