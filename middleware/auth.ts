
export default defineNuxtRouteMiddleware(async (to) => {
    const user = await useUser()
    if (!user) {
        navigateTo('/')
    }
})