import { RiSettingsLine } from "react-icons/ri";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi";

type Benefits = {
  title: string;
  subtitle: string;
  iconName: string;
};

const RegisterBenefits = ({ title, subtitle, iconName }: Benefits) => {
  return (
    <>
      <h6 className='text-[#806a9a] text-[1.5rem] py-2 flex items-center'>
        <span className='pr-3'>
          {iconName === "RiSettingsLine" ? (
            <RiSettingsLine />
          ) : iconName === "HiOutlineUserCircle" ? (
            <HiOutlineUserCircle />
          ) : (
            <AiOutlineCloudUpload />
          )}
        </span>
        {title}
      </h6>
      <p className='text-[#383E40] w-max-[620px] text-[0.8rem] opacity-80'>
        {subtitle}
      </p>
    </>
  );
};

export default RegisterBenefits;
