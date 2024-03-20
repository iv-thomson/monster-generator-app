import { APP_API } from '@/constants';
import {
  authenticatedDelete,
  authenticatedPost,
  authenticatedPut,
} from '@/core/http';
import { Location, PartialLocation } from '@/models';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import {
  close,
  deleteLocally,
  closeDeleteConfirmation,
  updateLocally,
  LocationState,
} from './location';
import { handleUnauthorized } from '@/core/auth';

export const fetchLocations = createAsyncThunk(
  'locations/fetchLocations',
  async () => {
    const response = await fetch(`${APP_API}/location`);
    if (!response.ok) {
      throw new Error('Failed to fetch location');
    }
    const locations = await response.json();
    return locations;
  },
);

export const deleteLocation = createAsyncThunk(
  'locations/deleteLocation',
  async (id: string, thunkAPI) => {
    const response = await authenticatedDelete(`${APP_API}/location/${id}`);
    if (!response.ok) {
      handleUnauthorized(response, thunkAPI);
      throw new Error('Failed to delete location with id ' + id);
    }
    thunkAPI.dispatch(deleteLocally(id));
    thunkAPI.dispatch(closeDeleteConfirmation());

    return id;
  },
);

export const addLocation = createAsyncThunk(
  'locations/addLocation',
  async (location: PartialLocation, thunkAPI) => {
    const response = await authenticatedPost(`${APP_API}/location`, location);
    if (!response.ok) {
      handleUnauthorized(response, thunkAPI);
      throw new Error('Failed to add location');
    }

    thunkAPI.dispatch(fetchLocations());
    thunkAPI.dispatch(close());

    return response;
  },
);

export const saveLocation = createAsyncThunk(
  'locations/saveLocation',
  async (location: Location, thunkAPI) => {
    const response = await authenticatedPut(
      `${APP_API}/creature/${location.id}`,
      location,
    );
    if (!response.ok) {
      handleUnauthorized(response, thunkAPI);
      throw new Error('Failed to save location');
    }
    thunkAPI.dispatch(updateLocally(location));
    thunkAPI.dispatch(close());

    return response;
  },
);

export const fetchLocationsController = (
  builder: ActionReducerMapBuilder<LocationState>,
) => {
  builder.addCase(fetchLocations.pending, state => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(
    fetchLocations.fulfilled,
    (state, action: PayloadAction<Location[]>) => {
      state.loading = false;
      state.entities = action.payload;
    },
  );
  builder.addCase(fetchLocations.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message || 'Failed to fetch location';
  });
};

export const deleteLocationController = (
  builder: ActionReducerMapBuilder<LocationState>,
) => {
  builder.addCase(deleteLocation.pending, state => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(deleteLocation.fulfilled, state => {
    state.loading = false;
  });
  builder.addCase(deleteLocation.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message || 'Failed to fetch location';
  });
};

export const addLocationController = (
  builder: ActionReducerMapBuilder<LocationState>,
) => {
  builder.addCase(addLocation.pending, state => {
    state.drawerLoading = true;
    state.error = null;
  });
  builder.addCase(addLocation.fulfilled, state => {
    state.drawerLoading = false;
  });
  builder.addCase(addLocation.rejected, (state, action) => {
    state.drawerLoading = false;
    state.error = action.error.message || 'Failed to add location';
  });
};

export const saveLocationController = (
  builder: ActionReducerMapBuilder<LocationState>,
) => {
  builder.addCase(saveLocation.pending, state => {
    state.drawerLoading = true;
    state.error = null;
  });
  builder.addCase(saveLocation.fulfilled, state => {
    state.drawerLoading = false;
  });
  builder.addCase(saveLocation.rejected, (state, action) => {
    state.drawerLoading = false;
    state.error = action.error.message || 'Failed to save location';
  });
};
