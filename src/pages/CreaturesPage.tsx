import { useEffect } from 'react';
import { Container, Drawer, Fab, Tooltip } from '@mui/material';
import { TodoGrid } from '@/components/creature/TodoGrid';
import { fetchCreatures } from '@/store/creatures';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { styled } from '@mui/material/styles';
import { emptyCreature, openCreatureAddPanel } from '@/store/creatureEditor';

import AddIcon from '@mui/icons-material/Add';

import { DeleteCreatureConfirmModal } from '@/components/creature/DeleteCreatureConfirmModal';
import { EditCreature } from '@/components/creature/EditCreature';
import { AddCreature } from '@/components/creature/AddCreature';
import {
  isAddModeSelector,
  isCreaturePanelOpenSelector,
  isEditModeSelector,
} from '@/selectors/creature';
import { Loader } from '@/components/Loader';
import { NoData } from '@/components/NoData';

const drawerWidth = 300;

const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `0`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

export const CreaturesPage = () => {
  const dispatch = useDispatch();
  const { entities, loading, error } = useSelector(
    (state: RootState) => state.creatureEditor,
  );
  const isOpen = useSelector(isCreaturePanelOpenSelector);
  const isEdit = useSelector(isEditModeSelector);
  const isAdd = useSelector(isAddModeSelector);

  const onCreateNew = () =>
    dispatch(openCreatureAddPanel({ ...emptyCreature }));

  useEffect(() => {
    dispatch(fetchCreatures());
  }, [dispatch]);

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Drawer
        open={isOpen}
        variant='persistent'
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            top: '48px',
            width: drawerWidth,
            boxSizing: 'border-box',
            zIndex: '1000',
          },
        }}
      >
        {isEdit && <EditCreature />}
        {isAdd && <AddCreature />}
      </Drawer>
      <Main open={isOpen}>
        <Container sx={{ marginTop: '24px', my: 10 }}>
          {!loading && entities.length === 0 && (
            <NoData message='No creatures found' />
          )}
          {loading ? (
            <Loader placeholderCount={10} />
          ) : (
            <TodoGrid items={entities} />
          )}
        </Container>
      </Main>

      <DeleteCreatureConfirmModal />

      <Tooltip title='Add new Creature'>
        <Fab
          color='primary'
          aria-label='add'
          sx={{ position: 'fixed', bottom: '64px', right: '64px' }}
          onClick={onCreateNew}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
    </>
  );
};
