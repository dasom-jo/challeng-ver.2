import axios from "axios";

const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`
});

api.interceptors.request.use(
    (config) => {
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
)

api.interceptors.response.use(
    (response) => {
        // const res = response.data;
        // if (res) return res;
        return response;
    },
    (err) => {
        return useRefreshHandler(err);
    }
);

const useRefreshHandler = async (error) => {
    const originalReq = error.config;
    if (error.response.status !== 403) {
        return Promise.reject(error);
    } else {
        // accessToken으로 검증 요청 API
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/refresh`,
            {
                accessToken: localStorage.getItem('token')
            }
        );
        if (res.status === 200) {
            localStorage.setItem('token', res.data.accessToken);
            originalReq.headers.Authorization = res.data.accessToken;
            return await api.request(originalReq);
        }
    }
}

export default api;