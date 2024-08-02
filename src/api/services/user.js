import api from "../api"


export const userApi = {
    followUser: (id, token) => api.post(`users/follow`, {id}, {
        headers: {
            "Authorization": token
        }
    }),
    unFollowUser: (id, token) => api.delete(`users/follow`, {
        headers: {
            "Authorization": token
        },
        data: {id}
    }),

    getFollowings: (id, token) => api.get(`/users/followings/${id}`, {
        headers: {
            "Authorization": token
        }
    }),
    getFollowers: (id, token) => api.get(`/users/followers/${id}`, {
        headers: {
            "Authorization": token
        }
    }),
    getUser: () => api.get(`/users`),

    patchUploadImg: (data, token) => api.patch('/users', data, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": token
        }
    }),

    getUserInfo: (token) => api.get(`/users/myinfo`, {
        headers: {
            "Authorization": token
        }
    }),
    getPoint: (id,token) => api.get(`/users/point`, {
        headers: {
            "Authorization": token
        },
        data: {id}
    }),
    uploadCalorie: (data,token) =>  api.post('/users/calorie',
        data,
        {
        headers: {
            "Authorization": token
        }
    }),
    getCalorie: (token) => api.get(`/users/calorie`, {
        headers: {
            "Authorization": token
        }
    }),
    getNotification: (token)=> api.get(`users/notification`, {
        headers:{
            "Authorization": token
        }
    }),
    // delRefreshToken: (id) => api.patch(`/auth/refresh`, {id})
    deleteNotification: (id,token) => api.delete(`users/notification`,{
        headers:{
            "Authorization": token
        },
        data:{id}
    })
}
