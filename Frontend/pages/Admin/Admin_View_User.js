import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SessionCheck from '../utils/session';

export default function ViewManager() {
  const [managers, setManagers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/Admin/viewallManager',
        {
          withCredentials: true,
        }
      );

      if (Array.isArray(response.data)) {
        const managerData = response.data;

        if (managerData.length > 0) {
          setManagers(managerData);
          setError('');
        } else {
          setManagers([]);
          setError('No managers found');
        }
      } else {
        setManagers([]);
        setError('Something went wrong');
      }
    } catch (error) {
      console.error('Failed:', error);
      setManagers([]);
      setError('An error occurred. Please try again later.');
    }
  };

  const deleteManager = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this manager?');
    if (!confirmed) {
      return; // User canceled the deletion
    }

    try {
      const response = await axios.delete(
        `http://localhost:3000/Admin/Manager/${id}`,
        {
          withCredentials: true,
        }
      );

      if (response) {
        setError('Manager deleted successfully');
        fetchData();
      } else {
        setError('Could not delete manager');
      }
    } catch (error) {
      console.error('Failed:', error);
      setError('Not allowed to remove this manager');
    }
  };

  
 
  

  return (
    <>
      <SessionCheck />
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow">
          <h1 className="text-3xl font-semibold mb-4">Managers</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex items-center justify-between bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md mb-4">
            <span className="text-lg font-semibold">Total Managers</span>
            <span className="text-3xl font-bold">{managers.length}</span>
          </div>
          <ul className="space-y-4">
            {managers.map((managerItem, index) => (
              <li key={index} className="p-4 bg-gray-200 shadow-md rounded-md relative">
                <div className="flex justify-between items-center mb-2">
                  <div className="countdown font-mono text-6xl" style={{ '--value': index + 1 }}>
                    <span style={{ '--value': index + 1 }}></span>
                  </div>
                  <div>
                    <p className="text-gray-600">Email: {managerItem.email}</p>
                  </div>
                </div>
                <p className="text-gray-600">ID: {managerItem.id}</p>
                <div className="font-semibold text-blue-600">
                  <Link href={`/Admin/Info/${managerItem.id}?userType=Manager`}>
                    Manager: {managerItem.name}
                  </Link>
                </div>
                <button
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                  onClick={() => deleteManager(managerItem.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
