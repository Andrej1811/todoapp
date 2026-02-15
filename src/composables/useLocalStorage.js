export function useLocalStorage() {

    const hasTodosInLocalStorage = () => {
        const todos = localStorage.getItem('todos')
        
        return todos !== null && todos !== '[]'
    }

    const getTodosFromLocalStorage = () => JSON.parse(localStorage.getItem('todos'))

    const updateTodoInLocalStorage = (todos) => localStorage.setItem('todos', JSON.stringify(todos))

    return {
        hasTodosInLocalStorage,
        getTodosFromLocalStorage,
        updateTodoInLocalStorage
    }
}