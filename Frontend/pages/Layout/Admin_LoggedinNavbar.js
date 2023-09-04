import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import HeaderForLoggedin from './LoggedinHeader';


const NavigationBarLoggedin = () => {
  const router = useRouter();
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [userId, setUserId] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [userType, setUserType] = useState('manager');
  const [error, setError] = useState('');

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

 
  const handleNavigation = (path) => {
    router.push(path);
  };


  const handleLogout = async () => {
    await logout(); 
    router.push('/login'); 
  };

  const handleSearchToggle = () => {
    setSearchBarOpen(!searchBarOpen);
  };

  return (
    <div className="navbar bg-black shadow-xl">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </label>
          
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><button onClick={() => handleNavigation("/profile")}>Profile</button></li>
            <li><Link href="/Admin/Admin_Add_Profile">Add Profile</Link></li>
            <li><Link href="/Admin/Admin_Update_Pass">Set new password</Link></li>
            <li><Link href="/Admin/Admin_Notification">Notifications</Link></li>
            <li><Link href="/Admin/Admin_Search_User">Search User</Link></li>
             <li><button onClick={() => router.push("/Logout")}>Log Out</button></li>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl text-white">Apple Store</a>
      </div>
      <div className="navbar-center">
        <a><HeaderForLoggedin></HeaderForLoggedin></a>

      </div>


      <div className="navbar-end">

      <div className="form-control">
  <div className="input-group space y-4">
    <input type="text" placeholder="Search managers...." className="input input-bordered bg-slate-800" name="userId"
              />

    <button className="btn btn-square bg-slate-700 " >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    </button>
   

   
  </div>
</div>


      

       
     
      <button className="btn btn-ghost btn-circle">
  <Link href="/Admin/Admin_Notification">
    
      <div className="indicator">
        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M15.133 10.632v-1.8a5.407 5.407 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V1.1a1 1 0 0 0-2 0v2.364a.944.944 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C4.867 13.018 3 13.614 3 14.807 3 15.4 3 16 3.538 16h12.924C17 16 17 15.4 17 14.807c0-1.193-1.867-1.789-1.867-4.175Zm-13.267-.8a1 1 0 0 1-1-1 9.424 9.424 0 0 1 2.517-6.39A1.001 1.001 0 1 1 4.854 3.8a7.431 7.431 0 0 0-1.988 5.037 1 1 0 0 1-1 .995Zm16.268 0a1 1 0 0 1-1-1A7.431 7.431 0 0 0 15.146 3.8a1 1 0 0 1 1.471-1.354 9.425 9.425 0 0 1 2.517 6.391 1 1 0 0 1-1 .995ZM6.823 17a3.453 3.453 0 0 0 6.354 0H6.823Z"/>
        </svg>
        <span className="badge badge-xs badge-primary indicator-item"></span>
      </div>

  </Link>
</button>
          <Link href={"/Admin/Admin_Profile"}>
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w- rounded-full">
              <img src={'http://localhost:3000/Admin/myphoto'} />
            </div>
          </label>
          </Link>





        
      </div>
    </div>
  );
};

export default NavigationBarLoggedin;
