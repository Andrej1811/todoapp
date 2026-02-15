import { constants } from '@/constants'

export const api = {
    
    async getTodos() {

        // throw new Error('Simulovaná chyba servera')
        // await new Promise(resolve => setTimeout(resolve, 2000))

        try {
            const response = await fetch(`${constants.api.todoListUrl}`)

            if (!response.ok) throw new Error('Failed to fetch todos')

            return await response.json()
        } catch (error) {
            console.error('Error fetching todos:', error)
            throw error
        }
    }
}