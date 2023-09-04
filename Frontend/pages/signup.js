import React, { useState } from 'react';
import axios from 'axios';
import HeaderForPage from './Layout/Header';
import { useRouter } from 'next/router';
import AdminLogo from './Layout/AdminLogo';
import dynamic from "next/dynamic";

const Title = dynamic(() => import('./Layout/Admin_Title'), {
  ssr: false,
});

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [degree, setDegree] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const AdminlogoPath = '/admin.jpg';

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleChangeGender = (e) => {
    setGender(e.target.value);
  };

  const handleChangeBloodGroup = (e) => {
    setBloodGroup(e.target.value);
  };

  const handleChangeDegree = (e) => {
    setDegree(e.target.value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword || !name || !gender || !bloodGroup || !degree) {
      setError('All fields are required');
    } else if (!isValidEmail(email)) {
      setError('Invalid email address');
    } else if (password !== confirmPassword) {
      setError('Password and confirm password do not match');
    } else {
      setError('');

      try {
        const response = await axios.post(`http://localhost:3000/Admin/signup`, {
          name,
          email,
          password,
          Gender: gender,
          Blood_group: bloodGroup,
          Degree: degree,
          User: 'Admin',
        });

        console.log('Backend Response:', response.data);

        if (response.data === 'Registration successful') {
          router.push('/login');
          console.log('Registration successful');
        } else {
          setError('Registration failed');
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          const errorMessage = error.response.data.message[0];
          console.log('Error Message:', errorMessage);
          setError(errorMessage);
        } else {
          console.error('Registration failed:', error);
          setError('An error occurred during signup. Please try again later.');
        }
      }
    }
  };

  const isValidEmail = (email) => {
    const emailPattern = /^\S+@\S+\.\S+$/;
    return emailPattern.test(email);
  };

  return (
    <>
  
      <form
        onSubmit={handleSignUp}
        className="max-w-md mx-auto mt-8 p-4 bg-slate-900 shadow-md rounded-md"
      >
        <div className="mb-2">
          <center>
            <AdminLogo AdminlogoPath={AdminlogoPath} />
          </center>
          <h2 className="text-2xl font-bold mb-2 text-amber-600">Admin Sign Up</h2>
        </div>

        <div className="mb-4 text-amber-600">
          <label htmlFor="name" className="block font-medium mb-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            required
            onChange={handleChangeName}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4 text-amber-600">
          <label htmlFor="email" className="block font-medium mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            required
            onChange={handleChangeEmail}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4 text-amber-600">
          <label className="block font-medium mb-1">Gender:</label>
          <div className="flex">
            <label htmlFor="male" className="mr-4 text-amber-600">
              <input
                type="radio"
                id="male"
                name="Gender"
                value="male"
                required
                onChange={handleChangeGender}
              />{' '}
              Male
            </label>
            <label htmlFor="female" className="mr-4 text-amber-600">
              <input
                type="radio"
                id="female"
                name="Gender"
                value="female"
                required
                onChange={handleChangeGender}
              />{' '}
              Female
            </label>
            <label htmlFor="other" className='text-amber-600'>
              <input
                type="radio"
                id="other"
                name="Gender"
                value="other"
                required
                onChange={handleChangeGender}
              />{' '}
              Other
            </label>
          </div>
        </div>

        <div className="mb-4 text-amber-600">
          <label htmlFor="Blood_group" className="block font-medium mb-1">
            Blood Group:
          </label>
          <select
            id="Blood_group"
            name="Blood_group"
            required
            onChange={handleChangeBloodGroup}
            className="w-full px-3 py-2 border rounded-md "
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="Degree" className="block font-medium mb-1 text-amber-600">
            Degree:
          </label>
          <select
            id="Degree"
            name="Degree"
            required
            onChange={handleChangeDegree}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select Degree</option>
            <option value="MBBS">MBBS</option>
            <option value="FCPS">FCPS</option>
            <option value="phd">Ph.D</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block font-medium mb-1 text-amber-600">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChangePassword}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirm_password" className="block font-medium mb-1 text-amber-600">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            value={confirmPassword}
            onChange={handleChangeConfirmPassword}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-6">
          <input
            type="submit"
            value="Sign Up"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </form>
    </>
  );
}
