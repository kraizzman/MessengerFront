<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="w-[600px] bg-white p-8 shadow-md rounded-lg">
      <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="username" class="block text-gray-700 font-bold mb-2">Username</label>
          <input
            type="text"
            v-model="username"
            id="username"
            name="username"
            class="w-full border rounded py-2 px-3"
            required
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-700 font-bold mb-2">Password</label>
          <input
            type="password"
            v-model="password"
            id="password"
            name="password"
            class="w-full border rounded py-2 px-3"
            required
          />
        </div>
        <div class="text-center">
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const password = ref<string>()

const submitForm = async () => {
}
</script>
