'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import instance from '@/lib/api/apiInstance';
import { apiUrl } from '@/lib/api/apiUrl';
import Loader from '@/utils/loader/Loader';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const initialState = {
  loading: false,
  email: '',
  password: '',
  showPassword: false,
  success: false,
  error: '',
};

function Form() {
  const [state, setState] = useState(initialState);
  const router = useRouter();

  const HandelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.email || !state.password) {
      return setState((prev) => ({
        ...prev,
        error: 'Email and Password are required',
        success: false,
      }));
    }
    setState((prev) => ({ ...prev, loading: true, error: '', success: false }));
    try {
      const { data: response } = await instance.post(apiUrl.auth.login, {
        email: state.email,
        password: state.password,
      });
      if (response.success) {
        setState({
          ...state,
          loading: false,
          success: true,
          error: response.message,
        });
        router.push('/dashboard');
      }

      if (!response.success) {
        setState({
          ...state,
          loading: false,
          success: false,
          error: response.message,
        });
      }
    } catch (error: any) {
      setState({ ...state, error: error.message, loading: false });
    }
  };
  return (
    <form onSubmit={HandelSubmit}>
      <label htmlFor="email" className="mb-1 block">
        <span className="text-bold mb-6 text-sm leading-6">Email Address</span>
        <Input
          id="email"
          aria-label="Email Address"
          onChange={(e) => setState({ ...state, email: e.target.value })}
          type="email"
          placeholder="abc@xyz.com"
          className="mt-1 focus:ring-0 focus-visible:ring-1"
        />
      </label>
      <label htmlFor="password" className="mb-1 block">
        <span className="text-bold mb-6 text-sm leading-6">Password</span>
        <div className="relative">
          <Input
            id="password"
            araia-label="Password"
            onChange={(e) => setState({ ...state, password: e.target.value })}
            type={state.showPassword ? 'text' : 'password'}
            placeholder="password"
            className="mt-1 focus:ring-0 focus-visible:ring-1"
          />
          <button
            type="button"
            className="absolute right-0 top-0 mr-2 mt-2 p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {state.showPassword ? (
              <EyeOff
                onClick={() => setState({ ...state, showPassword: false })}
                size={16}
              />
            ) : (
              <Eye
                onClick={() => setState({ ...state, showPassword: true })}
                size={16}
              />
            )}
          </button>
        </div>
      </label>
      <Button
        variant="default"
        className="relative mt-6 w-full bg-gray-800 hover:bg-gray-900"
      >
        {state.loading ? <Loader /> : 'Login Here'}
      </Button>
      <p className="my-4 text-center text-sm tracking-tight">
        Don't have an account?{' '}
        <span className="text-semibold cursor-pointer underline">
          <Link href={'/signup'}>Signup</Link>
        </span>{' '}
        for free.
      </p>
      <p
        className={`mb-6 h-[50px] text-center text-sm font-medium ${
          (state.success && !state.error) || (!state.success && state.error)
            ? ''
            : 'invisible'
        }`}
      >
        {state.success && !state.error ? (
          <span className="text-green-700">Login Successful </span>
        ) : null}

        {!state.success && state.error ? (
          <span className="text-red-500">{state.error}</span>
        ) : null}
      </p>
    </form>
  );
}

export default Form;
