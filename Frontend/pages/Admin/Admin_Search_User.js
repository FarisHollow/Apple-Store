import React, { useState } from 'react';
import axios from 'axios';
import SessionCheck from '../utils/session';

export default function SearchManager() {
  const [userId, setUserId] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [userType, setUserType] = useState('manager');
  const [error, setError] = useState('');

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleUserTypeToggle = () => {
    setUserType(userType === 'manager' ? 'manager' : 'manager'); // No change here, just to maintain consistency
    setUserId('');
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

  return (
    <>
      <SessionCheck></SessionCheck>

      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 mt-24">
       
        <h2 className="text-xl font-semibold">
          Manager Info
        </h2>

        {error && <p className="text-red-600">{error}</p>}
        <div className="space-y-4">
          <div>
            <label htmlFor="userId" className="block font-semibold text-gray-600">
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

          {userInfo && (
            <div className="mt-4 bg-gray-900 text-white p-4 rounded-md">
              <h3 className="font-semibold text-lg">
                {userType === 'manager' ? 'Manager' : 'Manager'} Information
              </h3>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <p className="font-medium">ID:</p>
                  <p>{userInfo.id}</p>
                </div>
                <div>
                  <p className="font-medium">Name:</p>
                  <p>{userInfo.name}</p>
                </div>
                <div>
                  <p className="font-medium">Email:</p>
                  <p>{userInfo.email}</p>
                </div>
                <div>
                  <p className="font-medium">Gender:</p>
                  <p>{userInfo.Gender}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
