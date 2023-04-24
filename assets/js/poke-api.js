const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.number}.png`

    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight
    pokemon.abilities = pokeDetail.abilities.map((abilities) => abilities.ability.name)

    pokemon.stats = pokeDetail.stats.map((stats) => stats.base_stat)
    pokemon.statsName = pokeDetail.stats.map((stats) => stats.stat.name)
    pokemon.pokeStats = Object.fromEntries(pokemon.statsName.map((element, index) => [element, pokemon.stats[index]]))
    

    console.log(pokemon.pokeStats)
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json()) // converte a response para json
    .then(convertPokeApiDetailToPokemon) 
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return  fetch(url)
        .then((response) => response.json()) // pega a resposta e transforma em json
        .then((jsonBody) => jsonBody.results) // especifica que quer os resultados
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // detalhes do pokemon
        .then((detailRequests) => Promise.all(detailRequests)) //esperando que todas as requisicoes terminem
        .then((pokemonDetails) => pokemonDetails) //retorna os pokemons com detalhes
}

pokeApi.getPokemonAdvancedDetails = (pokemonId) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    return fetch(url)
    .then((response) => response.json())
    .then((data) => Promise.all([
        convertPokeApiDetailToPokemon(data),
    ]))
}

