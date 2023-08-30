import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { IUpdateProps, IUser } from "../../interfaces";
import { db } from "../../firebase";

const initialState = {
  loading: false,
  users: [] as IUser[],
  currentUser: undefined as IUser | undefined,
  userUpdate: {} as IUser,
};

const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserUpdate: (state, action: PayloadAction<IUser>) => {
      state.userUpdate = { ...action.payload };
    },
  },
  extraReducers: (builder) => {
    const setLoading = (state: typeof initialState) => {
      state.loading = true;
    };

    const resetLoading = (state: typeof initialState) => {
      state.loading = false;
    };

    builder
      .addCase(SignIn.pending, setLoading)
      .addCase(SignIn.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(SignIn.rejected, (state) => {
        state.loading = false;
        state.currentUser = undefined;
      })
      .addCase(fetchAllUsers.pending, setLoading)
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, resetLoading)
      .addCase(CheckEmailExists.pending, setLoading)
      .addCase(CheckEmailExists.fulfilled, resetLoading)
      .addCase(CheckEmailExists.rejected, resetLoading)
      .addCase(addUser.pending, setLoading)
      .addCase(addUser.fulfilled, resetLoading)
      .addCase(addUser.rejected, resetLoading)
      .addCase(updateUser.pending, setLoading)
      .addCase(updateUser.fulfilled, resetLoading)
      .addCase(updateUser.rejected, resetLoading);
  },
});

export const SignIn = createAsyncThunk(
  "SignIn",
  async ({ userName, password }: IUser) => {
    let data;
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      if (doc.data().userName === userName && doc.data().password === password)
        data = doc.data();
    });
    return data;
  }
);

export const CheckEmailExists = createAsyncThunk(
  "CheckEmailExists",
  async (email: string) => {
    let data;
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      if (doc.data().email === email) data = { _id: doc.id, ...doc.data() };
    });
    return data;
  }
);

export const fetchAllUsers = createAsyncThunk("fetchAllUsers", async () => {
  let data: IUser[] = [];
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    data.push({ _id: doc.id, key: doc.id, ...doc.data() } as IUser);
  });
  return data.sort((a, b) => a.displayName.localeCompare(b.displayName));
});

export const addUser = createAsyncThunk("addUser", async (user: IUser) => {
  let res;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const docRef = await addDoc(collection(db, "users"), { ...user });
    res = "success";
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  return res;
});

export const updateUser = createAsyncThunk(
  "updateUser",
  async ({ id, payload }: IUpdateProps) => {
    let res: boolean = true;
    try {
      const userRef = doc(db, "users", id);
      await updateDoc(userRef, { ...payload });
      res = true;
    } catch (error) {
      res = false;
    }
    return res;
  }
);

export default UserSlice;

