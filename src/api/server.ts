let token = '18e524a9b066feadd69ce9e56c5989c19f39059f44264218'

export const server_calls = {
    get: async () => {
        const response = await fetch(`https://marvel-inventory-rangers81.herokuapp.com/api/characters`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });
        if (!response.ok){
            throw new Error('Failed to fetch data from the server')
        }
        return await response.json()
    },

    create: async ( data: any = {}) => {
        const response = await fetch(`https://marvel-inventory-rangers81.herokuapp.com/api/characters`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if (!response.ok){
            throw new Error('Failed to fetch data from the server')
        }
        return await response.json()
    },

    update: async ( id: string, data: any={}) => {
        const response = await fetch(`https://marvel-inventory-rangers81.herokuapp.com/api/characters/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        
    },

    delete: async ( id: string ) => {
        const response = await fetch(`https://marvel-inventory-rangers81.herokuapp.com/api/characters/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });
        
    }
}