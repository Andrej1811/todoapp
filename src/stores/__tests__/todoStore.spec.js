import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTodoStore } from '../todoStore'
import { api } from '@/services/todoListAPI'
import { useLocalStorage } from '@/composables/useLocalStorage'

// Mock dependencies
vi.mock('@/services/todoListAPI', () => ({
  api: {
    getTodos: vi.fn()
  }
}))

// Mock localStorage composable
const mockLocalStorage = {
  getTodosFromLocalStorage: vi.fn(),
  hasTodosInLocalStorage: vi.fn(),
  updateTodoInLocalStorage: vi.fn()
}

vi.mock('@/composables/useLocalStorage', () => ({
  useLocalStorage: () => mockLocalStorage
}))

describe('Todo Store', () => {
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useTodoStore()
    vi.clearAllMocks()
    
    // Default mock implementation
    mockLocalStorage.hasTodosInLocalStorage.mockReturnValue(false)
    api.getTodos.mockResolvedValue([])
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  // 1. Initial State
  it('má prázdny počiatočný stav', () => {
    expect(store.todos).toEqual([])
    expect(store.isLoading).toBe(false)
    expect(store.errorMessage).toBe('')
  })

  // 2. Fetch Todos - API Success
  it('načíta úlohy z API, ak nie sú v localStorage', async () => {
    const mockTodos = [{ id: 1, title: 'Test Todo', completed: false }]
    api.getTodos.mockResolvedValue(mockTodos)
    mockLocalStorage.hasTodosInLocalStorage.mockReturnValue(false)

    await store.fetchTodos()

    expect(store.isLoading).toBe(false)
    expect(store.todos).toEqual(mockTodos)
    expect(store.errorMessage).toBe('')
  })

  // 3. Fetch Todos - LocalStorage
  it('načíta úlohy z localStorage, ak existujú', async () => {
    const localTodos = [{ id: 2, title: 'Local Todo', completed: true }]
    mockLocalStorage.hasTodosInLocalStorage.mockReturnValue(true)
    mockLocalStorage.getTodosFromLocalStorage.mockReturnValue(localTodos)

    await store.fetchTodos()

    expect(api.getTodos).not.toHaveBeenCalled()
    expect(store.todos).toEqual(localTodos)
  })

  // 4. Fetch Todos - API Error
  it('nastaví chybovú hlášku pri zlyhaní API', async () => {
    mockLocalStorage.hasTodosInLocalStorage.mockReturnValue(false)
    api.getTodos.mockRejectedValue(new Error('Network Error'))

    await store.fetchTodos()

    expect(store.isLoading).toBe(false)
    expect(store.errorMessage).toBe('Nastala chyba pri načítavaní úloh')
    expect(store.todos).toEqual([])
  })

  // 5. Add Todo
  it('pridá novú úlohu a aktualizuje localStorage', () => {
    const newTitle = 'Nová úloha'
    
    store.addTodo(newTitle)

    expect(store.todos).toHaveLength(1)
    expect(store.todos[0].title).toBe(newTitle)
    expect(store.todos[0].completed).toBe(false)
    expect(mockLocalStorage.updateTodoInLocalStorage).toHaveBeenCalledWith(store.todos)
  })

  // 6. Toggle Todo
  it('prepne stav dokončenia úlohy', () => {
    store.todos = [{ id: 1, title: 'Test', completed: false }]
    
    store.toggleTodo(1)

    expect(store.todos[0].completed).toBe(true)
    expect(mockLocalStorage.updateTodoInLocalStorage).toHaveBeenCalledWith(store.todos)
    
    store.toggleTodo(1)
    expect(store.todos[0].completed).toBe(false)
  })

  // 7. Remove Todo
  it('odstráni úlohu (po potvrdení)', () => {
    // Mock window.confirm to return true
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    
    store.todos = [
      { id: 1, title: 'To Delete', completed: false },
      { id: 2, title: 'Keep', completed: true }
    ]

    store.removeTodo(1)

    expect(store.todos).toHaveLength(1)
    expect(store.todos[0].id).toBe(2)
    expect(mockLocalStorage.updateTodoInLocalStorage).toHaveBeenCalledWith(store.todos)
  })

  it('neodstráni úlohu, ak používateľ zruší akciu', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false)
    
    store.todos = [{ id: 1, title: 'To Delete', completed: false }]

    store.removeTodo(1)

    expect(store.todos).toHaveLength(1)
    expect(mockLocalStorage.updateTodoInLocalStorage).not.toHaveBeenCalled()
  })

  // 8. Update Todo
  it('aktualizuje názov úlohy', () => {
    store.todos = [{ id: 1, title: 'Old Title', completed: false }]
    
    store.updateTodo(1, 'New Title')

    expect(store.todos[0].title).toBe('New Title')
    expect(mockLocalStorage.updateTodoInLocalStorage).toHaveBeenCalledWith(store.todos)
  })
})
