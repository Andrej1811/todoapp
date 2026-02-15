import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTodoStore = defineStore('todo', () => {
    const todos = ref([
        { userId: 1, id: 1, title: 'Create a stunning design system', completed: true },
        { userId: 1, id: 2, title: 'Implement interactive features', completed: false }
    ])


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
        addTodo,
        toggleTodo,
        removeTodo,
        updateTodo
    }
})
