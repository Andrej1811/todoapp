<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="min-h-screen bg-slate-50 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-100 via-slate-50 to-purple-100">
    <div class="container mx-auto px-4 py-8">
      <RouterView />
    </div>
  </main>
</template>
