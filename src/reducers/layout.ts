import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface initialType {
    header: boolean
    name: string
}

const initialState: initialType = {
    header: true,
    name: ''
}

export const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        header_on: (state) => {
            state.header = true
        },
        header_off: (state) => {
            state.header = false
        },
        set_name: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        }
    }
})

export const layoutActions = layoutSlice.actions

export default layoutSlice.reducer