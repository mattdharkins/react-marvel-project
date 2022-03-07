import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
    name: 'root',
    initialState: {
        name: 'Iron Man',
        identity_name: "Tony Stark",
        image_url: "https://www.seekpng.com/png/detail/774-7746071_iron-man-comics-superhero-character-cartoon-hero-iron.png",
        abilities: 'Genius level intellect, Proficient scientist and engineer, Powered armor suit: Superhuman strength, speed, durability, agility, reflexes, and senses; Supersonic flight; Energy repulsor and missile projection; Regenerative life support',
        sub_universe: 'Iron Man',
        movie_appearances: 'Iron Man, Iron Man 2, Iron Man 3, The Avengers, Avengers: Age of Ultron, Captain America Civil War, Avengers: Infinity War, Avengers: Endgame',
        tv_appearances: 'Iron Man, Iron Man: Armored Adventures'
    },
    reducers: {
        chooseName: (state, action) => { state.name = action.payload },
        chooseIdentityName: (state, action) => { state.identity_name = action.payload },
        chooseImageUrl: (state, action) => { state.image_url = action.payload },
        chooseAbilities: (state, action) => { state.abilities = action.payload },
        chooseSubUniverse: (state, action) => { state.sub_universe = action.payload },
        chooseMovieAppearances: (state, action) => { state.movie_appearances = action.payload },
        chooseTvAppearances: (state, action) => { state.tv_appearances = action.payload }  
    }
})

export const reducer = rootSlice.reducer;
export const { chooseName, chooseIdentityName, chooseImageUrl, chooseAbilities, chooseSubUniverse, 
    chooseMovieAppearances, chooseTvAppearances } = rootSlice.actions;