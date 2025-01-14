import { ChevronLeft } from '@mui/icons-material';
import { Divider, IconButton, Typography } from '@mui/material';
import React from 'react';
import { CreatureForm } from './CreatureForm';
import { DrawerHeader } from '../styled/DrawerHeader';
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { addCreature } from '@/store/creatures';
import { Creature } from '@/models';
import { close } from '@/store/creatureEditor';

export const AddCreature = () => {
  const dispatch = useDispatch();

  const { formState, drawerLoading } = useSelector(
    (state: RootState) => state.creatureEditor,
  );

  const onClose = () => dispatch(close());
  const onSave = (data: Partial<Creature>) => dispatch(addCreature(data));

  return (
    <>
      <DrawerHeader sx={{ gap: '8px' }}>
        <Typography variant='h6' color='inherit'>
          Add new creature
        </Typography>
        <IconButton onClick={onClose}>
          <ChevronLeft />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <CreatureForm
        defaultCreature={formState}
        onSubmit={onSave}
        loading={drawerLoading}
      />
    </>
  );
};
