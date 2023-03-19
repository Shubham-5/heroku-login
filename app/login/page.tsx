"use client";
import * as React from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import Image from "next/image";
import Link from "next/link";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";
import Router from "next/router";
interface Values {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  async function handleLogin(values: Values) {
    const { email, password } = values;
    const user = await signInWithEmailAndPassword(auth, email, password);
    if (user) router.push("/");
  }

  return (
    <div className='text-center h-screen pt-12'>
      <h1 className='logo flex items-center justify-center mb-10'>
        <a href='#' className='block'>
          <Image
            src='https://id.heroku.com/assets/logo-vertical.png'
            width={60}
            height={60}
            alt='logo'
          />
        </a>
      </h1>
      <div className='bg-white rounded w-[430px] mx-auto shadow'>
        <h1 className='text-[#664986] pt-[2rem] px-[1rem] text-center text-2xl'>
          Log in to your account
        </h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            handleLogin(values);
          }}>
          <Form className='p-10 text-[#62748e]'>
            <label
              htmlFor='email'
              className='font-semibold block text-left text-[12px]'>
              Email address
            </label>

            <Field
              id='email'
              name='email'
              placeholder='Email address'
              type='email'
              className='w-full p-1 h-10 rounded bg-[#fffedb] border-[#cbcbd2] border text-[#3f3f44]'
              required
            />
            <label
              htmlFor='password'
              className='block text-left font-semibold text-[12px] mt-3'>
              Password
            </label>
            <Field
              id='password'
              name='password'
              placeholder='Password'
              type='password'
              className='w-full p-1 h-10 rounded border-[#cbcbd2] border bg-[#fffedb] text-[#3f3f44]'
              required
            />

            <button
              type='submit'
              className='block h-10 w-full bg-[#60467e] text-white text[18px] py-1 mt-4 rounded'>
              Log in
            </button>
          </Form>
        </Formik>
        <Link href='/register' className='panel-footer'>
          New to Heroku?
          <span>Sign Up</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
