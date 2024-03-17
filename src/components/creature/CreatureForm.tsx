import { Creature } from '@/models';
import { Stack, TextField, styled } from '@mui/material';
import { emptyCreature } from '@/store/creatureEditor';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CreaturePreviewImg } from './CreaturePreviewImg';
import { LoadingButton } from '@mui/lab';

type Inputs = {
  name: string;
  strength: number;
  vitality: number;
  dexterity: number;
  image: string;
};

type Props = {
  defaultCreature?: Partial<Creature>;
  onSubmit: (data: Partial<Creature>) => void;
  loading: boolean;
};

const Form = styled('form')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  marginTop: '16px',
}));

const Label = styled('label')(() => ({
  width: '80px',
}));

export const CreatureForm = (props: Props) => {
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: { ...emptyCreature } });

  useEffect(() => {
    reset(props.defaultCreature);
  }, [props.defaultCreature]);

  const image = watch('image');

  return (
    <Form onSubmit={handleSubmit(props.onSubmit)}>
      <Stack spacing={2}>
        <CreaturePreviewImg src={image} />

        <Stack direction='row' spacing={2} alignItems='center'>
          <Label>Name</Label>
          <TextField
            error={Boolean(errors.name)}
            helperText={errors.name && 'This field is required'}
            {...register('name', { required: true })}
          />
        </Stack>

        <Stack direction='row' spacing={2} alignItems='center'>
          <Label>Image</Label>
          <TextField
            error={Boolean(errors.image)}
            helperText={errors.image && 'This field is required'}
            {...register('image', { required: true })}
          />
        </Stack>

        <Stack direction='row' spacing={2} alignItems='center'>
          <Label>Strength</Label>
          <TextField
            type='number'
            error={Boolean(errors.strength)}
            helperText={errors.strength && 'This field is required'}
            {...register('strength', { required: true, valueAsNumber: true })}
          />
        </Stack>

        <Stack direction='row' spacing={2} alignItems='center'>
          <Label>Vitality</Label>
          <TextField
            type='number'
            error={Boolean(errors.vitality)}
            helperText={errors.vitality && 'This field is required'}
            {...register('vitality', { required: true, valueAsNumber: true })}
          />
        </Stack>

        <Stack direction='row' spacing={2} alignItems='center'>
          <Label>Dexterity</Label>
          <TextField
            type='number'
            error={Boolean(errors.dexterity)}
            helperText={errors.dexterity && 'This field is required'}
            {...register('dexterity', { required: true, valueAsNumber: true })}
          />
        </Stack>

        <LoadingButton type='submit' loading={props.loading}>
          Save
        </LoadingButton>
      </Stack>
    </Form>
  );
};
