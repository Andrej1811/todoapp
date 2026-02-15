<script setup>
import { ArrowLeft } from 'lucide-vue-next'
import TodoForm from '@/components/TodoForm.vue'
</script>

<template>
    <div class="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/40 via-transparent to-transparent">
        <div class="w-full max-w-md">
            <RouterLink 
                to="/" 
                class="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors mb-8 group"
            >
                <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Späť na úlohy
            </RouterLink>

            <TodoForm />
        </div>
    </div>
</template>