<template>
  <NuxtLayout> 
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { IUser } from '@/types/IUser'
import { useUser } from '@/composables/useAuth'

const nuxtApp = useNuxtApp()

nuxtApp.hook('page:finish', () => {
  window.scrollTo(0, 0)
})

const user: IUser = await useUser()


</script>