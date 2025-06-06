import { useState } from "react"
import CustomButton from "../components/CustomButton"
import CustomTextField from "../components/CustomTextField"
import { postData } from "../services/api";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = async (e) => {
        e.preventDefault();
        const response = await postData('/api/admin/login', { username, password })
        if(response.success){ 
            localStorage.setItem('token', response.token)
            window.location.href = '/'
        }else{
            alert(response.message || response.errors[0])
        }
    }

    return <main className="bg-[url('/bg.jpg')] bg-cover bg-center h-screen">
        <form onSubmit={login} className="w-[500px] bg-white fixed transform -translate-y-1/2 top-1/2 right-10 flex flex-col gap-6 border-gray-200 border-1 shadow-md px-10 py-20 rounded-lg">
            <h1 className="text-3xl font-bold">Admin Login</h1>
            <CustomTextField 
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <CustomTextField 
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value) }
            />
            <CustomButton sx={{ height: 45 }} type="submit">Login</CustomButton>
        </form>
    </main>
}

export default Login