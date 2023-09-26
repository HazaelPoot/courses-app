"use client"

import { ChangeEvent, FormEvent, useState } from 'react'
import { PiWarningOctagonFill } from 'react-icons/pi';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Button from '@/components/Button';
import Input from '@/components/Input'
import Link from 'next/link';
import { ILoginPage } from '@/interfaces/ILoginPage';

const initialState: ILoginPage = { email: '', password: '' }

export default function LoginPage() {

  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    signIn('credentials', {
      ...state, redirect: false
    }).then((callback) => {
      setLoading(false);
      if (callback?.error) {
        return setError(callback?.error);
      }
      router.push('/');
      router.refresh();
    });
  }

  return (
    <form onSubmit={onSubmit} className='text-center'>
      <div className='flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2'>
        <h2 className='font-bold text-start mb-2'>Log In to your Udemy account.</h2>
        {error &&
          <div className='bg-red-300 text-black p-2 mb-2 flex items-center justify-center'>
            <span className='mr-2'><PiWarningOctagonFill /></span>
            <span>{error}</span>
          </div>
        }
        <Input placeholder='Email' id='email' type='email' name='email' onChange={handleChange} value={state.email} />
        <Input placeholder='Password' id='password' type='password' name='password' onChange={handleChange} value={state.password} />
        <Button label='Log In' disabled={loading} />
        <div>
          Haven&#39;t go an account? <Link className='text-purple-500 underline font-bold' href='/register'>Sing Up</Link>
        </div>
      </div>
    </form>
  )
}