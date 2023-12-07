<template>
  <div
    :class="
      twMerge('w-72 bg-white border border-gray-200 rounded-lg cursor-pointer ', selected && 'border-red-400 border-4')
    "
  >
    <div class="flex flex-col items-center py-8">
      <div class="relative">
        <img
          class="w-24 h-24 mb-3 rounded-full shadow-lg"
          :src="`https://source.unsplash.com/${user.profilePicId}/100x100`"
          alt="Bonnie image"
        />
        <span
          class="top-0 left-16 absolute w-6 h-6 border-2 border-white rounded-full"
          :class="online ? 'bg-green-500' : 'bg-red-500'"
        />
      </div>
      <h5 class="mb-1 text-xl font-medium text-gray-900">
        {{ user.username }}
      </h5>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/models/user'
import { twMerge } from 'tailwind-merge'

withDefaults(
  defineProps<{
    user: User
    online?: boolean
    selected: boolean
  }>(),
  {
    online: false
  }
)
</script>
