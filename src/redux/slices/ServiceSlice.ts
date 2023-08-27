import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { IService, IUpdateProps } from "../../interfaces";
import { db } from "../../firebase";

const initialState = {
  loading: false,
  services: [] as IService[],
  detailService: {} as IService,
};

const ServiceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setDetailService: (state, action: PayloadAction<IService>) => {
      state.detailService = action.payload;
    },
  },
  extraReducers: (builder) => {
    const setLoading = (state: typeof initialState) => {
      state.loading = true;
    };

    const clearLoading = (state: typeof initialState) => {
      state.loading = false;
    };

    builder
      .addCase(fetchAllService.pending, setLoading)
      .addCase(fetchAllService.fulfilled, (state, action) => {
        clearLoading(state);
        state.services = action.payload;
      })
      .addCase(fetchAllService.rejected, clearLoading)
      .addCase(addService.pending, setLoading)
      .addCase(addService.fulfilled, clearLoading)
      .addCase(addService.rejected, clearLoading)
      .addCase(updateService.pending, setLoading)
      .addCase(updateService.fulfilled, clearLoading)
      .addCase(updateService.rejected, clearLoading);
  },
});

export const fetchAllService = createAsyncThunk("fetAllService", async () => {
  let data: IService[] = [];
  const querySnapshot = await getDocs(collection(db, "services"));
  querySnapshot.forEach((doc) => {
    data.push({ _id: doc.id, key: doc.id, ...doc.data() } as IService);
  });
  return data.sort((a, b) => a.serviceCode.localeCompare(b.serviceCode));
});

export const checkServiceCode = createAsyncThunk(
  "checkServiceCode",
  async (serviceCode: string) => {
    let data = false;
    const querySnapshot = await getDocs(collection(db, "services"));
    querySnapshot.forEach((doc) => {
      if (doc.data().serviceCode === serviceCode) data = true;
    });
    return data;
  }
);

export const addService = createAsyncThunk(
  "addService",
  async (service: IService) => {
    let res;
    try {
      const ref = await addDoc(collection(db, "services"), {
        ...service,
      });
      res = ref.id;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    return res;
  }
);

export const updateService = createAsyncThunk(
  "updateService",
  async ({ id, payload }: IUpdateProps) => {
    let res;
    try {
      const ref = doc(db, "services", id);
      await updateDoc(ref, { ...payload });
      res = true;
    } catch (error) {
      console.log(error);
      res = false;
    }
    return res;
  }
);

export default ServiceSlice;
