import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPortfolioData = createAsyncThunk(
  'portfolio/fetchPortfolioData',
  async ({ startDate, endDate, startingBalance }, { rejectWithValue }) => {
    try {
      const dataUrl = process.env.REACT_APP_API_URL + '/data';
      const response = await fetch(dataUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          start_date: startDate,
          end_date: endDate,
          starting_balance: startingBalance
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch portfolio data');
      }
      
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchReturnsData = createAsyncThunk(
  'portfolio/fetchReturnsData',
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      const returnsUrl = process.env.REACT_APP_API_URL + `/returns?start_date=${startDate}&end_date=${endDate}`;
      const response = await fetch(returnsUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch returns data');
      }
      
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: {
    dashboard: false,
    landing: true,
    error: false,
    dataRec: false,
    balanceData: [],
    esData: [],
    allocationsData: [],
    spData: [],
    ratios: {
      information: 0,
      trenor: 0,
      sharpe: 0
    },
    selectedMonth: "Jan",
    monthChosen: false,
    data: {
      pieData: [],
      lineData: [],
      tableData: [],
      balance: 0,
      shortfall: 0
    },
    showGranularLineGraphModal: false,
    returnsData: {},
    showRatiosTooltip: false,
  },
  reducers: {
    // App-level actions
    setDashboard: (state, action) => {
      state.dashboard = action.payload;
    },
    setLanding: (state, action) => {
      state.landing = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setDataRec: (state, action) => {
      state.dataRec = action.payload;
    },
    setBalanceData: (state, action) => {
      state.balanceData = action.payload;
      state.dataRec = true;
    },
    setEsData: (state, action) => {
      state.esData = action.payload;
    },
    setAllocationsData: (state, action) => {
      state.allocationsData = action.payload;
    },
    setSpData: (state, action) => {
      state.spData = action.payload;
    },
    setRatios: (state, action) => {
      state.ratios = action.payload;
    },
    setSelectedMonth: (state, action) => {
      state.selectedMonth = action.payload;
    },
    setMonthChosen: (state, action) => {
      state.monthChosen = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setShowGranularLineGraphModal: (state, action) => {
      state.showGranularLineGraphModal = action.payload;
    },
    setReturnsData: (state, action) => {
      state.returnsData = action.payload;
    },
    setShowRatiosTooltip: (state, action) => {
      state.showRatiosTooltip = action.payload;
    },
  },
});

export const {
  setDashboard,
  setLanding,
  setError,
  setDataRec,
  setBalanceData,
  setEsData,
  setAllocationsData,
  setSpData,
  setRatios,
  setSelectedMonth,
  setMonthChosen,
  setData,
  setShowGranularLineGraphModal,
  setReturnsData,
  setShowRatiosTooltip,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;
