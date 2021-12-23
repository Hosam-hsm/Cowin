import {createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DistrictsReturnData, SlotByDistrictReturnData, SlotByPincodeReturnData, StatesReturnData } from '../../../types/DataTypes'

export interface SlotState {}

const initialState: SlotState = {}

export const fetchDistricts = createAsyncThunk<
DistrictsReturnData,
{state_id:number}
>(
    'slot/fetchDistricts',
    async ({state_id}) => {
        const response = await fetch(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${state_id}`)
        return (await response.json()) as DistrictsReturnData
    }
)

export const fetchStates = createAsyncThunk<
StatesReturnData,
undefined
>(
    'slot/fetchStates',
    async () => {
        const response = await fetch(`https://cdndemo-api.co-vin.in/api/v2/admin/location/states`)
        return (await response.json()) as StatesReturnData
    }
)

export const fetchSlotsByDistrict = createAsyncThunk<
SlotByDistrictReturnData,
{district_id:number,date:string}
>(
    'slot/fetchSlotsByPincode',
    async (data) => {
        const {district_id,date}=data
        const response = await fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${district_id}&date=${date}`)
        return (await response.json()) as SlotByDistrictReturnData
    }
)

export const fetchSlotsByPincode = createAsyncThunk<
SlotByPincodeReturnData,
{pincode:string,date:string}
>(
    'slot/fetchSlotsByPincode',
    async (data) => {
        const {pincode,date}=data
        const response = await fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${date}`)
        return (await response.json()) as SlotByPincodeReturnData
    }
)

const slotSlice = createSlice({
  name: 'slot',
  initialState,
  reducers: {
  },
})

const { actions, reducer } = slotSlice
export const {} = actions
export default reducer