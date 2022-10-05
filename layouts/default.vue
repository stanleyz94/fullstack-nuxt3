<template>
  <div class="h-screen dark:bg-black">
    <BaseNavbar />
    <slot />
  </div>
</template>

<script setup lang="ts">
import BaseNavbar from '~/components/layout/base/BaseNavbar.vue'
</script>
