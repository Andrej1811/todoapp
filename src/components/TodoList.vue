<script setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTodoStore } from '@/stores/todoStore'
import { storeToRefs } from 'pinia'
import { usePagination } from '@/composables/usePagination'
import { constants } from '@/constants'
import { PlusCircle } from 'lucide-vue-next'

import TodoItem from './TodoItem.vue'
import Pagination from './Pagination.vue'
import LoadingState from './states/LoadingState.vue'
import ErrorState from './states/ErrorState.vue'
import EmptyState from './states/EmptyState.vue'

const route = useRoute()
const todoStore = useTodoStore()
const { todos, isLoading, errorMessage } = storeToRefs(todoStore)
const { toggleTodo, removeTodo, updateTodo, fetchTodos } = todoStore

const filterTodos = (items, status) => {
    if (status === 'completed') return items.filter(t => t.completed)
    if (status === 'uncompleted') return items.filter(t => !t.completed)

    return items
}

const currentStatus = computed(() => route.params.status || 'all')
const filteredTodos = computed(() => filterTodos(todos.value, currentStatus.value))

const { 
    currentPage, 
    totalPages, 
    pages,
    paginatedItems: paginatedTodos 
} = usePagination(filteredTodos, constants.pagination.itemsPerPage)

onMounted( () => fetchTodos())
</script>

<template>
    <div class="w-full max-w-4xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-indigo-100 border border-indigo-50/50 overflow-hidden flex flex-col max-h-[calc(100vh-8rem)] md:max-h-[calc(100vh-15rem)]">
        <div class="px-6 py-4 border-b border-indigo-50/50 bg-gradient-to-r from-indigo-50/30 to-purple-50/30 flex flex-col sm:flex-row gap-4 justify-between items-center shrink-0">
            <h2 class="text-sm font-semibold text-indigo-900/60 uppercase tracking-wider w-full sm:w-auto text-center sm:text-left">Tvoje úlohy</h2>
            
            <div class="flex flex-wrap justify-center items-center gap-2 bg-slate-100/50 p-1 rounded-2xl border border-slate-200/50 w-full sm:w-auto">
                <RouterLink 
                    to="/all"
                    aria-label="Zobraziť všetky úlohy"
                    class="px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex-1 sm:flex-none text-center"
                    :class="(currentStatus === 'all') ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-white/50'"
                >
                    Všetky
                </RouterLink>
                <RouterLink 
                    to="/uncompleted"
                    aria-label="Zobraziť rozpracované úlohy"
                    class="px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex-1 sm:flex-none text-center"
                    :class="(currentStatus === 'uncompleted') ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-white/50'"
                >
                    Rozpracované
                </RouterLink>
                <RouterLink 
                    to="/completed"
                    aria-label="Zobraziť dokončené úlohy"
                    class="px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex-1 sm:flex-none text-center"
                    :class="(currentStatus === 'completed') ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-white/50'"
                >
                    Dokončené
                </RouterLink>
            </div>

            <RouterLink 
                to="/form" 
                aria-label="Pridať novú úlohu"
                class="w-full sm:w-auto justify-center text-sm font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-all py-2.5 px-5 rounded-xl flex items-center gap-2 shadow-sm"
            >
                <PlusCircle class="w-4 h-4" /> 
                Pridať úlohu
            </RouterLink>
        </div>
        
        <!-- TODO LIST START -->
        <div class="grow overflow-auto">

            <template v-if="isLoading">
                <LoadingState />
            </template>

            <template v-else-if="errorMessage">
                <ErrorState />
            </template>

            <template v-else-if="filteredTodos.length === 0">
                <EmptyState />
            </template>

            <template v-else>
                <table class="w-full text-left border-collapse" aria-label="Zoznam úloh">
                    <thead class="hidden md:table-header-group bg-indigo-50/80 backdrop-blur-md text-indigo-900/40 text-[10px] uppercase tracking-widest font-bold sticky top-0 z-10">
                        <tr>
                            <th class="px-6 py-3 w-16" scope="col">Status</th>
                            <th class="px-6 py-3" scope="col">Názov úlohy</th>
                            <th class="px-6 py-3 w-24 text-right" scope="col">Akcie</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-indigo-50/50 block md:table-row-group">
                        <TodoItem 
                            v-for="todo in paginatedTodos" 
                            :key="todo.id" 
                            :todo="todo"
                            @toggle="toggleTodo"
                            @remove="removeTodo"
                            @update="updateTodo"
                        />
                    </tbody>
                </table>
            </template>
        </div>
        <!-- TODO LIST END -->


        <!-- PAGINATION START -->
        <div class="px-6 py-4 bg-indigo-50/30 border-t border-indigo-50/50 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0">
            <div class="text-xs font-semibold text-indigo-400 text-center sm:text-left">
                <span>{{ filteredTodos.length }} úloh ({{ todos.filter(t => !t.completed).length }} ostáva)</span>
            </div>
            
            <Pagination 
                v-model="currentPage" 
                :total-pages="totalPages" 
                :pages="pages"
            />
        </div>
        <!-- PAGINATION END -->
    </div>
</template>