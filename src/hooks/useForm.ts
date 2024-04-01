import { useState, ChangeEvent } from 'react';

interface FormValues {
  [key: string]: string;
}

function useForm(initialValues: FormValues = {}) {
  const [values, setValues] = useState<FormValues>(initialValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  return { values, handleChange, setValues };
}

export default useForm;
