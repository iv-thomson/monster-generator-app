import { createSlice } from '@reduxjs/toolkit';

import { Location, PartialLocation } from '@/models';
import {
  addLocationController,
  deleteLocationController,
  fetchLocationsController,
  saveLocationController,
} from './locationThunks';

export interface LocationState {
  locationDrawerState: 'closed' | 'edit' | 'add';
  isDeleteConfirmation: boolean;
  formState: PartialLocation;
  creatureToDelete: Location | null;
  entities: Location[];
  loading: boolean;
  error: string | null;
  highlightedItemId: string | null;
  drawerLoading: boolean;
}

export const emptyLocation: PartialLocation = {
  name: '',
  description: '',
  image: '',
};

const initialState: LocationState = {
  locationDrawerState: 'closed',
  isDeleteConfirmation: false,
  formState: { ...emptyLocation },
  creatureToDelete: null,
  entities: [],
  loading: false,
  highlightedItemId: null,
  drawerLoading: false,
  error: null,
};

const openEditPanel = (state: LocationState) => {
  state.locationDrawerState = 'edit';
};

const openAddPanelHandler = (state: LocationState) => {
  state.locationDrawerState = 'add';
};

const setFormState = (state, payload) => {
  state.formState = { ...state.formState, ...payload };
};

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    openEditor: (state, action) => {
      openEditPanel(state);
      setFormState(state, action.payload);
    },
    openAddPanel: (state, action) => {
      openAddPanelHandler(state);
      setFormState(state, action.payload);
    },
    close: state => {
      state.locationDrawerState = 'closed';
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
    deleteLocally: (state, action) => {
      state.entities = state.entities.filter(c => c.id !== action.payload);
    },
    updateLocally: (state, action) => {
      state.entities = state.entities.map(c =>
        c.id === action.payload.id ? action.payload : c,
      );
      state.highlightedItemId = action.payload.id;
    },
    addLocally: (state, action) => {
      state.entities.push(action.payload);
      state.highlightedItemId = action.payload.id;
    },
    removeHighlight: state => {
      state.highlightedItemId = null;
    },
  },
  extraReducers: builder => {
    fetchLocationsController(builder);
    deleteLocationController(builder);
    addLocationController(builder);
    saveLocationController(builder);
  },
});

export const locationReducer = locationSlice.reducer;
export const {
  openEditor,
  openAddPanel,
  openDeleteConfirmation,
  closeDeleteConfirmation,
  close,
  deleteLocally,
  addLocally: addCreatureLocally,
  updateLocally,
  removeHighlight,
} = locationSlice.actions;
