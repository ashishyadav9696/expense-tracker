import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const KEY = 'internspark_expenses';

const load = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; }
  catch { return []; }
};

const save = (items) => {
  localStorage.setItem(KEY, JSON.stringify(items));
};

export const fetchExpenses = createAsyncThunk('expenses/fetch', async () => {
  return load();
});

export const createExpense = createAsyncThunk('expenses/create', async (data) => {
  const items = load();
  const item = { ...data, id: Date.now().toString(), createdAt: new Date().toISOString() };
  const updated = [item, ...items];
  save(updated);
  return item;
});

export const updateExpense = createAsyncThunk('expenses/update', async ({ id, data }) => {
  const items = load();
  const updated = items.map(i => i.id === id ? { ...i, ...data } : i);
  save(updated);
  return { id, data };
});

export const deleteExpense = createAsyncThunk('expenses/delete', async (id) => {
  const items = load();
  save(items.filter(i => i.id !== id));
  return id;
});

const slice = createSlice({
  name: 'expenses',
  initialState: { items: [], loading: false },
  reducers: {},
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

export default slice.reducer;
