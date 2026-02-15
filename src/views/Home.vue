<script setup>
import TodoList from '@/components/TodoList.vue'
import { CheckCheck } from 'lucide-vue-next'
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-2 lg:gap-10 p-2 lg:p-10">
    <h1 class="text-indigo-600 text-3xl font-bold mb-4 flex items-center gap-2">
      Todo App <CheckCheck class="text-indigo-600" />
    </h1>
 
    <TodoList />
  </div>
</template>