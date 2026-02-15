<script setup>
import { XCircle } from 'lucide-vue-next'
</script>

<template>
    <div class="px-6 py-12 text-center border-b border-indigo-50/50">
        <div class="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-red-50 text-red-400 mb-4">
            <XCircle class="w-6 h-6" />
        </div>
        <p class="text-slate-500 font-medium">Nastala chyba pri načítavaní úloh</p>
    </div>
</template>