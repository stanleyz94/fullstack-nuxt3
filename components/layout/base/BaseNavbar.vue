<template>
  <div class="navbar relative dark:bg-black">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div
        class="flex justify-between items-center py-6 md:justify-start md:space-x-10"
      >
        <div class="mr-2 my-2 md:hidden">
          <button
            type="button"
            class="bg-white dark:bg-black rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
            aria-expanded="false"
          >
            <span class="sr-only">Open menu</span>
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <nuxt-link to="/">
          <span class="sr-only">Workflow</span>
          <!-- <img
            class="h-7 w-auto"
            src="/img/logo-question-board.png"
          /> -->
          <svg
            class="h-7 w-auto dark:text-white"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="currentColor"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <circle cx="20" cy="12" r="2" />
            <circle cx="4" cy="12" r="2" />
            <circle cx="12" cy="20" r="2" />
            <path
              d="M10.05 8.59L6.03 4.55h-.01l-.31-.32-1.42 1.41 4.02 4.05.01-.01.31.32zm3.893.027l4.405-4.392L19.76 5.64l-4.405 4.393zM10.01 15.36l-1.42-1.41-4.03 4.01-.32.33 1.41 1.41 4.03-4.02zm9.75 2.94l-3.99-4.01-.36-.35L14 15.35l3.99 4.01.35.35z"
            />
            <circle cx="12" cy="4" r="2" />
          </svg>
        </nuxt-link>
        <nav class="hidden md:flex space-x-10">
          <nuxt-link to="/subscribe">
            <span
              class="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Premium Membership
            </span>
          </nuxt-link>
          <nuxt-link to="/ask-question/search">
            <span
              class="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Ask Question
            </span>
          </nuxt-link>
          <nuxt-link to="/dashboard">
            <span
              class="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Dashboard
            </span>
          </nuxt-link>
        </nav>
        <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
          <UserProfile v-if="user" :user="user" />
          <nuxt-link
            v-if="!user"
            to="/login"
            class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
          >
            Sign in
          </nuxt-link>
          <nuxt-link
            v-if="!user"
            to="/register"
            class="transition duration-500 ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-400 hover:bg-green-500"
          >
            Sign up
          </nuxt-link>
        </div>
        <ColorScheme placeholder="..." tag="span">
          <button
            class="hidden md:block"
            @click="
              setColorTheme($colorMode.preference === 'dark' ? 'light' : 'dark')
            "
          >
            <svg
              v-if="$colorMode.value === 'dark'"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-50"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
              />
            </svg>
            <svg
              v-if="$colorMode.value === 'light'"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </ColorScheme>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useState('user')
const colorMode = useColorMode()
const setColorTheme = (newTheme: string) => {
  colorMode.preference = newTheme
}
</script>
