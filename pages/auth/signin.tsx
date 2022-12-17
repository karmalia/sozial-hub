import { app } from '../../Features/firebase/firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { handleSignUp, handleLogin } from '../../Utils/handleForms';
import { useRouter } from 'next/router';
import React, { ReactEventHandler, useState } from 'react';
import { TformValues } from '../../Interfaces/interfaces';
import { toast } from 'react-toastify';
import { rejects } from 'assert';

export default function SignIn() {
  const router = useRouter();
  const [formState, setFormState] = useState('login');
  const [formValues, setFormValues] = useState<TformValues>({
    fullname: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const Firebase_Auth = getAuth(app);
  const Firebase_Provider = new GoogleAuthProvider();

  //providers : [...nextAuth].js > providers

  //signIn takes second object argument to redirect after login

  return (
    <div className='bg-gradient-to-r from-purple-800 via-blue-700 to-sky-600 h-screen flex justify-center items-center'>
      <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/4'>
        {formState === 'regist' && (
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='username'
            >
              Fullname
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='fullname'
              type='text'
              placeholder='Your fullname...'
              value={formValues.fullname}
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  fullname: e.target.value,
                }))
              }
            />
          </div>
        )}
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='username'
          >
            Email
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='username'
            type='email'
            placeholder='Email'
            value={formValues.email}
            onChange={(e) =>
              setFormValues((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
          />
        </div>
        <div className='mb-6'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='password'
          >
            Password
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='password'
            type='password'
            placeholder='**********'
            value={formValues.password}
            onChange={(e) =>
              setFormValues((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />
        </div>
        {formState === 'regist' && (
          <div className='mb-6'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='password'
            >
              Confirm Password
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='confirmPassword'
              type='password'
              placeholder='**********'
              value={formValues.passwordConfirm}
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  passwordConfirm: e.target.value,
                }))
              }
            />
          </div>
        )}

        {formState === 'login' && (
          <div className='flex items-center justify-center space-x-6'>
            <a
              className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
              href='#'
              onClick={() => setFormState('regist')}
            >
              Don&apos;t you have an account?
            </a>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='submit'
              onClick={async (e) => {
                e.preventDefault();
                const result = await handleLogin(Firebase_Auth, formValues);
                if (result === 'Success') {
                  router.push('/');
                } else {
                  alert('Something went wrong!');
                }
              }}
            >
              Login
            </button>
          </div>
        )}

        {formState === 'regist' && (
          <div className='flex items-center justify-center space-x-6'>
            <a
              className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
              href='#'
              onClick={() => setFormState('login')}
            >
              You already have an account?
            </a>
            <button
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='submit'
              onClick={(e) => {
                let registerPromise = new Promise(async (resolve, reject) => {
                  try {
                    let result = await handleSignUp(Firebase_Auth, formValues);
                    if (result === 'Success') {
                      resolve(result);
                    } else {
                      reject('Failed');
                    }
                  } catch (error) {
                    console.log('Something went wrong bro', error);
                  }
                });

                registerPromise
                  .then(() => {
                    console.log('Promise basarili');
                    router.push('/');
                  })
                  .catch((err) => {
                    console.log('Promise basarisiz', err);
                  });
              }}
            >
              Sign Up
            </button>
          </div>
        )}
        <div className='my-4 flex items-center justify-center'>
          <div className='w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4'>
            <svg
              className='w-6 h-6 fill-current text-gray-600'
              viewBox='0 0 24 24'
            >
              <g>
                <path d='M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z'></path>
              </g>
            </svg>
          </div>
          <button
            onClick={(
              event: React.MouseEvent<HTMLButtonElement, MouseEvent>
            ) => {
              console.log('Clicked');
              event.preventDefault();
              signInWithPopup(Firebase_Auth, Firebase_Provider)
                .then((user) => {
                  router.push('/');
                })
                .catch((error) => {
                  console.log(error);

                  toast.error('Login Failed!');
                });
            }}
            className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
          >
            Sign in with Google
          </button>
        </div>
      </form>
    </div>
  );
}
