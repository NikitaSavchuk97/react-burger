import styles from './ProfileInputs.module.scss';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { patchInfoUser } from '../../redux/actions/patchInfoUser';
import { getCurrentUser } from '../../redux/actions/getCurrentUser';

const ProfileInputs: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const { userCurrent } = useSelector((state: any) => state.userCurrentSlice);
  const [nameValue, setNameValue] = useState(userCurrent.name);
  const [emailValue, setEmailValue] = useState(userCurrent.email);
  const [passValue, setPassValue] = useState('');

  const { requestStatus, userCurrentRegistrSuccessServerAnswer } = useSelector(
    (state: any) => state.userCurrentSlice,
  );

  const handlePatchInfoUser = async () => {
    await dispatch(patchInfoUser({ nameValue, emailValue, passValue }));
    //await dispatch(getCurrentUser());
  };

  const handleUndoChanges = () => {
    setEmailValue(userCurrent.email);
    setNameValue(userCurrent.name);
    setPassValue('');
  };

  useEffect(() => {
    if (requestStatus && userCurrentRegistrSuccessServerAnswer === 'success') {
      navigate('/login');
    }
  }, [requestStatus, userCurrentRegistrSuccessServerAnswer]);

  return (
    <div className={styles.inputs}>
      <Input
        type={'text'}
        placeholder='name'
        onChange={(e) => setNameValue(e.target.value)}
        value={nameValue}
        name={'name'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        extraClass='ml-1'
      />
      <br />
      <EmailInput
        onChange={(e) => setEmailValue(e.target.value)}
        value={emailValue}
        name={'email'}
        placeholder='email'
        isIcon={false}
      />
      <br />
      <PasswordInput
        onChange={(e) => setPassValue(e.target.value)}
        value={passValue}
        name={'password'}
        placeholder='password'
        extraClass='mb-2'
      />
      <br />
      <div className={styles.inputs__wrapper}>
        <Button
          onClick={handleUndoChanges}
          //extraClass={styles.inputs__wrapper__button}
          htmlType='button'
          type='primary'
          size='medium'
        >
          Отменить изменения
        </Button>
        <Button
          onClick={handlePatchInfoUser}
          //extraClass={styles.inputs__wrapper__button}
          htmlType='button'
          type='primary'
          size='medium'
        >
          Изменить
        </Button>
      </div>
    </div>
  );
};

export default ProfileInputs;
