import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { INumerical } from "../../interfaces";
import { db } from "../../firebase";

type increaseSTTProps = {
  id: string;
  value: number;
};

const initialState = {
  loading: false,
  numericalList: [] as INumerical[],
  detailNumerical: {} as INumerical,
};

const NumberSlice = createSlice({
  name: "numerical",
  initialState,
  reducers: {
    setDetailNumerical: (state, action: PayloadAction<INumerical>) => {
      state.detailNumerical = action.payload;
    },
  },
  extraReducers: (builder) => {
    const setLoading = (state: typeof initialState) => {
      state.loading = true;
    };

    const setError = (state: typeof initialState) => {
      state.loading = false;
    };

    builder
      .addCase(fetchAllNumerical.pending, setLoading)
      .addCase(fetchAllNumerical.fulfilled, (state, action) => {
        state.loading = false;
        state.numericalList = action.payload;
      })
      .addCase(fetchAllNumerical.rejected, setError)
      .addCase(addNumerical.pending, setLoading)
      .addCase(addNumerical.fulfilled, setError)
      .addCase(addNumerical.rejected, setError)
      .addCase(fetchNumericalByCode.pending, setLoading)
      .addCase(fetchNumericalByCode.fulfilled, (state, action) => {
        state.loading = false;
        state.numericalList = action.payload;
      })
      .addCase(fetchNumericalByCode.rejected, setError);
  },
});
const fetchDataFromDB = async (code: string | null = null) => {
  let data: INumerical[] = [];
  const querySnapshot = await getDocs(collection(db, "numerical"));

  querySnapshot.forEach((doc) => {
    const docData = {
      _id: doc.id,
      key: doc.id,
      ...doc.data(),
    } as INumerical;

    if (code === null || docData.serviceCode === code) {
      data.push(docData);
    }
  });

  return data.sort((a, b) => a.stt.localeCompare(b.stt));
};

export const fetchAllNumerical = createAsyncThunk(
  "fetAllNumerical",
  async () => {
    return fetchDataFromDB();
  }
);

export const fetchNumericalByCode = createAsyncThunk(
  "fetchNumericalByCode",
  async (code: string) => {
    return fetchDataFromDB(code);
  }
);

export const addNumerical = createAsyncThunk(
  "addNumerical",
  async (data: INumerical) => {
    let res;
    try {
      const ref = await addDoc(collection(db, "numerical"), {
        ...data,
      });
      res = ref.id;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    return res;
  }
);

export const fetchSTTById = createAsyncThunk(
  "fetchSTTById",
  async (id: string) => {
    const docRef = doc(db, "stt", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().value;
    } else {
      console.log("No such document!");
    }
  }
);

export const initializeSTT = createAsyncThunk(
  "addNewSTT",
  async (id: string) => {
    await setDoc(doc(db, "stt", id), { value: 1 });
  }
);

export const increaseSTT = createAsyncThunk(
  "increaseSTT",
  async ({ id, value }: increaseSTTProps) => {
    const ref = doc(db, "stt", id);
    await updateDoc(ref, { value });
  }
);

export default NumberSlice;
