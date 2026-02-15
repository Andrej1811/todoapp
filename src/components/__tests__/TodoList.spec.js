import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import TodoList from '../TodoList.vue'
import { useTodoStore } from '@/stores/todoStore'
import { useRoute } from 'vue-router'

// Mock vue-router
vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  RouterLink: {
    template: '<a><slot /></a>'
  }
}))

describe('TodoList.vue', () => {
  let pinia

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks()
    
    // Default mock implementation for useRoute
    useRoute.mockReturnValue({
      params: { status: 'all' }
    })

    pinia = createTestingPinia({
      createSpy: vi.fn,
      stubActions: false, // We want to see if fetchTodos is called
    })
  })

  it('zavolá fetchTodos pri namontovaní (onMounted)', () => {
    const store = useTodoStore(pinia)
    const fetchSpy = vi.spyOn(store, 'fetchTodos')
    
    mount(TodoList, {
      global: {
        plugins: [pinia],
        stubs: {
          TodoItem: true,
          Pagination: true,
          LoadingState: true,
          ErrorState: true,
          EmptyState: true,
          RouterLink: true
        }
      }
    })

    expect(fetchSpy).toHaveBeenCalled()
  })

  it('zobrazí LoadingState, keď sa načítava', () => {
    const store = useTodoStore(pinia)
    store.isLoading = true

    const wrapper = mount(TodoList, {
      global: {
        plugins: [pinia],
        stubs: {
          TodoItem: true,
          Pagination: true,
          ErrorState: true,
          EmptyState: true,
          RouterLink: true
        }
      }
    })

    expect(wrapper.findComponent({ name: 'LoadingState' }).exists()).toBe(true)
  })

  it('zobrazí ErrorState, keď nastane chyba', () => {
    const store = useTodoStore(pinia)
    store.isLoading = false
    store.errorMessage = 'Chyba servera'

    const wrapper = mount(TodoList, {
      global: {
        plugins: [pinia],
        stubs: {
          TodoItem: true,
          Pagination: true,
          LoadingState: true,
          EmptyState: true,
          RouterLink: true
        }
      }
    })

    expect(wrapper.findComponent({ name: 'ErrorState' }).exists()).toBe(true)
  })

  it('zobrazí EmptyState, keď nie sú žiadne úlohy', () => {
    const store = useTodoStore(pinia)
    store.isLoading = false
    store.todos = []

    const wrapper = mount(TodoList, {
      global: {
        plugins: [pinia],
        stubs: {
          TodoItem: true,
          Pagination: true,
          LoadingState: true,
          ErrorState: true,
          RouterLink: true
        }
      }
    })

    expect(wrapper.findComponent({ name: 'EmptyState' }).exists()).toBe(true)
  })

  it('vykreslí zoznam úloh, keď sú dostupné', async () => {
    const store = useTodoStore(pinia)
    store.isLoading = false
    store.todos = [
      { id: 1, title: 'Úloha 1', completed: false },
      { id: 2, title: 'Úloha 2', completed: true }
    ]

    const wrapper = mount(TodoList, {
      global: {
        plugins: [pinia],
        stubs: {
          // Tu nestubujeme TodoItem úplne, aby sme videli, či sa renderuje v cykle
          // Alebo môžeme použiť findAllComponents
          Pagination: true,
          LoadingState: true,
          ErrorState: true,
          EmptyState: true,
          RouterLink: true
        }
      }
    })

    const items = wrapper.findAllComponents({ name: 'TodoItem' })
    expect(items.length).toBe(2)
  })
})
