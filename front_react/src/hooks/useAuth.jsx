import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { route } from '@/routes/index.jsx'
import api from "@/api/index.js";

export function useAuth() {
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function register(data) {
        console.log('registering user with data', data)
        setLoading(true)
        setErrors({})
        return api.post('cadastro-usuario', data)
            .then(() => {
                navigate(route('vehicles.index'))
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors)
                }
            })
            .finally(() => setLoading(false))
    }

    return { register, errors, loading }
}