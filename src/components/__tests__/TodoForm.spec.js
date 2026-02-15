import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import TodoForm from '../TodoForm.vue'
import { useTodoStore } from '@/stores/todoStore'
import { useRouter } from 'vue-router'

// Mock icons
vi.mock('lucide-vue-next', () => ({
  PlusCircle: { template: '<svg></svg>' }
}))

// Mock router
vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn()
  }))
}))

describe('TodoForm.vue', () => {
  let pinia
  let routerPushMock

  beforeEach(() => {
    vi.clearAllMocks()
    
    // Setup Router Mock
    routerPushMock = vi.fn()
    useRouter.mockReturnValue({
      push: routerPushMock
    })

    // Setup Pinia
    pinia = createTestingPinia({
      createSpy: vi.fn,
      stubActions: false
    })
  })

  it('vykreslí input a tlačidlo', () => {
    const wrapper = mount(TodoForm, {
      global: {
        plugins: [pinia]
      }
    })

    expect(wrapper.find('input#title').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('aktualizuje model pri zmene inputu', async () => {
    const wrapper = mount(TodoForm, {
      global: {
        plugins: [pinia]
      }
    })

    const input = wrapper.find('input#title')
    await input.setValue('Nová úloha')

    expect(input.element.value).toBe('Nová úloha')
  })

  it('zavolá store.addTodo a presmeruje pri odoslaní platného formulára', async () => {
    const wrapper = mount(TodoForm, {
      global: {
        plugins: [pinia]
      }
    })
    const store = useTodoStore()
    const addTodoSpy = vi.spyOn(store, 'addTodo')

    const input = wrapper.find('input#title')
    await input.setValue('Dôležitá úloha')
    
    await wrapper.find('form').trigger('submit.prevent')

    expect(addTodoSpy).toHaveBeenCalledWith('Dôležitá úloha')
    expect(routerPushMock).toHaveBeenCalledWith('/')
  })

  it('nezavolá store.addTodo ak je input prázdny', async () => {
    const wrapper = mount(TodoForm, {
      global: {
        plugins: [pinia]
      }
    })
    const store = useTodoStore()
    const addTodoSpy = vi.spyOn(store, 'addTodo')

    const input = wrapper.find('input#title')
    await input.setValue('   ') // Whitespace only
    
    await wrapper.find('form').trigger('submit.prevent')

    expect(addTodoSpy).not.toHaveBeenCalled()
    expect(routerPushMock).not.toHaveBeenCalled()
  })
})
