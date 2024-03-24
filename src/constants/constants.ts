export default {
    // @ts-expect-error This is ensured
    BACKEND_URL: import.meta.env.VITE_BACKEND_BASE_URL ?? ''
}