import { createSlice } from '@reduxjs/toolkit'

export const recipeSlice = createSlice({
    name: 'recipe',
    initialState: {
        favourites: []
    },
    reducers: {
        handleFavourite: (state, action) => {
            const inFavourite = state.favourites.find(item => item.recipe.label === action.payload.recipe.label);

            if (inFavourite) {
                const newState = state.favourites.filter(item => item.recipe.label != action.payload.recipe.label);
                state.favourites = [...newState];
            } else {
                state.favourites = [...state.favourites, action.payload]
            }
        }
    }
})

// Action creators are generated for each case reducer function
export const { handleFavourite } = recipeSlice.actions

export default recipeSlice.reducer