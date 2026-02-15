import { ref, computed } from 'vue'

export function usePagination(items, itemsPerPage = 10) 
{
    const currentPage = ref(1)
    const perPage = ref(itemsPerPage)

    const totalPages = computed(() => Math.ceil(items.value.length / perPage.value))

    const paginatedItems = computed(() => {
        const start = (currentPage.value - 1) * perPage.value
        const end = start + perPage.value

        return items.value.slice(start, end)
    })

    const pages = computed(() => {
        const total = totalPages.value
        const current = currentPage.value

        // number of pages to show around current page
        const delta = 1

        if (total <= 7) {
            return Array.from({ length: total }, (_, i) => i + 1)
        }

        const range = []
        for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
            range.push(i)
        }

        if (current - delta > 2) {
            range.unshift('...')
        }
        range.unshift(1)

        if (current + delta < total - 1) {
            range.push('...')
        }
        
        range.push(total)

        return range
    })

    return {
        currentPage,
        perPage,
        totalPages,
        paginatedItems,
        pages
    }
}