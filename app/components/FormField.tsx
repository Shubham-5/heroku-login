import { Field } from "formik";
type Forms = {
  title: string;
  name?: string;
  type: string;
  isRequired: boolean;
  values?: string[];
};

const FormField = ({ title, name, type, isRequired, values }: Forms) => {
  return (
    <>
      <label
        htmlFor='email'
        className='block font-semibold text-left text-[12px]'>
        {title} {isRequired && <span>*</span>}
      </label>

      {type === "select" ? (
        <Field
          as='select'
          name={title}
          required
          className='bg-white w-full px-2 py-[6px] rounded  focus:border-blue-500 focus:border-[1.4px] focus:ring-blue-500 outline-none border-[#cbcbd2] border h-10 text-[#3f3f44] text-sm mb-3'>
          <option value={title}>{title}</option>
          {values &&
            values.map((valueName: string) => (
              <option key={valueName} value={valueName}>
                {valueName}
              </option>
            ))}
        </Field>
      ) : (
        <Field
          id={name}
          name={name}
          placeholder={title}
          type={type}
          className='w-full input focus:border-blue-500 focus:border-[1.4px] focus:ring-blue-500 outline-none px-2 py-1 rounded bg-white border-[#cbcbd2] border text-sm h-10 text-[#3f3f44] mb-3'
          required={isRequired}
        />
      )}
    </>
  );
};

export default FormField;
