import { authFetch } from './authFetch'
import { apiFetch } from './apiFetch'

export async function getPostForEdit(id) {
    return authFetch(`api/post/${id}`)
}

export async function getPost(id) {
    try {
        return await authFetch(`api/post/${id}`)
    } catch (error) {
        console.log(error.status);
        
        if (error.status === 401) {
            return apiFetch(`api/post/${id}`)
        }
        throw error
    }
}

export async function createPost(data) {
    return authFetch('api/post', {
        method: 'POST',
        body: data
    })
}

export async function updatePost(id, data) {
    return authFetch(`api/post/${id}`, {
        method: 'PATCH',
        body: data
    })
}