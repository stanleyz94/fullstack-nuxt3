export default defineNuxtRouteMiddleware(async () => {
  const user = await useUser()
  // user !== null && user !== undefined
  if (user) {
    return '/'
  }
})
