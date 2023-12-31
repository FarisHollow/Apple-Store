import { useRouter } from 'next/router';
import axios from 'axios';
import React, { useState } from 'react';
import SessionCheck from '../utils/session';

// import { useRouter } from 'next/router';

export default function AddProfile() {
  const router = useRouter();
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [error, setError] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');
  const [image, setImage] = useState(null); // Initialize image state with null
  const [education, setEducation] = useState('');

  const handleChangeBio = (e) => {
    setBio(e.target.value);
  };

  const handleChangeExperience = (e) => {
    setExperience(e.target.value);
  };

  const handleChangeWebsite = (e) => {
    setWebsite(e.target.value);
  };

  const handleChangeLocation = (e) => {
    setLocation(e.target.value);
  };

  const handleChangeEducation = (e) => {
    setEducation(e.target.value);
  };

  const handleChangeImage = (e) => {
    setImage(e.target.files[0]); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bio || !location || !experience || !education || !website || !image) {
      setError('All fields are required');
    } else {
      try {
        const formData = new FormData(); 
        formData.append('bio', bio);
        formData.append('location', location);
        formData.append('experience', experience);
        formData.append('education', education);
        formData.append('website', website);
        formData.append('image', image);

        const response = await axios.post(
          'http://localhost:3000/Admin/addProfile',
          formData,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data', 
            },
          }
        );

        console.log('Backend Response:', response);

        router.push('/Admin/Admin_Profile');
      } catch (error) {
        console.error('Failed:', error);
        console.log('Error Response:', error.response);
        setError('File is too large or profile is already existing')
      }
    }
  };

  return (
    <><SessionCheck></SessionCheck>    

    
    <div className="bg-gray-100 h-fit flex flex-col items-center justify-center">
    <div className="min-w-fit max-w-3xl bg-white p-8 rounded-lg shadow">
      <h1 className="text-3xl font-semibold mb-4">Add Profile</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Bio:</label>
          <textarea
            name="bio"
            rows="4"
            className="w-full px-3 py-2 border rounded-md"
            onChange={handleChangeBio}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Location:</label>
          <input
            type="text"
            name="location"
            className="w-full px-3 py-2 border rounded-md"
            onChange={handleChangeLocation}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Website:</label>
          <input
            type="text"
            name="website"
            className="w-full px-3 py-2 border rounded-md"
            onChange={handleChangeWebsite}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Experience:</label>
          <input
            type="text"
            name="experience"
            className="w-full px-3 py-2 border rounded-md"
            onChange={handleChangeExperience}
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">Education:</label>
          <input
            type="text"
            name="education"
            className="w-full px-3 py-2 border rounded-md"
            onChange={handleChangeEducation}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Photo:</label>
          <input type="file"  accept="image/*"  name="photo"  onChange={handleChangeImage}  className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onChange={handleSubmit}
        >
          Add Profile
        </button>
      </form>
    </div>
  </div></>

  );
}
