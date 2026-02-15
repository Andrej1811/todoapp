import { ref, computed } from 'vue'

export function usePagination(items, itemsPerPage = 10) {
    const currentPage = ref(1)
    const perPage = ref(itemsPerPage)

    const totalPages = computed(() => Math.ceil(items.value.length / perPage.value))

    const paginatedItems = computed(() => {
        const start = (currentPage.value - 1) * perPage.value
        const end = start + perPage.value
        return items.value.slice(start, end)
    })

    return {
        currentPage,
        perPage,
        totalPages,
        paginatedItems
    }
}