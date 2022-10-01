<template>
    <div ref="userActions"  class="hidden md:flex items-center dark:text-white justify-end md:flex-1 lg:w-0">
      <span class="mr-2">
        Welcome <strong>{{ user.username }}</strong>
  
      </span>
      <img  @click="hideActions = !hideActions" :src="avatar(user.avatarUrl)" class="rounded-full w-10 h-10 mr-2"
        alt="avatar" />
  
      <ul :class="[{ 'hidden': hideActions }]" class="
            dropdown-menu
            min-w-max
            absolute
            bottom
            bg-white
            text-base
            z-100
            float-left
            py-2
            list-none
            text-left
            rounded-lg
            shadow-lg
            mt-1
            top-
            m-0
            bg-clip-padding
            border-none
          " aria-labelledby="dropdownMenuButton1">
        
          <li>
            <a class="
                  dropdown-item
                  text-sm
                  py-2
                  px-4
                  font-normal
                  block
                  w-full
                  whitespace-nowrap
                  bg-transparent
                  text-gray-700
                  hover:bg-gray-100
                " href="#">Settings</a>
          </li>
          <li @click="logout">
          <a class="
                dropdown-item
                text-sm
                py-2
                px-4
                font-normal
                block
                w-full
                whitespace-nowrap
                bg-transparent
                text-gray-700
                hover:bg-gray-100
              " href="#">Logout</a>
        </li>
      </ul>
    </div>
  </template>


<script setup lang="ts">
import { IUser} from '@/types/IUser'
import { userLogout } from '@/composables/useAuth'
import { onClickOutside } from '@vueuse/core'

const avatar = (given: string | undefined) => given ?? '/img/logo_short.png'

const user = useState<IUser>('user')
const logout = userLogout
const hideActions = ref(true)
const userActions = ref(null)

onClickOutside(userActions, () => hideActions.value = true)
</script>


