<script setup>
import { CheckCircle2 } from 'lucide-vue-next'
import TodoItem from './TodoItem.vue'
import Pagination from './Pagination.vue'
import { useTodoStore } from '@/stores/todo'
import { storeToRefs } from 'pinia'
import { usePagination } from '@/composables/usePagination'
import { constants } from '@/constants'

const todoStore = useTodoStore()
const { todos } = storeToRefs(todoStore)
const { toggleTodo, removeTodo, updateTodo } = todoStore

const { 
    currentPage, 
    totalPages, 
    paginatedItems: paginatedTodos 
} = usePagination(todos, constants.pagination.itemsPerPage)
</script>

<template>
    <div class="w-full max-w-4xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-indigo-100 border border-indigo-50/50 overflow-hidden">
        <div class="px-6 py-4 border-b border-indigo-50/50 bg-gradient-to-r from-indigo-50/30 to-purple-50/30 flex justify-between items-center">
            <h2 class="text-sm font-semibold text-indigo-900/60 uppercase tracking-wider">Tvoje úlohy</h2>
            <RouterLink 
                to="/form" 
                class="text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-all py-1.5 px-3 rounded-xl flex items-center gap-1.5"
            >
                <span>+</span> Pridať úlohu
            </RouterLink>
        </div>
        
        <!-- TODO LIST START -->
        <div v-if="todos.length > 0" class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead class="bg-indigo-50/20 text-indigo-900/40 text-[10px] uppercase tracking-widest font-bold">
                    <tr>
                        <th class="px-6 py-3 w-16">Status</th>
                        <th class="px-6 py-3">Názov úlohy</th>
                        <th class="px-6 py-3 w-24 text-right">Akcie</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-indigo-50/50">
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
        </div>

        <div v-else class="px-6 py-12 text-center border-b border-indigo-50/50">
            <div class="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-400 mb-4">
                <CheckCircle2 class="w-6 h-6" />
            </div>
            <p class="text-slate-500 font-medium">Všetko je hotové! 🎉</p>
        </div>
        <!-- TODO LIST END -->


        <!-- PAGINATION START -->
        <div class="px-6 py-4 bg-indigo-50/30 border-t border-indigo-50/50 flex justify-between items-center">
            <div class="text-xs font-semibold text-indigo-400">
                <span>{{ todos.filter(t => !t.completed).length }} ostávajúcich úloh</span>
            </div>
            
            <Pagination 
                v-model="currentPage" 
                :total-pages="totalPages" 
            />
        </div>
        <!-- PAGINATION END -->
    </div>
</template>