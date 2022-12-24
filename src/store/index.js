import { configureStore } from '@reduxjs/toolkit'
import recipeReducer from './recipeSlice'

export default configureStore({
    reducer: {
        recipe: recipeReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
})