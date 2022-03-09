import {combineReducers, configureStore} from "@reduxjs/toolkit";
import counterReducer from './reducers/counter-slice'


const rootReducer = combineReducers({
    counterReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']