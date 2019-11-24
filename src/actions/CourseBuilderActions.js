import axios from 'axios';

export const FETCH_POKEMON_START = 'FETCH_POKEMON_START';
export const FETCH_POKEMON_SUCCESS = 'FETCH_POKEMON_SUCCESS';
export const FETCH_POKEMON_FAIL = 'FETCH_POKEMON_FAIL';
export const FETCH_POKEMON_COMPLETED = 'FETCH_POKEMON_COMPLETED';
export const CATCH_POKEMON = 'CATCH_POKEMON';
export const UPDATE_COUNT = 'UPDATE_COUNT';
export const DISPLAY_TOGGLE = 'DISPLAY_TOGGLE';

export const getPokemon = () => dispatch => {
    //console.log('getPokemon firing');
    dispatch({ type: FETCH_POKEMON_START, payload: null });
    for (let i = 1; i < 152; i++){
        axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then(res =>{
            //console.log('axios: fetched: ', i, res.data.name);
            let pokemon = {
                id: res.data.id,
                name: res.data.name,
                type: res.data.types[0].type.name,
                imgUrl: res.data.sprites.front_default,
                caught: false,
            };
        dispatch({ type: FETCH_POKEMON_SUCCESS, payload: pokemon })
        })
        .catch(err => {dispatch({ type: FETCH_POKEMON_FAIL, payload: err }); console.log('CATCH ERROR ON: ', i) });
    }
};

export const checkComplete = () => {
        return { type: FETCH_POKEMON_COMPLETED, payload: null} ;
}

export const catchPokemon = (poke) => {
        return { type: CATCH_POKEMON, payload: poke} ;
}

export const updateCount = (count) => {
    return { type: UPDATE_COUNT, payload: count} ;
}

export const displayToggle = (filterType) => {
    //console.log('displayToggle action: ', filterType);
    return { type: DISPLAY_TOGGLE, payload: filterType} ;
}