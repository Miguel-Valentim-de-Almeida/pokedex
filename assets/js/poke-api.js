const pokeApi = {}

function converterPokeApiDetailParaPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(converterPokeApiDetailParaPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {  // Isso é uma arrow function. É uma função normal só que declarada de outro jeito, em uma sintaxe mais reduzida.
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results) //then é quando dá certo. Os then's subsequentes terão como argumento o retorno dos then's anteriores.
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => pokemonDetails)
        .catch((error) => console.error(error)) //catch é caso dê erro.
}
