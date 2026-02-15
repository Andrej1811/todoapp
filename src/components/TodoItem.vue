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
    class="group transition-all duration-300 hover:bg-indigo-50/30 select-none cursor-pointer flex items-start md:table-row border-b border-indigo-50/50 md:border-none"
    @click="isEditing ? null : $emit('toggle', todo.id)"
  >
    <!-- Checkbox Column -->
    <td 
      class="px-4 py-3 md:px-6 md:py-4 flex items-start md:items-center min-w-0 md:table-cell"
      :class="isEditing ? 'w-auto' : 'flex-1'"
    >
      <button 
        type="button"
        role="checkbox"
        :aria-checked="todo.completed"
        aria-label="Označiť úlohu ako dokončenú"
        @click.stop="$emit('toggle', todo.id)"
        class="relative flex items-center justify-center w-8 h-8 md:w-6 md:h-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full"
      >
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
      </button>
      
      <!-- Mobile Title (Displayed next to checkbox on mobile) -->
      <span 
        v-if="!isEditing"
        class="md:hidden ml-3 text-base font-medium break-words leading-tight flex-1 py-1"
         :class="todo.completed ? 'text-indigo-300 line-through' : 'text-slate-700'"
      >
        {{ todo.title }}
      </span>
    </td>

    <!-- Title Column (Desktop only for display, Text Input for both) -->
    <td class="px-4 py-3 md:px-6 md:py-4 flex-1 min-w-0 md:w-auto md:table-cell" :class="{ 'hidden md:table-cell': !isEditing, 'block': isEditing }">
      <div v-if="isEditing" class="flex items-center gap-2 w-full">
        <input
          ref="titleInput"
          v-model="editedTitle"
          type="text"
          aria-label="Editačný mód názvu úlohy"
          class="w-full px-3 py-2 md:py-1 text-base font-medium text-slate-700 bg-white border-2 border-indigo-500 rounded-lg outline-none shadow-lg shadow-indigo-100 transition-all focus:ring-4 focus:ring-indigo-500/10"
          @blur="saveEdit"
          @keyup.enter="saveEdit"
          @keyup.esc="cancelEdit"
          @click.stop
        />
      </div>
      <div v-else class="hidden md:flex items-center group/title gap-2">
        <span 
          class="text-base font-medium transition-all duration-300"
          :class="todo.completed ? 'text-indigo-300 line-through' : 'text-slate-700'"
        >
          {{ todo.title }}
        </span>
        <button 
          @click.stop="startEditing"
          aria-label="Upraviť názov"
          class="p-2 md:p-1.5 rounded-lg text-indigo-400 opacity-100 md:opacity-0 md:group-hover/title:opacity-100 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 flex items-center justify-center focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <Pencil class="w-4 h-4 md:w-3.5 md:h-3.5" />
        </button>
      </div>
    </td>

    <!-- Actions Column -->
    <td class="px-4 py-3 md:px-6 md:py-4 md:text-right flex items-center justify-end shrink-0 md:table-cell">
      <div class="flex items-center gap-3 md:gap-2">
         <!-- Mobile Edit Button (Visible only on mobile) -->
         <button 
          v-if="!isEditing"
          @click.stop="startEditing"
          aria-label="Upraviť názov"
          class="md:hidden p-2.5 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all duration-200 shadow-sm"
        >
          <Pencil class="w-5 h-5" />
        </button>

        <button 
          @click.stop="$emit('remove', todo.id)"
          aria-label="Odstrániť úlohu"
          class="p-2.5 rounded-xl text-indigo-300 md:text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all duration-200 opacity-100 md:opacity-0 md:group-hover:opacity-100 inline-flex items-center justify-center focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
        >
          <Trash2 class="w-5 h-5" />
        </button>
      </div>
    </td>
  </tr>
</template>
