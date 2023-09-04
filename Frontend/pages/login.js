import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from './utils/authentication';
import HeaderForLoggedin from './Layout/LoggedinHeader';
import Link from 'next/link';


export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email and password are required');
    } else if (!isValidEmail(email)) {
      setError('Invalid email address');
    } else {
      const res = await doSignIn(email, password);
      console.log(res);
    }
  };

  async function doSignIn(email, password) {
    try {
      const response = await axios.post(
        'http://localhost:3000/Admin/signin/',
        {
          email,
          password,
        },
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          withCredentials: true,
        }
      );
      if (response.data === 'Login successful') {
        console.log('cookie: ' + document.cookie);
        login(email, document.cookie);
        router.push('/Admin/Admin_LoggedinPage');
      } else {
        setError('Wrong email or password');
      }

      console.log('response: ' + response);

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  const isValidEmail = (email) => {
    const emailPattern = /^\S+@\S+\.\S+$/;
    return emailPattern.test(email);
  };

  return (
    <>
      <title>Admin Sign In</title>

      <div className="hero min-h-screen bg-slate-900">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit} className="card-body">
              <center>
              <a><HeaderForLoggedin></HeaderForLoggedin></a>
                <h1 className="text-xl font-bold">APPLE STORE</h1>
              </center>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  value={email}
                  onChange={handleChangeEmail}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered"
                  value={password}
                  onChange={handleChangePassword}
                />
                <label className="label"></label>
              </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Login"
                />
              </div>
              <Link href='/signup'>Sign Up?</Link>
            </form>
            <center>{error && <p>{error}</p>}</center>
          </div>
        </div>
      </div>
   
    </>
  );
}
