"use client"

import { IRegisterPage } from '@/interfaces/IRegisterPage';
import { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { signIn } from 'next-auth/react';
import Input from '@/components/Input'
import Swal from 'sweetalert2';
import Link from 'next/link';
import axios from 'axios';

const initialState: IRegisterPage = { name: '', email: '', password: '' }

export default function RegisterPage() {

  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    axios.post('/api/register', state)
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: response.data.message,
        }).then(() => {
          loginCreadentials();
        });
      })
      .catch(error => {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Error de registro',
          text: error.response?.data?.message,
        });
      });
  }

  function loginCreadentials() {
    signIn('credentials', {
      ...state, redirect: false
    }).then((callback) => {
      router.push('/');
      router.refresh();
    });
  }

  return (
    <form onSubmit={onSubmit} className='text-center'>
      <div className='flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2'>
        <h2 className='font-bold text-start mb-2'>Sign up and start learning.</h2>
        <Input placeholder='Complete Name' id='name' type='text' name='name' onChange={handleChange} value={state.name} />
        <Input placeholder='Email' id='email' type='email' name='email' onChange={handleChange} value={state.email} />
        <Input placeholder='Password' id='password' type='password' name='password' onChange={handleChange} value={state.password} />
        <Button label='Register' disabled={loading} />
        <div>
          Do you have an account? <Link className='text-purple-500 underline font-bold' href='/login'>Sing In</Link>
        </div>
      </div>
    </form>
  )
}