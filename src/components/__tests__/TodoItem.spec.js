import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoItem from '../TodoItem.vue'
import { nextTick } from 'vue'

// Mock icons
vi.mock('lucide-vue-next', () => ({
  Trash2: { template: '<svg></svg>' },
  Circle: { template: '<svg></svg>' },
  CheckCircle2: { template: '<svg></svg>' },
  Pencil: { template: '<svg></svg>' }
}))

describe('TodoItem.vue', () => {
  const todo = {
    id: 1,
    title: 'Test Todo',
    completed: false
  }

  it('vykreslí názov úlohy', () => {
    const wrapper = mount(TodoItem, {
      props: { todo }
    })
    expect(wrapper.text()).toContain('Test Todo')
  })

  it('emituje "toggle" pri kliknutí na checkbox', async () => {
    const wrapper = mount(TodoItem, {
      props: { todo }
    })
    
    await wrapper.find('button[role="checkbox"]').trigger('click')
    expect(wrapper.emitted('toggle')[0]).toEqual([1])
  })

  it('emituje "remove" pri kliknutí na delete tlačidlo', async () => {
    const wrapper = mount(TodoItem, {
      props: { todo }
    })
    
    // Find the delete button (it has Trash2 icon inside, or aria-label)
    const deleteBtn = wrapper.find('button[aria-label="Odstrániť úlohu"]')
    await deleteBtn.trigger('click')
    
    expect(wrapper.emitted('remove')[0]).toEqual([1])
  })

  it('prepne do editačného módu a zobrazí input', async () => {
    const wrapper = mount(TodoItem, {
      props: { todo }
    })
    
    // Find edit button (desktop or mobile)
    const editBtn = wrapper.find('button[aria-label="Upraviť názov"]')
    await editBtn.trigger('click')

    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('input[type="text"]').element.value).toBe('Test Todo')
  })

  it('emituje "update" pri uložení zmien', async () => {
    const wrapper = mount(TodoItem, {
      props: { todo }
    })

    // Start editing
    await wrapper.vm.startEditing()
    await nextTick()

    // Change value
    const input = wrapper.find('input[type="text"]')
    await input.setValue('Updated Todo')
    
    // Trigger save (blur or enter)
    await input.trigger('blur')

    expect(wrapper.emitted('update')[0]).toEqual([1, 'Updated Todo'])
  })

  it('zruší editáciu pri stlačení ESC', async () => {
    const wrapper = mount(TodoItem, {
      props: { todo }
    })

    await wrapper.vm.startEditing()
    await nextTick()

    const input = wrapper.find('input[type="text"]')
    await input.setValue('Changed but cancelled')
    await input.trigger('keyup.esc')

    expect(wrapper.emitted('update')).toBeFalsy()
    expect(wrapper.find('input[type="text"]').exists()).toBe(false)
  })
})
