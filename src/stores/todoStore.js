import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '@/services/todoListAPI'
import { useLocalStorage } from '@/composables/useLocalStorage'

export const useTodoStore = defineStore('todo', () => {

    const todos = ref([])
    const isLoading = ref(false)
    const errorMessage = ref('')
    const localStorageComposable = useLocalStorage()

    const totalCount = computed(() => todos.value.length)
    const completedCount = computed(() => todos.value.filter(t => t.completed).length)
    const uncompletedCount = computed(() => todos.value.filter(t => !t.completed).length)
    const completedTodos = computed(() => todos.value.filter(t => t.completed))
    const uncompletedTodos = computed(() => todos.value.filter(t => !t.completed))

    const fetchTodos = async () => {

        if (!localStorageComposable.hasTodosInLocalStorage()) {
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
        } else {
            const data = localStorageComposable.getTodosFromLocalStorage()
            todos.value = Array.isArray(data) ? data : (data ? [data] : [])
        }
    }

    const addTodo = (title) => {
        // pre demonštráciu ak pridám vlastné todo vymažem API dáta
        if (!localStorageComposable.hasTodosInLocalStorage()) todos.value = []

        todos.value.push({
            userId: 1,
            id: Date.now(),
            title,
            completed: false
        })

        localStorageComposable.updateTodoInLocalStorage(todos.value)
    }

    const toggleTodo = (id) => {
        const todo = todos.value.find(t => t.id === id)

        if (todo) {
            todo.completed = !todo.completed
            localStorageComposable.updateTodoInLocalStorage(todos.value)
        }
    }

    const updateTodo = (id, newTitle) => {
        const todo = todos.value.find(t => t.id === id)

        if (todo) {
            todo.title = newTitle
            localStorageComposable.updateTodoInLocalStorage(todos.value)
        }
    }

    const removeTodo = (id) => {
        if (window.confirm('Naozaj chcete vymazať túto úlohu?')) {
            todos.value = todos.value.filter(t => t.id !== id)
            localStorageComposable.updateTodoInLocalStorage(todos.value)
        }
    }

    return {
        todos,
        isLoading,
        errorMessage,
        totalCount,
        completedCount,
        uncompletedCount,
        completedTodos,
        uncompletedTodos,
        addTodo,
        toggleTodo,
        removeTodo,
        updateTodo,
        fetchTodos
    }
})
