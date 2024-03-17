import { RootState } from '@/store/store';

export const isCreaturePanelOpenSelector = (state: RootState) =>
  state.creatureEditor.creatureDrawerState !== 'closed';

export const isEditModeSelector = (state: RootState) =>
  state.creatureEditor.creatureDrawerState === 'edit';

export const isAddModeSelector = (state: RootState) =>
  state.creatureEditor.creatureDrawerState === 'add';
