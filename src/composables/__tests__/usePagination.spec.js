import { describe, it, expect } from 'vitest'
import { usePagination } from '../usePagination' // adjustments may be needed based on file location
import { ref } from 'vue'

describe('usePagination', () => {
    it('správne vypočíta totalPages', () => {
        const items = ref(new Array(25).fill('item'))
        const { totalPages } = usePagination(items, 10)

        expect(totalPages.value).toBe(3) // 25 / 10 = 2.5 -> ceil = 3
    })

    it('vráti správne položky pre prvú stránku', () => {
        const items = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
        const { paginatedItems, currentPage } = usePagination(items, 5)

        currentPage.value = 1
        expect(paginatedItems.value).toEqual([1, 2, 3, 4, 5])
    })

    it('vráti správne položky pre druhú stránku', () => {
        const items = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
        const { paginatedItems, currentPage } = usePagination(items, 5)

        currentPage.value = 2
        expect(paginatedItems.value).toEqual([6, 7, 8, 9, 10])
    })

    it('vráti prázdne pole ak nie sú žiadne položky', () => {
        const items = ref([])
        const { paginatedItems } = usePagination(items, 10)

        expect(paginatedItems.value).toEqual([])
        expect(usePagination(ref(null)).paginatedItems.value).toEqual([])
    })

    it('vráti všetky stránky, ak je počet strán <= 7', () => {
        // 60 items / 10 per page = 6 pages
        const items = ref(new Array(60).fill('item'))
        const { pages } = usePagination(items, 10)

        // should return [1, 2, 3, 4, 5, 6]
        expect(pages.value).toEqual([1, 2, 3, 4, 5, 6])
    })
})
