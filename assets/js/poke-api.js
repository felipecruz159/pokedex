const pokeApi = {}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url).then((response) => response.json()) // converte a response para json
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return  fetch(url)
        .then((response) => response.json()) // pega a resposta e transforma em json
        .then((jsonBody) => jsonBody.results) // especifica que quer os resultados
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // detalhes do pokemon
        .then((detailRequests) => Promise.all(detailRequests)) //esperando que todas as requisicoes terminem
        .then((pokemonDetails) => pokemonDetails) //retorna os pokemons com detalhes
}

