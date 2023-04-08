import React, { useEffect, useState } from 'react'
import logo from '../../image/learningportal.svg'
import { useNavigate } from 'react-router-dom';
import { useAdminloginMutation } from '../../features/admin/adminAuthSlice';

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [login, { data, isLoading, error: responseError }] =useAdminloginMutation();
    const navigate=useNavigate()

    useEffect(() => {
        if (responseError?.data) {
            setError(responseError.data);
        }if(data?.accessToken && data?.user && data?.user?.role!=='admin'){
            setError("Please login with admin email and password. You are not the admin")
        }
        if (data?.accessToken && data?.user && data?.user?.role==='admin') {
            navigate("/admin/dashboard");
        }
    }, [data, responseError, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        setError("");

        login({
            email,
            password,
        });
    };


  return (
    <section class="py-6 bg-primary h-screen grid place-items-center">
        <div class="mx-auto max-w-md px-5 lg:px-0">
            <div>
                <img class="h-12 mx-auto" src={logo} alt='logo' />
                <h2 class="mt-6 text-center text-3xl font-extrabold text-slate-100">
                    Sign in to Admin Account
                </h2>
            </div>
            <form class="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="email-address" class="sr-only">Email address</label>
                        <input id="email-address" name="email" type="email" autocomplete="email" required
                            class="login-input rounded-t-md" placeholder="Email address" value={email}
                            onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <input id="password" name="password" type="password" autocomplete="current-password" required
                            class="login-input rounded-b-md" placeholder="Password" value={password}
                            onChange={(e) =>setPassword(e.target.value)}/>
                    </div>
                </div>

                <div class="flex items-center justify-end">
                    <div class="text-sm">
                        <a href="#" class="font-medium text-violet-600 hover:text-violet-500">
                            Forgot your password?
                        </a>
                    </div>
                </div>

                <div>
                    <button type="submit"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
                        Sign in
                    </button>
                </div>
                {error !== "" && <h1 style={{color:'#cc0000'}}>{error}.!</h1>}
            </form>
        </div>
    </section>
  )
}
