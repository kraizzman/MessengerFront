<template>
  <a href="#" class="flex items-center">
    <span
      class="flex items-center justify-center text-indigo-100 hover:bg-indigo-700 h-12 w-12 rounded-2xl"
    >
      <HomeIcon v-if="icon === 'home'"/>
      <CalendarIcon v-if="icon === 'calendar'"/>
      <BubbleIcon v-if="icon === 'bubble'"/>
      <SettingsIcon v-if="icon === 'settings'"/>
    </span>
  </a>
</template>

<script setup lang="ts">
import HomeIcon from './icons/HomeIcon.vue';
import CalendarIcon from './icons/CalendarIcon.vue';
import BubbleIcon from './icons/BubbleIcon.vue';
import SettingsIcon from './icons/SettingsIcon.vue';

defineProps({
  icon: {
    type: String,
    required: true
  }
})


</script>
