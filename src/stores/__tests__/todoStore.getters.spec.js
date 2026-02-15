import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTodoStore } from '../todoStore'

describe('Todo Store Getters', () => {
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useTodoStore()
  })

  it('vypočíta správne počty úloh', () => {
    store.todos = [
      { id: 1, title: 'Úloha 1', completed: true },
      { id: 2, title: 'Úloha 2', completed: false },
      { id: 3, title: 'Úloha 3', completed: false }
    ]

    expect(store.totalCount).toBe(3)
    expect(store.completedCount).toBe(1)
    expect(store.uncompletedCount).toBe(2)
  })

  it('správne filtruje dokončené úlohy', () => {
    const todo1 = { id: 1, title: 'Úloha 1', completed: true }
    const todo2 = { id: 2, title: 'Úloha 2', completed: false }
    store.todos = [todo1, todo2]

    expect(store.completedTodos).toHaveLength(1)
    expect(store.completedTodos[0]).toEqual(todo1)
  })

  it('správne filtruje nedokončené úlohy', () => {
    const todo1 = { id: 1, title: 'Úloha 1', completed: true }
    const todo2 = { id: 2, title: 'Úloha 2', completed: false }
    store.todos = [todo1, todo2]

    expect(store.uncompletedTodos).toHaveLength(1)
    expect(store.uncompletedTodos[0]).toEqual(todo2)
  })

  it('vráti nuly a prázdne polia ak nie sú žiadne úlohy', () => {
    store.todos = []

    expect(store.totalCount).toBe(0)
    expect(store.completedCount).toBe(0)
    expect(store.uncompletedCount).toBe(0)
    expect(store.completedTodos).toEqual([])
    expect(store.uncompletedTodos).toEqual([])
  })
})
