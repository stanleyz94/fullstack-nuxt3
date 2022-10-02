<template>
<div
    class="min-h-screen from-white to-blue-200 dark:bg-black/95">
    <div class="container m-auto px-6 py-20 md:px-12 lg:px-20">
    <div class="m-auto text-center lg:w-8/12 xl:w-7/12">
        <h2 class="text-2xl text-gray-800 dark:text-gray-200 font-bold md:text-4xl">Premium Question Board Access
        </h2>
    </div>
    <div class="mt-12 m-auto -space-y-4 items-center justify-center md:flex md:space-y-0 md:-space-x-4 xl:w-10/12">
        <div class="relative z-10 -mx-4 group md:w-6/12 md:mx-0 lg:w-5/12">
        <div aria-hidden="true"
            class="absolute top-0 w-full h-full dark:bg-neutral-900 border-2  border-green-500/50 rounded-2xl bg-white shadow-xl ">
        </div>
        <div class="relative p-6 space-y-6 lg:p-8">
            <h3 class="text-3xl text-gray-700 dark:text-white font-semibold text-center">Premium Membership</h3>
            <div>
            <div class="relative flex justify-around">
                <div class="flex items-end">
                <span class="text-8xl text-gray-800 dark:text-white font-bold leading-0">10</span>
                <div class="pb-2">
                    <span class="block text-2xl text-gray-700 dark:text-white font-bold">&euro;</span>
                </div>
                </div>
            </div>
            </div>
            <ul role="list" class="w-max space-y-4 py-6 m-auto text-gray-600 dark:text-white">
            <li class="space-x-2">
                <span class="text-green-500 font-semibold">&check;</span>
                <span>Early access to content</span>
            </li>
            <li class="space-x-2">
                <span class="text-green-500 font-semibold">&check;</span>
                <span>Access to Question Board</span>
            </li>
            <li class="space-x-2">
                <span class="text-green-500 font-semibold">&check;</span>
                <span>Support Question Board</span>
            </li>
            </ul>
            <button v-if="!user" @click="goToRegister"
            class="block w-full py-3 px-6 text-center rounded-xl transition duration-500 bg-green-600 hover:bg-green-700 active:bg-green-800 focus:bg-green-600">
            <span class="text-white font-semibold">
                Sign Up and Subscribe
            </span>
            </button>
            <form v-else action="/api/subscribe" method="POST">
            <input type="hidden" name="lookup_key" value="price_1L3kuDHeYNYuGUgN8m1fVuMM" />
            <input type="hidden" name="user_id" :value="user.id" />
            <button type="submit" title="Submit"
                class="block w-full py-3 px-6 text-center rounded-xl transition duration-500 bg-green-600 hover:bg-green-700 active:bg-green-800 focus:bg-green-600">
                <span class="text-white font-semibold">
                Subscribe Now
                </span> 
            </button>
            </form>
        </div>
        </div>
    </div>
    </div>
</div>
</template>

<script setup lang="ts">
const router = useRouter()
const user = await useUser()

const goToRegister = () => router.push('/register')

</script>