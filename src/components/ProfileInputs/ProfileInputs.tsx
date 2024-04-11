import useForm from '../../hooks/useForm';
import styles from './ProfileInputs.module.scss';

import { useNavigate } from 'react-router-dom';
import { FC, useEffect, FormEvent } from 'react';
import { UseFormPropTypes } from '../../utils/types';
import { patchInfoUser } from '../../redux/actions/patchInfoUser';
import { useDispatch, useSelector } from '../../hooks/useReduxToolkit';
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';

const ProfileInputs: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userCurrent } = useSelector((state) => state.userCurrentSlice);
  const { status, userCurrentRegistrSuccessServerAnswer } = useSelector(
    (state) => state.userCurrentSlice,
  );

  const { values, handleChange, setValues } = useForm({
    name: userCurrent ? userCurrent.name : '',
    email: userCurrent ? userCurrent.email : '',
    password: '',
  });

  const nameValue = values.name;
  const emailValue = values.email;
  const passValue = values.password;

  const handleSubmit = async (
    e: FormEvent,
    values: UseFormPropTypes,
    nameValue: string,
    emailValue: string,
    passValue: string,
  ): Promise<void> => {
    e.preventDefault();
    setValues({ ...values, password: '' });
    await dispatch(patchInfoUser({ nameValue, emailValue, passValue }));
  };

  function compareNameAndEmail(
    obj1: UseFormPropTypes,
    obj2: { name: string; email: string },
  ): boolean {
    return obj1.name !== obj2.name || obj1.email !== obj2.email;
  }

  const handleUndoChanges = () => {
    if (userCurrent) {
      setValues({
        name: userCurrent.name,
        email: userCurrent.email,
        password: '',
      });
    }
  };

  useEffect(() => {
    if (status && userCurrentRegistrSuccessServerAnswer) {
      navigate('/login');
    }
  }, [status, userCurrentRegistrSuccessServerAnswer]);

  return (
    <form
      className={styles.inputs}
      onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
        handleSubmit(e, values, nameValue, emailValue, passValue)
      }
    >
      <Input
        type={'text'}
        placeholder='name'
        onChange={(e) => handleChange(e)}
        value={nameValue}
        name={'name'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        extraClass='ml-1'
      />
      <br />
      <EmailInput
        onChange={(e) => handleChange(e)}
        value={emailValue}
        name={'email'}
        placeholder='email'
        isIcon={false}
      />
      <br />
      <PasswordInput
        onChange={(e) => handleChange(e)}
        value={passValue}
        name={'password'}
        placeholder='password'
        extraClass='mb-2'
      />
      <br />

      {(userCurrent && compareNameAndEmail(values, userCurrent)) || values.password !== '' ? (
        <div className={`${styles.inputs__wrapper}`}>
          <Button onClick={handleUndoChanges} htmlType='button' type='primary' size='medium'>
            Отменить изменения
          </Button>
          <Button htmlType='submit' type='primary' size='medium'>
            Изменить
          </Button>
        </div>
      ) : (
        ''
      )}
    </form>
  );
};

export default ProfileInputs;
