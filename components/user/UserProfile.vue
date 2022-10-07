<template>
  <div
    ref="userActions"
    class="hidden md:flex items-center dark:text-white justify-end md:flex-1 lg:w-0"
  >
    <span class="mr-2">
      Welcome <strong>{{ user.username }}</strong>
    </span>
    <svg
      class="rounded-full w-8 h-8 hover:cursor-pointer"
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#4ade80"
      @click="hideActions = !hideActions"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
      />
    </svg>
    <ul
      :class="[{ hidden: hideActions }]"
      class="dropdown-menu min-w-max absolute bottom bg-white dark:bg-neutral-800 text-base z-100 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 top- m-0 bg-clip-padding border-none top-2/3"
      aria-labelledby="dropdownMenuButton1"
    >
      <li>
        <a
          class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 dark:text-white hover:bg-gray-100"
          href="#"
          >Settings</a
        >
      </li>
      <li @click="logout">
        <a
          class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 dark:text-white hover:bg-gray-100"
          href="#"
          >Logout</a
        >
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { IUser } from '@/types/IUser'
import { userLogout } from '@/composables/useAuth'

const user = useState<IUser>('user')
const logout = userLogout
const hideActions = ref(true)
const userActions = ref(null)

onClickOutside(userActions, () => (hideActions.value = true))
</script>
