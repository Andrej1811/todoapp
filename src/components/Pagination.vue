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
    if (props.modelValue < props.totalPages) emit('update:modelValue', props.modelValue + 1)
}

const prevPage = () => {
    if (props.modelValue > 1) emit('update:modelValue', props.modelValue - 1)
}

const setPage = (page) => {
    if (page !== '...') emit('update:modelValue', page)
}
</script>

<template>
    <nav v-if="totalPages > 1" aria-label="Navigácia stránkovania" class="flex items-center gap-2">
        <button 
            @click="prevPage" 
            :disabled="modelValue === 1"
            aria-label="Predchádzajúca strana"
            class="p-2 rounded-lg border border-indigo-100 bg-white text-indigo-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-indigo-50 transition-colors focus:ring-2 focus:ring-indigo-500/20 outline-none"
        >
            <ChevronLeft class="w-5 h-5" />
        </button>
        
        <div class="flex gap-1 items-center">
            <template v-for="(page, index) in pages" :key="index">
                <span v-if="page === '...'" class="px-1 text-indigo-300 font-bold" aria-hidden="true">
                    {{ page }}
                </span>
                <button 
                    v-else
                    @click="setPage(page)"
                    :aria-label="'Strana ' + page"
                    :aria-current="modelValue === page ? 'page' : undefined"
                    class="w-10 h-10 rounded-lg text-xs font-bold transition-all focus:ring-2 focus:ring-indigo-500/20 outline-none"
                    :class="modelValue === page ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-indigo-400 hover:bg-indigo-50'"
                >
                    {{ page }}
                </button>
            </template>
        </div>

        <button 
            @click="nextPage" 
            :disabled="modelValue === totalPages"
            aria-label="Ďalšia strana"
            class="p-2 rounded-lg border border-indigo-100 bg-white text-indigo-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-indigo-50 transition-colors focus:ring-2 focus:ring-indigo-500/20 outline-none"
        >
            <ChevronRight class="w-5 h-5" />
        </button>
    </nav>
</template>
