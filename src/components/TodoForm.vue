<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTodoStore } from '@/stores/todoStore'
import { PlusCircle } from 'lucide-vue-next'

const router = useRouter()
const store = useTodoStore()
const title = ref('')

const handleSubmit = () => {

    if (title.value.trim()) 
    {
        store.addTodo(title.value.trim())
        router.push('/')
    }
}
</script>

<template>
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
</template>
