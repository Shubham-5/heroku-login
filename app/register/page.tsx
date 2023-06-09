"use client";

import Image from "next/image";
import { Formik, Field, Form, FormikHelpers } from "formik";
import FormField from "../components/FormField";
import RegisterBenefits from "../components/RegisterBenefits";
import Link from "next/link";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { countries } from "./CountryList";

interface Values {
  email: string;
  firstName: string;
  lastName: string;
  Role: string;
  companyName: string;
  "Country/Region": string;
  "Primary development language": string;
}

const Register = ({ setUser }: any) => {
  const [loading, setloading] = useState(false);
  const router = useRouter();
  async function handleRegister(values: Values) {
    setloading(true);
    const {
      email,
      firstName,
      lastName,
      companyName,
      "Country/Region": region,
      "Primary development language": language,
      Role,
    } = values;
    if (!region || !language || !Role) {
      setloading(false);
      return alert("fill all required details");
    }

    try {
      const res = await addDoc(collection(db, "users"), {
        firstName: firstName,
        lastName: lastName,
        email,
        role: Role,
        company: companyName,
        country: region,
        developmentLanguage: language,
      });
      if (res) {
        setloading(false);
        router.push(`/register/user?email=${email}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  }
  return (
    <div className='h-full'>
      <header className='pt-8'>
        <div className='flex justify-between items-center'>
          <a href='#' className='block'>
            <Image
              src='https://signup.heroku.com/assets/logo-horizontal-30c94876b673967b26d0e4a698748b3a157e699845045b3b64fe69706c794bb9.png'
              width={140}
              height={140}
              alt='logo'
            />
          </a>
          <div>
            <span className='hidden md:inline-block mr-2'>
              Already have an account?
            </span>
            <button className='bg-[rgba(0,0,0,0.2)] px-4 py-2 rounded'>
              <Link href='/login'>Log in</Link>
            </button>
          </div>
        </div>

        <h1 className='text-center w-max-[400px] text-2xl my-8'>
          Get started on Heroku today
        </h1>
      </header>
      <div className='relative mb-4'>
        <div className='p-4 bg-[#F9F9FB] mr-2 rounded signup-form'>
          <section className='p-8 md:w-[360px] h-[745px]'>
            <RegisterBenefits
              title='Heroku Account'
              iconName='HiOutlineUserCircle'
              subtitle='Create apps, connect databases and add-on services, and collaborate on your apps.'
            />
            <hr className='my-8' />
            <RegisterBenefits
              title='Your app platform'
              iconName='RiSettingsLine'
              subtitle='A platform for apps, with app management & instant scaling, for development and production.'
            />
            <hr className='my-8' />
            <RegisterBenefits
              title='Deploy now'
              iconName='AiOutlineCloudUpload'
              subtitle='Go from code to running app in minutes. Deploy, scale, and deliver your app to the world.'
            />
          </section>
          <section className='form-section lg:absolute top-5 right-0 bg-white lg:w-[360px] rounded'>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                Role: "",
                "Primary development language": "",
                "Country/Region": "",
                companyName: "",
              }}
              onSubmit={(
                values: Values,
                { setSubmitting }: FormikHelpers<Values>
              ) => {
                handleRegister(values).then(() => setSubmitting(false));
              }}>
              <Form className='p-8 border rounded text-[#62748e]'>
                <FormField
                  title='First Name'
                  name='firstName'
                  isRequired={true}
                  type='text'
                />
                <FormField
                  title='Last Name'
                  name='lastName'
                  isRequired={true}
                  type='text'
                  values={[]}
                />
                <FormField
                  title='Email address'
                  name='email'
                  isRequired={true}
                  type='email'
                />
                <FormField
                  title='Company Name'
                  name='companyName'
                  isRequired={false}
                  type='text'
                />
                <FormField
                  title='Role'
                  isRequired={true}
                  type='select'
                  values={[
                    "Agency / Partner Developer",
                    "Hobbyist",
                    "Proffesional Developer",
                    "Student",
                    "Business Manager",
                  ]}
                />
                <FormField
                  title='Country/Region'
                  isRequired={true}
                  type='select'
                  values={countries}
                />
                <FormField
                  title='Primary development language'
                  isRequired={true}
                  type='select'
                  values={[
                    "Ruby",
                    "PHP",
                    "Python",
                    "Node.js",
                    "Java",
                    "Scala",
                    "Go",
                    "I user another language",
                    "I'm not a developer",
                  ]}
                />

                <button
                  type='submit'
                  className='block uppercase w-full bg-[#1969ca] text-white text-[14px] py-3 font-bold mt-4 rounded'>
                  {loading ? "Creating..." : "Create an account"}
                </button>
                <p className='text-sm mt-4 text-[#383E40]'>
                  Signing up signifies that you have read and agree to the{" "}
                  <a href='#' className='underline text-blue-500'>
                    Terms of Service{" "}
                  </a>
                  and our{" "}
                  <a href='#' className='underline text-blue-500'>
                    Privacy Policy{" "}
                  </a>
                  .{" "}
                  <a href='#' className='underline text-blue-500'>
                    Cookie Preferences
                  </a>
                  .
                </p>
              </Form>
            </Formik>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Register;
