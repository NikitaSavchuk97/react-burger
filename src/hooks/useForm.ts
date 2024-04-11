import { useState, ChangeEvent } from 'react';
import { UseFormPropTypes } from '../utils/types';

const useForm = (initialValues: UseFormPropTypes = {}) => {
  const [values, setValues] = useState<UseFormPropTypes>(initialValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  return { values, handleChange, setValues };
};

export default useForm;
