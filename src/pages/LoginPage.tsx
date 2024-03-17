import { login } from '@/store/login';
import { RootState } from '@/store/store';
import { Container, Stack, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

type Inputs = {
  username: string;
  password: string;
};

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const dispatch = useDispatch();
  const { error, loading } = useSelector(
    (state: RootState) => state.loginState,
  );

  const onSubmit: SubmitHandler<Inputs> = data => {
    dispatch(login(data));
  };

  return (
    <Container maxWidth='sm' sx={{ marginTop: '128px', my: 10 }}>
      <Typography
        variant='h4'
        textAlign='center'
        marginBottom='64px'
        fontWeight='600'
      >
        Welcome to the Text game asset management system
      </Typography>

      <Stack spacing={2}>
        <TextField
          label='User name'
          error={Boolean(errors.username)}
          helperText={errors.username && 'This field is required'}
          {...register('username', { required: true })}
        />
        <TextField
          label='Password'
          type='password'
          error={Boolean(errors.password)}
          helperText={errors.password && 'This field is required'}
          {...register('password', { required: true })}
        />
        <LoadingButton
          variant='contained'
          loading={loading}
          onClick={handleSubmit(onSubmit)}
        >
          Login
        </LoadingButton>

        {error && <Typography color='error'>{error}</Typography>}
      </Stack>
    </Container>
  );
};
