import axios from "axios"

const axiosInatnce = axios.create({
    baseURL: "https://quicknote-backend-cvpq.onrender.com/api",
    // baseURL:"http://localhost:5000/api",
    timeout: 4000,
    headers: {
        "Content-Type": "application/json"
    },

})
export default axiosInatnce;