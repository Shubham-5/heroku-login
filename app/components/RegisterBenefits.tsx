type Benefits = {
  title: string;
  subtitle: string;
};

const RegisterBenefits = ({ title, subtitle }: Benefits) => {
  return (
    <>
      <h3 className='text-[#79589F] text-[1.5rem] py-2'>{title}</h3>
      <p className='text-[#383E40] w-max-[600px] text-[0.8rem]'>{subtitle}</p>
    </>
  );
};

export default RegisterBenefits;
