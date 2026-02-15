<script setup>
import { ref, nextTick } from 'vue'
import { Trash2, Circle, CheckCircle2, Pencil } from 'lucide-vue-next'

const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits([
  'toggle', 
  'remove', 
  'update'
])

const isEditing = ref(false)
const editedTitle = ref('')
const titleInput = ref(null)

const startEditing = () => {
  editedTitle.value = props.todo.title
  isEditing.value = true

  nextTick(() => titleInput.value?.focus())
}

const saveEdit = () => {
  if (!isEditing.value) return
  
  const trimmed = editedTitle.value.trim()

  if (trimmed && trimmed !== props.todo.title) {
    emit('update', props.todo.id, trimmed)
  }

  isEditing.value = false
}

const cancelEdit = () => isEditing.value = false
</script>

<template>
  <tr 
    class="group transition-all duration-300 hover:bg-indigo-50/30 select-none cursor-pointer"
    @click="isEditing ? null : $emit('toggle', todo.id)"
  >
    <td class="px-6 py-4">
      <div class="relative flex items-center justify-center w-6 h-6">
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="scale-50 opacity-0"
          enter-to-class="scale-100 opacity-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="scale-100 opacity-100"
          leave-to-class="scale-50 opacity-0"
        >
          <CheckCircle2 
            v-if="todo.completed" 
            class="absolute w-6 h-6 text-indigo-500 fill-indigo-50"
          />
          <Circle 
            v-else 
            class="absolute w-6 h-6 text-indigo-200 group-hover:text-indigo-400 transition-colors"
          />
        </Transition>
      </div>
    </td>

    <td class="px-6 py-4">
      <div v-if="isEditing" class="flex items-center gap-2">
        <input
          ref="titleInput"
          v-model="editedTitle"
          type="text"
          class="w-full px-3 py-1 text-base font-medium text-slate-700 bg-white border-2 border-indigo-500 rounded-lg outline-none shadow-lg shadow-indigo-100 transition-all focus:ring-4 focus:ring-indigo-500/10"
          @blur="saveEdit"
          @keyup.enter="saveEdit"
          @keyup.esc="cancelEdit"
          @click.stop
        />
      </div>
      <div v-else class="flex items-center group/title gap-2">
        <span 
          class="text-base font-medium transition-all duration-300"
          :class="todo.completed ? 'text-indigo-300 line-through' : 'text-slate-700'"
        >
          {{ todo.title }}
        </span>
        <button 
          @click.stop="startEditing"
          class="p-1.5 rounded-lg text-indigo-400 opacity-0 group-hover/title:opacity-100 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 flex items-center justify-center"
        >
          <Pencil class="w-3.5 h-3.5" />
        </button>
      </div>
    </td>

    <td class="px-6 py-4 text-right">
      <button 
        @click.stop="$emit('remove', todo.id)"
        class="p-2 rounded-xl text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all duration-200 opacity-0 group-hover:opacity-100 inline-flex items-center justify-center"
      >
        <Trash2 class="w-5 h-5" />
      </button>
    </td>
  </tr>
</template>
