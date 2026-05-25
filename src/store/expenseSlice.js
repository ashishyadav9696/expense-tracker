import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Per-user localStorage key
const userKey = (username) => `internspark_expenses_${username}`;

const load = (username) => {
  try { return JSON.parse(localStorage.getItem(userKey(username))) || []; }
  catch { return []; }
};

const save = (username, items) => {
  localStorage.setItem(userKey(username), JSON.stringify(items));
};

export const fetchExpenses = createAsyncThunk('expenses/fetch', async (username) => {
  return load(username);
});

export const createExpense = createAsyncThunk('expenses/create', async ({ username, data }) => {
  const items = load(username);
  const item = { ...data, id: Date.now().toString(), createdAt: new Date().toISOString() };
  const updated = [item, ...items];
  save(username, updated);
  return item;
});

export const updateExpense = createAsyncThunk('expenses/update', async ({ username, id, data }) => {
  const items = load(username);
  const updated = items.map(i => i.id === id ? { ...i, ...data } : i);
  save(username, updated);
  return { id, data };
});

export const deleteExpense = createAsyncThunk('expenses/delete', async ({ username, id }) => {
  const items = load(username);
  save(username, items.filter(i => i.id !== id));
  return id;
});

const slice = createSlice({
  name: 'expenses',
  initialState: {
    items: [],
    loading: false,
    currentUser: typeof window !== 'undefined' ? sessionStorage.getItem('is_user') || '' : ''
  },
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    clearExpenses(state) {
      state.items = [];
      state.currentUser = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (s) => { s.loading = true; })
      .addCase(fetchExpenses.fulfilled, (s, a) => { s.loading = false; s.items = a.payload; })
      .addCase(createExpense.fulfilled, (s, a) => { s.items = [a.payload, ...s.items]; })
      .addCase(updateExpense.fulfilled, (s, a) => {
        const { id, data } = a.payload;
        s.items = s.items.map(i => i.id === id ? { ...i, ...data } : i);
      })
      .addCase(deleteExpense.fulfilled, (s, a) => {
        s.items = s.items.filter(i => i.id !== a.payload);
      });
  }
});

export const { setCurrentUser, clearExpenses } = slice.actions;
export default slice.reducer;
