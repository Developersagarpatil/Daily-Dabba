import axios from 'axios'

const register = async(formdata) =>{
    const response = await axios.post("/api/auth/register", formdata)
    localStorage.setItem('user', JSON.stringify(response.data))
    return response.data
}

const login = async(formdata) =>{
    const response = await axios.post("/api/auth/login", formdata)
    localStorage.setItem('user', JSON.stringify(response.data))
    return response.data
}


const authService = {register, login}


export default authService