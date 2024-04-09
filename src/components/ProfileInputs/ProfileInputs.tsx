import styles from './ProfileInputs.module.scss';
import useForm from '../../hooks/useForm';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { patchInfoUser } from '../../redux/actions/patchInfoUser';
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';

const ProfileInputs: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { userCurrent } = useSelector((state: any) => state.userCurrentSlice);
  const { values, handleChange, setValues } = useForm({
    name: userCurrent.name,
    email: userCurrent.email,
    password: '',
  });

  const nameValue = values.name;
  const emailValue = values.email;
  const passValue = values.password;

  const { requestStatus, userCurrentRegistrSuccessServerAnswer } = useSelector(
    (state: any) => state.userCurrentSlice,
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setValues({ ...values, password: '' });
    await dispatch(patchInfoUser({ nameValue, emailValue, passValue }));
  };

  function compareNameAndEmail(obj1: any, obj2: any): boolean {
    return obj1.name !== obj2.name || obj1.email !== obj2.email;
  }

  const handleUndoChanges = () => {
    setValues({
      name: userCurrent.name,
      email: userCurrent.email,
      password: '',
    });
  };

  useEffect(() => {
    if (requestStatus && userCurrentRegistrSuccessServerAnswer === 'success') {
      navigate('/login');
    }
  }, [requestStatus, userCurrentRegistrSuccessServerAnswer]);

  return (
    <form className={styles.inputs} onSubmit={handleSubmit}>
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

      {compareNameAndEmail(values, userCurrent) || values.password !== '' ? (
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
