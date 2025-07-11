import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router';
import useAxios from '../../Hooks/useAxios';
import axios from 'axios';

const Signup = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, googleSignIn, updateUserProfile } = useAuth();
  const [profileImage, setProfileImage] = useState('')
  const axiosInstance = useAxios();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from || '/';

  const onSubmit = (data) => {
    const { email, password } = data;

    signup(email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        navigate(from);
        toast.success("Sign up Completed Successfully")

        // Update user info in database
        const userInfo = {
          name: data.name,
          email: data.email,
          photo: profileImage,
          role: 'user',
          created_At: new Date().toISOString(),
          last_login: new Date().toISOString(),
        }

        const userRes = await axiosInstance.post('/users', userInfo);
        console.log(userRes.data);


        // Update user profile in firebase
        const userProfile = {
          displayName: data.name,
          photoURL: profileImage
        }
        updateUserProfile(userProfile)
          .then(() => {
            console.log("user profile updated successfully")
          })
          .catch((error) => {
            console.log(error.message);
          });


      })
      .catch((error) => {
        toast.error(error.message)
      });

  }


  // Google sign in
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(async (result) => {
        const user = result.user;
        // Update user info in database
        const userInfo = {
          email: user.email,
          role: 'user',
          created_At: new Date().toISOString(),
          last_login: new Date().toISOString(),
        }

        const res = await axiosInstance.post('/users', userInfo);
        console.log(res.data);

        navigate(from);
        toast.success("Sign up completed Successfully")
      }).catch((error) => {
        toast.error(error)
      });
  }

  // Handle profile picture upload
  const handleProfilePicture = async (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image);
    const imageUploadURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_PROFILE_PICTURE_KEY}`
    const res = await axios.post(imageUploadURL, formData)
    setProfileImage(res.data.data.url);

  }

  return (
    <div className=" flex items-center justify-center">
      <div className="p-10 rounded-xl w-full max-w-md">
        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-[#03373D]">Create New Account</h1>
        <p className="text-gray-600 mb-6 font-bold">Sign up with ProFast</p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              {...register('name', { required: true })}
              type="text"
              id="name"
              placeholder="Your name"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CAEB66]"
            />
            {errors.email?.type === 'required' && <p className='text-red-500 font-semibold'>Name is required</p>}
          </div>

          {/* Photo */}
          <div>
            <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Photo</label>
            <input
              onChange={handleProfilePicture}
              type="file"
              id="photo"
              placeholder='Your profile picture'
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CAEB66]"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              {...register('email', { required: true })}
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CAEB66]"
            />
            {errors.email?.type === 'required' && <p className='text-red-500 font-semibold'>Email is required</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              {...register('password',
                { required: true, minLength: 6 }
              )}
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CAEB66]"
            />
            {errors.password?.type === 'required' && <p className='text-red-500 font-semibold'>Password is required</p>}

            {errors.password?.type === 'minLength' && <p className='text-red-500 font-semibold'>Password must be 6 characters or longer</p>}

            <div className="text-right mt-2">
              <button type="button" className="text-sm text-[#03373D] hover:underline">
                Forgot password?
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-[#CAEB66] text-[#03373D] font-bold py-2 rounded-lg hover:bg-[#b9dc58] transition"
          >
            Sign Up
          </button>
        </form>

        {/* Sign up link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to={'/signin'} className="text-[#03373D] font-medium hover:underline">
            Sign In
          </Link>
        </p>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-sm text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Sign-In */}
        <button
          onClick={handleGoogleSignIn}
          type="button"
          className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition bg-[#E9ECF1]"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5 mr-3"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Signup;