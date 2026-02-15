<script setup>
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps({
    modelValue: {
        type: Number,
        required: true
    },
    totalPages: {
        type: Number,
        required: true
    },
    pages: {
        type: Array,
        required: true
    }
})

const emit = defineEmits(['update:modelValue'])

const nextPage = () => {
    if (props.modelValue < props.totalPages) {
        emit('update:modelValue', props.modelValue + 1)
    }
}

const prevPage = () => {
    if (props.modelValue > 1) {
        emit('update:modelValue', props.modelValue - 1)
    }
}

const setPage = (page) => {
    if (page !== '...') {
        emit('update:modelValue', page)
    }
}
</script>

<template>
    <div v-if="totalPages > 1" class="flex items-center gap-2">
        <button 
            @click="prevPage" 
            :disabled="modelValue === 1"
            class="p-1.5 rounded-lg border border-indigo-100 bg-white text-indigo-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-indigo-50 transition-colors"
        >
            <ChevronLeft class="w-4 h-4" />
        </button>
        
        <div class="flex gap-1 items-center">
            <template v-for="(page, index) in pages" :key="index">
                <span v-if="page === '...'" class="px-1 text-indigo-300 font-bold">
                    {{ page }}
                </span>
                <button 
                    v-else
                    @click="setPage(page)"
                    class="w-8 h-8 rounded-lg text-xs font-bold transition-all"
                    :class="modelValue === page ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-indigo-400 hover:bg-indigo-50'"
                >
                    {{ page }}
                </button>
            </template>
        </div>

        <button 
            @click="nextPage" 
            :disabled="modelValue === totalPages"
            class="p-1.5 rounded-lg border border-indigo-100 bg-white text-indigo-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-indigo-50 transition-colors"
        >
            <ChevronRight class="w-4 h-4" />
        </button>
    </div>
</template>
