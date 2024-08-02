import api from "../api"

export const postApi = {
    getPostsByCommId: (id) => api.get(`post/${id}`),

    addPost: (data, token) => api.post('post', data, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": token
        }
    }),

    deletePost : (id, token) => api.delete(`post/${id}`, {
        headers: {
            "Authorization": token
        }
    }),

    getLikedPostsByUserId : (id, token) => api.get(`post/postlike/likePosts/${id}`, {
        headers: {
            "Authorization": token
        }
    }),

    getLikersByPostId: (id, token) => api.get(`post/postlike/likers/${id}`, {
        headers: {
            "Authorization": token
        }
    }),

    likePost: (id, token) => api.post('post/postlike', {id}, {
        headers: {
            "Authorization": token
        }
    }),

    unlikePost : (id, token) => api.delete(`post/postlike`, {
        headers: {
            "Authorization": token
        },
        data: {id}
    }),

    uploadComment: (data, token) => api.post('post/comment', data, {
        headers: {
            "Authorization": token
        }
    }),

    getComment: (id, token) => api.get(`post/comment/${id}`, {
        headers: {
            "Authorization": token
        }
    }),

    deleteComment : (id, token) => api.delete(`post/commment/${id}`, {
        headers: {
            "Authorization": token
        },
        data: {id}
    })
}
