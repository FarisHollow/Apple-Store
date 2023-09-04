import { useRouter } from 'next/router';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Admin_NavigationBar from '../Layout/Admin_LoggedinNavbar';
import Link from 'next/link';
import { useAuth } from '../utils/authentication';
import dynamic from "next/dynamic";
import SessionCheck from "../utils/session";


export default function LoggedinPage() {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [userType, setUserType] = useState('manager');
  const [error, setError] = useState('');

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleUserTypeToggle = () => {
    setUserType(userType === 'manager' ? 'manager' : 'manager');
    setUserInfo(null);
    setError('');
  };

  const handleFetchUser = async () => {
    if (!userId) {
      setError('Please enter a valid ID');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/Admin/${userType}/${userId}`, {
        withCredentials: true,
      });
      setUserInfo(response.data);
      setError('');
    } catch (error) {
      console.error('Failed:', error);
      console.log('Error Response:', error.response);
      setError(`An error occurred. ${userType} not found.`);
    }
  };
 

  const Title = dynamic(()=>import('../Layout/Admin_Title'),{

    ssr: false,
  
  });


  const handleNavigation = (path) => {
    router.push(path);
  };



 

 

  return (
    <>
    <SessionCheck></SessionCheck>
      <title>Admin</title>
      <Admin_NavigationBar />
      
      <div className="bg-red-500-300 flex items-center justify-center h-screen">
  
  <div className="flex space-x-1">
  <div className="card w-96 bg-stone-800 shadow-xl">
  <figure><img src="/manage.gif" alt="Shoes" /></figure>
  <div className="card-body bg-amber-600">
    <h2 className="card-title">
      Manage!
      <div className="badge badge-secondary">Active</div>
    </h2>
    <p>Get your company stakeholders into new level</p>
    <div className="card-actions justify-end">
      <Link href='/Admin/Admin_Add_User'>
    
      <div className="badge badge-outline bg-slate-100">Add Managers</div> 
      </Link>
      <Link href='/Admin/Admin_View_User'>
      <div className="badge badge-outline bg-white">View</div>
      </Link>
     
    </div>
  </div>
</div>
<div className='px-20 bg-black'>
  <center>
  <h2 className="text-xl font-semibold text-amber-600 py-16">
          Manager Info
        </h2>
        </center>

        {error && <p className="text-red-600">{error}</p>}
        <div className="space-y-4">
          <div>
            <label htmlFor="userId" className="block font-semibold text-white">
             Managers Id:
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={userId}
              onChange={handleUserIdChange}
              className="w-full border-black rounded-md shadow-sm"
              required
            />
          </div>

          <button
            type="button"
            onClick={handleFetchUser}
            className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Search
          </button>
          <div className='flex space-x-4"'>

          {userInfo && (
            <div className="mt-4 bg-amber-600 p-4 rounded-md">
              <h3 className="font-semibold text-lg text-black">
                {userType === 'manager' ? 'Manager' : 'Manager'} Information
              </h3>
              <div className="grid grid-cols-2 gap-4 ">
                <div>
                  <p className="font-medium text-black">ID:</p>
                  <p className='text-white'>{userInfo.id}</p>
                </div>
                <div>
                  <p className="font-medium text-black">Name:</p>
                  <p className='text-white'>{userInfo.name}</p>
                </div>
                <div>
                  <p className="font-medium text-black">Email:</p>
                  <p className='text-white'>{userInfo.email}</p>
                </div>
                <div>
                  <p className="font-medium text-black">Degree:</p>
                  <p className='text-white'>{userInfo.Degree}</p>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
        </div>
  </div>
  
  


</div>

    
    </>
  );
}
