<template>
  <div class="dark:bg-black h-screen">
    <div class="flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full">
        <div>
          <h2
            class="mt-6 py-9 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-400"
          >
            Sign Up
          </h2>
        </div>
        <div
          v-if="v$.$errors.length"
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-3"
          role="alert"
        >
          <strong class="font-bold">Oops, try again! </strong>
          <ul class="block sm:inline">
            <li v-for="error of v$.$errors" :key="error.$uid">
              {{ error.$message }}
            </li>
          </ul>
        </div>
        <form class="mt-8 space-y-6" action="#" method="POST" @submit.prevent>
          <input type="hidden" name="remember" value="true" />
          <div class="rounded-md shadow-sm -space-y-px mb-1">
            <div>
              <label for="name" class="sr-only">Name</label>
              <input
                id="name"
                v-model="registrationForm.name"
                name="name"
                required
                class="appearance-none dark:bg-neutral-500 dark:text-white dark:placeholder-white rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                :class="v$.name.$errors.length ? ' border-red-500' : ''"
                placeholder="Name"
              />
            </div>
          </div>
          <div class="rounded-md shadow-sm -space-y-px mb-1">
            <div>
              <label for="username" class="sr-only">Username</label>
              <input
                id="username"
                v-model="registrationForm.username"
                name="username"
                required
                class="dark:bg-neutral-500 dark:text-white dark:placeholder-white appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                :class="v$.username.$errors.length ? ' border-red-500' : ''"
                placeholder="Username"
              />
            </div>
          </div>

          <div class="rounded-md shadow-sm -space-y-px mb-1">
            <div>
              <label for="email-address" class="sr-only">Email address</label>
              <input
                id="email-address"
                v-model="registrationForm.email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="dark:bg-neutral-500 dark:text-white dark:placeholder-white appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                :class="v$.email.$errors.length ? ' border-red-500' : ''"
                placeholder="Email address"
              />
            </div>
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="registrationForm.password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="dark:bg-neutral-500 dark:text-white dark:placeholder-white appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
              :class="v$.password.$errors.length ? ' border-red-500' : ''"
              placeholder="Password"
            />
          </div>

          <div class="flex items-center justify-between">
            <div class="text-sm">
              <a
                href="#"
                class="font-medium text-teal-600 hover:text-green-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div></div>
        </form>
        <button
          class="mt-5 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          @click.prevent="postRegisterForm"
        >
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <!-- Heroicon name: solid/lock-closed -->
            <svg
              class="h-5 w-5 text-green-500 group-hover:text-green-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          Register
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import {
  required,
  email as emailValidator,
  minLength,
  helpers,
} from '@vuelidate/validators'
import { registerWithEmail } from '@/composables/useAuth'

const registrationForm = reactive({
  name: '',
  username: '',
  email: '',
  password: '',
})

const registrationRules = {
  name: {
    required: helpers.withMessage('Name is required', required),
  },
  username: {
    required: helpers.withMessage('Username is required', required),
  },
  email: {
    required: helpers.withMessage('Email is required', required),
    emailValidator: helpers.withMessage(
      ({ $model }) => `${$model} is not a valid email!`,
      emailValidator
    ),
  },
  password: {
    required: helpers.withMessage('Password is required', required),
    minLength: helpers.withMessage(
      'Password is too short - should be min 6 characters',
      minLength(6)
    ),
  },
}

const v$ = useVuelidate(registrationRules, registrationForm)

async function postRegisterForm() {
  const validation = await v$.value.$validate()
  if (!validation) return
  await registerWithEmail(registrationForm)
}
</script>
