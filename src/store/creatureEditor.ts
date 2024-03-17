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
  highlightedItemId: string | null;
  drawerLoading: boolean;
}

export const emptyCreature: Partial<Creature> = {
  dexterity: 0,
  strength: 0,
  vitality: 0,
  name: '',
  image: '',
  tags: [],
};

const initialState: CreatureEditorState = {
  creatureDrawerState: 'closed',
  isDeleteConfirmation: false,
  formState: { ...emptyCreature },
  creatureToDelete: null,
  entities: [],
  loading: false,
  highlightedItemId: null,
  drawerLoading: false,
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
    deleteCreatureLocally: (state, action) => {
      state.entities = state.entities.filter(c => c.id !== action.payload);
    },
    updateCreatureLocally: (state, action) => {
      state.entities = state.entities.map(c =>
        c.id === action.payload.id ? action.payload : c,
      );
      state.highlightedItemId = action.payload.id;
    },
    addCreatureLocally: (state, action) => {
      state.entities.push(action.payload);
      state.highlightedItemId = action.payload.id;
    },
    removeCreatureHighlight: state => {
      state.highlightedItemId = null;
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
  deleteCreatureLocally,
  addCreatureLocally,
  updateCreatureLocally,
  removeCreatureHighlight,
} = creatureEditorSlice.actions;
