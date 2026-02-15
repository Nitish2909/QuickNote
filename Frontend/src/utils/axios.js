import axios from "axios"

const axiosInatnce = axios.create({
    baseURL:"http://localhost:5000/api",
    timeout: 4000,
    headers: {
        "Content-Type": "application/json"
    },

})
export default axiosInatnce;