// features/imageUpload/imageUploadSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ImageState {
  file: File | null;
  previewUrl: string | null;
  publicIdToDelete: string | null;
  status: 'idle' | 'uploading' | 'deleting' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ImageState = {
  file: null,
  previewUrl: null,
  publicIdToDelete: null,
  status: 'idle',
  error: null,
};

export const imageUploadSlice = createSlice({
  name: 'imageUpload',
  initialState,
  reducers: {
    setImageFile: (state, action: PayloadAction<File>) => {
      state.file = action.payload;
      state.previewUrl = URL.createObjectURL(action.payload);
      state.status = 'idle';
    },
    setPublicIdToDelete: (state, action: PayloadAction<string>) => {
      state.publicIdToDelete = action.payload;
      state.previewUrl = null;
      state.status = 'idle';
    },
    clearImageState: (state) => {
      if (state.previewUrl) URL.revokeObjectURL(state.previewUrl);
      return initialState;
    },
    setUploadStatus: (
      state,
      action: PayloadAction<'idle' | 'uploading' | 'deleting' | 'succeeded' | 'failed'>
    ) => {
      state.status = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setImageFile,
  setPublicIdToDelete,
  clearImageState,
  setUploadStatus,
  setError,
} = imageUploadSlice.actions;

export default imageUploadSlice.reducer;