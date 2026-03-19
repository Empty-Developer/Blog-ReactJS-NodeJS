import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';

import { fetchAuth, isAuthSelect } from '../../redux/slices/auth'

export const Registration = () => {
  const isAuth = useSelector(isAuthSelect)
  
  const dispatch = useDispatch()
  
  const { register, handleSubmit, setError, formState: { errors, isValid }} = useForm({
    defaultValues: {
      fullname: 'Georgiy',
      email: 'geo@test.com',
      password: '12345'
    },
    mode: 'onChange',
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values))

    if (!data.payload) {
      return alert('Не удалось авторизоваться')
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <TextField 
      error={Boolean(errors.email?.message)}
      type="email"
      helperText={errors.email?.message}
      {...register('email', {required: 'Укажите почту'})}
      className={styles.field} label="Полное имя" fullWidth />
      <TextField
      error={Boolean(errors.email?.message)}
      type="email"
      helperText={errors.email?.message}
      {...register('email', {required: 'Укажите почту'})}
      className={styles.field} label="E-Mail" fullWidth />
      <TextField 
      error={Boolean(errors.email?.message)}
      type="email"
      helperText={errors.email?.message}
      {...register('email', {required: 'Укажите почту'})}
      className={styles.field} label="Пароль" fullWidth />
      <Button size="large" variant="contained" fullWidth>
        Зарегистрироваться
      </Button>
    </Paper>
  );
};
