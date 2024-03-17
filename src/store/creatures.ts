import { APP_API } from '@/constants';
import {
  authenticatedDelete,
  authenticatedPost,
  authenticatedPut,
} from '@/core/http';
import { Creature } from '@/models';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import {
  CreatureEditorState,
  close,
  closeDeleteConfirmation,
} from './creatureEditor';

export const fetchCreatures = createAsyncThunk(
  'creatures/fetchCreatures',
  async () => {
    const response = await fetch(`${APP_API}/creature`);
    if (!response.ok) {
      throw new Error('Failed to fetch creatures');
    }
    const creatures = await response.json();
    return creatures;
  },
);

export const deleteCreature = createAsyncThunk(
  'creatures/deleteCreature',
  async (id: string, thunkAPI) => {
    const response = await authenticatedDelete(`${APP_API}/creature/${id}`);
    if (!response.ok) {
      throw new Error('Failed to delete creature with id ' + id);
    }
    thunkAPI.dispatch(fetchCreatures());
    thunkAPI.dispatch(closeDeleteConfirmation());

    return id;
  },
);

export const addCreature = createAsyncThunk(
  'creatures/addCreature',
  async (creature: Partial<Creature>, thunkAPI) => {
    const response = await authenticatedPost(`${APP_API}/creature`, creature);
    if (!response.ok) {
      throw new Error('Failed to add creature');
    }
    thunkAPI.dispatch(fetchCreatures());
    thunkAPI.dispatch(close());

    return response;
  },
);

export const saveCreature = createAsyncThunk(
  'creatures/saveCreature',
  async (creature: Creature, thunkAPI) => {
    const response = await authenticatedPut(
      `${APP_API}/creature/${creature.id}`,
      creature,
    );
    if (!response.ok) {
      throw new Error('Failed to save creature');
    }
    thunkAPI.dispatch(fetchCreatures());
    thunkAPI.dispatch(close());

    return response;
  },
);

export const fetchCreaturesController = (
  builder: ActionReducerMapBuilder<CreatureEditorState>,
) => {
  builder.addCase(fetchCreatures.pending, state => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(
    fetchCreatures.fulfilled,
    (state, action: PayloadAction<Creature[]>) => {
      state.loading = false;
      state.entities = action.payload;
    },
  );
  builder.addCase(fetchCreatures.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message || 'Failed to fetch creatures';
  });
};

export const deleteCreatureController = (
  builder: ActionReducerMapBuilder<CreatureEditorState>,
) => {
  builder.addCase(deleteCreature.pending, state => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(deleteCreature.fulfilled, state => {
    state.loading = false;
  });
  builder.addCase(deleteCreature.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message || 'Failed to fetch creatures';
  });
};

export const addCreatureController = (
  builder: ActionReducerMapBuilder<CreatureEditorState>,
) => {
  builder.addCase(addCreature.pending, state => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(addCreature.fulfilled, state => {
    state.loading = false;
  });
  builder.addCase(addCreature.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message || 'Failed to add creature';
  });
};

export const saveCreatureController = (
  builder: ActionReducerMapBuilder<CreatureEditorState>,
) => {
  builder.addCase(saveCreature.pending, state => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(saveCreature.fulfilled, state => {
    state.loading = false;
  });
  builder.addCase(saveCreature.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message || 'Failed to save creature';
  });
};
