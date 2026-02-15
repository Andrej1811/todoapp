<script setup>
import { Loader2 } from 'lucide-vue-next'
</script>

<template>
    <div class="px-6 py-12 text-center border-b border-indigo-50/50">
        <div class="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-400 mb-4">
            <Loader2 class="w-6 h-6 animate-spin" />
        </div>
        <p class="text-slate-500 font-medium">Načítavam úlohy...</p>
    </div>
</template>