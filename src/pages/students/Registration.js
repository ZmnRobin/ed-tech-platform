import React, { useEffect, useState } from 'react'
import portal from '../../image/learningportal.svg'
import { useRegisterMutation } from '../../features/user/auth/authApiSlice';
import { useNavigate } from 'react-router-dom';

export default function Registration() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [error, setError] = useState("");

    const [register, { data, isLoading, error: responseError }] =
        useRegisterMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (responseError?.data) {
            setError(responseError.data);
        }
        if (data?.accessToken && data?.user) {
            navigate("/courseplayer");
        }
    }, [data, responseError, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        setError("");

        if (confirmPassword !== password) {
            setError("Passwords do not match");
        } else {
            register({
                name,
                email,
                password,
            });
        }
    };
  return (
    <section class="py-6 bg-primary h-screen grid place-items-center">
        <div class="mx-auto max-w-md px-5 lg:px-0">
            <div>
                <img class="h-12 mx-auto" src={portal} alt='Portal' />
                <h2 class="mt-6 text-center text-3xl font-extrabold text-slate-100">
                    Create Your New Account
                </h2>
            </div>
            <form class="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="name" class="sr-only">Name</label>
                        <input id="name" name="name" type="name" autocomplete="name" required
                            class="login-input rounded-t-md" placeholder="Student Name"   value={name}
                            onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div>
                        <label for="email-address" class="sr-only">Email address</label>
                        <input id="email-address" name="email" type="email" autocomplete="email" required
                            class="login-input " placeholder="Email address" value={email}
                            onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <input id="password" name="password" type="password" autocomplete="current-password" required
                            class="login-input" placeholder="Password"  value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }/>
                    </div>
                    <div>
                        <label for="confirm-password" class="sr-only">Confirm Password</label>
                        <input id="confirm-password" name="confirm-password" type="password"
                            autocomplete="confirm-password" required class="login-input rounded-b-md"
                            placeholder="Confirm Password"  value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }/>
                    </div>
                </div>

                <div>
                    <button type="submit"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
                        Create Account
                    </button>
                </div>
                {error !== "" && <h1 style={{color:'#cc0000'}}>{error}.!</h1>}
            </form>
        </div>
    </section>
  )
}
