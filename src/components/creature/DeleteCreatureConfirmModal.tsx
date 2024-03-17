import { closeDeleteConfirmation } from '@/store/creatureEditor';
import { deleteCreature } from '@/store/creatures';
import { RootState } from '@/store/store';
import {
  Box,
  Button,
  ButtonGroup,
  Modal,
  Stack,
  Typography,
} from '@mui/material';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const DeleteCreatureConfirmModal = () => {
  const dispatch = useDispatch();
  const { isDeleteConfirmation, creatureToDelete } = useSelector(
    (state: RootState) => state.creatureEditor,
  );

  const onCloseDeleteModal = () => dispatch(closeDeleteConfirmation());
  const onDeleteCreature = () => dispatch(deleteCreature(creatureToDelete.id));

  if (!creatureToDelete) return null;
  return (
    <Modal
      open={isDeleteConfirmation}
      onClose={onCloseDeleteModal}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Stack spacing={2}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            DELETE CREATURE
          </Typography>
          <Typography id='modal-modal-description'>
            Are you sure you want to delete {creatureToDelete.name}? Deletion is
            irreversible.
          </Typography>

          <ButtonGroup>
            <Button color='inherit' onClick={onCloseDeleteModal}>
              Cancel
            </Button>
            <Button color='error' onClick={onDeleteCreature}>
              Delete
            </Button>
          </ButtonGroup>
        </Stack>
      </Box>
    </Modal>
  );
};
