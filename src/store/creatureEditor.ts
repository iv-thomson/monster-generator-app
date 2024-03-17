import { Creature } from '@/models';
import { createSlice } from '@reduxjs/toolkit';
import {
  addCreatureController,
  deleteCreatureController,
  fetchCreaturesController,
  saveCreatureController,
} from './creatures';

export interface CreatureEditorState {
  creatureDrawerState: 'closed' | 'edit' | 'add';
  isDeleteConfirmation: boolean;
  formState: Partial<Creature>;
  creatureToDelete: Creature | null;
  entities: Creature[];
  loading: boolean;
  error: string | null;
}

const initialState: CreatureEditorState = {
  creatureDrawerState: 'closed',
  isDeleteConfirmation: false,
  formState: {},
  creatureToDelete: null,
  entities: [],
  loading: false,
  error: null,
};

const openEditPanel = (state: CreatureEditorState) => {
  state.creatureDrawerState = 'edit';
};

const openAddPanel = (state: CreatureEditorState) => {
  state.creatureDrawerState = 'add';
};

const setFormState = (state, payload) => {
  state.formState = { ...state.formState, ...payload };
};

export const creatureEditorSlice = createSlice({
  name: 'creatures',
  initialState,
  reducers: {
    openCreatureEditor: (state, action) => {
      openEditPanel(state);
      setFormState(state, action.payload);
    },
    openCreatureAddPanel: (state, action) => {
      openAddPanel(state);
      setFormState(state, action.payload);
    },
    close: state => {
      state.creatureDrawerState = 'closed';
    },
    openDeleteConfirmation: (state, action) => {
      state.isDeleteConfirmation = true;
      state.creatureToDelete = action.payload;
    },
    closeDeleteConfirmation: state => {
      state.isDeleteConfirmation = false;
    },
    updateForm: (state, action) => {
      setFormState(state, action.payload);
    },
  },
  extraReducers: builder => {
    fetchCreaturesController(builder);
    deleteCreatureController(builder);
    addCreatureController(builder);
    saveCreatureController(builder);
  },
});

export const creatureEditorReducer = creatureEditorSlice.reducer;
export const {
  openCreatureEditor,
  openCreatureAddPanel,
  openDeleteConfirmation,
  closeDeleteConfirmation,
  close,
} = creatureEditorSlice.actions;
