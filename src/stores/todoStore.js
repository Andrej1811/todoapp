import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '@/services/todoListAPI'

export const useTodoStore = defineStore('todo', () => {

    const todos = ref([])
    const isLoading = ref(false)
    const errorMessage = ref('')

    const fetchTodos = async () => {
        isLoading.value = true
        errorMessage.value = ''
        
        try {
            const data = await api.getTodos()

            todos.value = data
        } catch (error) {
            errorMessage.value = 'Nastala chyba pri načítavaní úloh'
        } finally {
            isLoading.value = false
        }
    }

    const addTodo = (title) => {
        todos.value.push({
            userId: 1,
            id: Date.now(),
            title,
            completed: false
        })
    }

    const toggleTodo = (id) => {
        const todo = todos.value.find(t => t.id === id)

        if (todo) todo.completed = !todo.completed
    }

    const updateTodo = (id, newTitle) => {
        const todo = todos.value.find(t => t.id === id)

        if (todo) todo.title = newTitle
    }

    const removeTodo = (id) => todos.value = todos.value.filter(t => t.id !== id)

    return {
        todos,
        isLoading,
        errorMessage,
        addTodo,
        toggleTodo,
        removeTodo,
        updateTodo,
        fetchTodos
    }
})
