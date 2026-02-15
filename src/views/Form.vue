<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTodoStore } from '@/stores/todo'
import { ArrowLeft, PlusCircle } from 'lucide-vue-next'

const router = useRouter()
const store = useTodoStore()
const title = ref('')

const handleSubmit = () => {
    if (title.value.trim()) {
        store.addTodo(title.value.trim())
        router.push('/')
    }
}
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

            <div class="bg-white rounded-3xl shadow-2xl shadow-indigo-100 border border-indigo-50/50 p-8">
                <div class="mb-8">
                    <h1 class="text-2xl font-bold text-slate-900 mb-2">Pridať novú úlohu</h1>
                    <p class="text-slate-500">Zadajte názov vašej nasledujúcej úlohy.</p>
                </div>

                <form @submit.prevent="handleSubmit" class="space-y-6">
                    <div>
                        <label for="title" class="block text-sm font-semibold text-slate-700 mb-2">Názov úlohy</label>
                        <input 
                            v-model="title"
                            id="title"
                            type="text" 
                            placeholder="Napr. Kúpiť mlieko..." 
                            required
                            autofocus
                            class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-400"
                        />
                    </div>

                    <button 
                        type="submit"
                        class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        <PlusCircle class="w-5 h-5" />
                        Pridať úlohu
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>