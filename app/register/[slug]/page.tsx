"use client";
import React, { useState } from "react";
import { auth } from "@/app/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Field, Form, Formik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import * as Yup from "yup";

const DisplayingErrorMessagesSchema = Yup.object().shape({
  password1: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password2: Yup.string().when("password1", (password1, field) =>
    password1
      ? field.oneOf([Yup.ref("password1")], "Passwords must match")
      : field
  ),
});

interface Values {
  password1: string;
  password2: string;
}

const RegisterPassword = () => {
  const [loading, setloading] = useState(false);
  const searchEmail = useSearchParams();
  const router = useRouter();
  const email: string | null = searchEmail.get("email");

  async function handleRegister(values: Values) {
    if (email) {
      try {
        setloading(true);
        const res = await createUserWithEmailAndPassword(
          auth,
          email,
          values.password1
        );
        if (res) {
          setloading(false);
          router.push("/login");
        }
      } catch (error) {
        alert(error);
      } finally {
        setloading(false);
      }
    }
  }

  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <div className='my-2'>
        <h1 className='text-center text-2xl mb-4'>Set your password</h1>
        <h3>Create your password and login to your Heroku account</h3>
      </div>
      <hr />
      <div className='bg-white rounded p-4'>
        <Formik
          initialValues={{ password1: "", password2: "" }}
          validationSchema={DisplayingErrorMessagesSchema}
          onSubmit={(values: Values, actions) => {
            handleRegister(values).then(() => actions.setSubmitting(false));
          }}>
          {({ errors, touched }) => (
            <Form className='p-4 text-gray-500 '>
              <label htmlFor='password1' className='block'>
                Create a new password *
              </label>
              <Field
                id='password1'
                name='password1'
                placeholder='Password'
                className='h-10 bg-white px-2 my-2 w-full border outline-none'
                required
              />
              <label htmlFor='password' className='block'>
                Password confirmation *
              </label>
              <Field
                id='password2'
                name='password2'
                placeholder='Password'
                className='h-10 bg-white px-2 my-2 w-full border outline-none'
                required
              />

              <div>
                {touched.password1 && errors.password1 && (
                  <div>{errors.password1}</div>
                )}
                {touched.password2 && errors.password2 && (
                  <div>{errors.password2}</div>
                )}
              </div>
              <button
                type='submit'
                className='block p-2 uppercase bg-blue-800 rounded w-full h-10 font-bold text-white'>
                {loading ? "loading..." : "Set password and Log in"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterPassword;
