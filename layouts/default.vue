<template>
    <div class="h-screen dark:bg-black">
        <Navbar />
        <slot />
    </div>
</template>


<script setup lang="ts">
    import Navbar from '~/components/layout/base/navbar.vue'
</script>