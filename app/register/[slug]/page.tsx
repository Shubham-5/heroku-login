"use client";

import FormField from "@/app/components/FormField";
import { auth } from "@/app/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Formik, Form } from "formik";

interface Values {
  password: string;
}
const RegisterPassword = ({ params }: { params: { slug: string } }) => {
  async function handleRegister(values: Values) {
    const res = await createUserWithEmailAndPassword(
      auth,
      params.slug,
      values.password
    );
  }
  console.log(params.slug);
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='bg-white'>
        <Formik
          initialValues={{
            password: "",
          }}
          onSubmit={(values: Values) => {
            handleRegister(values);
          }}>
          <Form className='p-8 border rounded text-[#62748e]'>
            <FormField
              title='Password'
              name='password'
              type='password'
              isRequired={true}
            />
            <button className='text-center bg-[#1969ca] h-10 w-full text-[0.8rem] uppercase font-semibold text-white'>
              Set Password and log in
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default RegisterPassword;
