<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { twMerge } from 'tailwind-merge'

const router = useRouter()

onMounted(async () => {
  // fetch users

  // fetch conversations
})

const selectedUsersIds = ref<Array<string>>([])

const createConversation = async () => {
}
</script>

<template>
  <main class="h-screen">
    <div class="flex flex-row h-screen">
      <div class="flex-col w-1/3 max-w-[500px]">
        <div class="bg-white p-4 shadow-md rounded-lg h-[100px]">
          <div class="flex items-center">
            <img
              :src="`https://source.unsplash.com/userid/100x100`"
              alt="User Image"
              class="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h2 class="text-2xl font-bold">Nom de l'utilisateur connecté</h2>
              <span class="text-green-500">Online</span>
            </div>
          </div>
        </div>

        <!-- liste de conversations -->
      </div>
      <div class="w-2/3 h-full px-4">
        <template v-if="true"> <!-- v if pas de conversation selectionnee -->
          <h2 class="font-bold text-3xl p-2">Users</h2>
          <button
            :disabled="!selectedUsersIds.length"
            @click="createConversation"
            :class="twMerge(
              'py-2 px-4 my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded',
              !selectedUsersIds.length && 'bg-blue-400 cursor-not-allowed hover:bg-blue-400'
            )">
            Create conversation
          </button>
          <div class="flex flew-row flex-wrap gap-2">
            <!-- liste des utilisateurs -->
            <template
              v-for="user in []"
            >
              Un utilisateur {{ user }}
            </template>
          </div>
        </template>
        <!-- vue d'une conversation -->
        <template v-else>
            Conversation
        </template>
      </div>
    </div>
  </main>
</template>
