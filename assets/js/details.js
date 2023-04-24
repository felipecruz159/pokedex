const pokemonDetail = document.getElementById('detailsBackground');

function getUrl() {
    const url = window.location.search;
    const params = new URLSearchParams(url);
    const id = params.get('id');
    return id;
}

function loadPokemon() {
    pokeApi.getPokemonAdvancedDetails(getUrl()).then((pokemon = []) => {
        var newHtml = pokemon.map((pokemon) => `
        <p>${pokemon.name}</p>
        <p>#${pokemon.number}</p>
        <p>${pokemon.type}</p>
        <p>${pokemon.types.join(', ')}</p>
        <p>${pokemon.abilities.join(', ')}</p>
        `).join('') //junta elementos de um array em uma string, sem separação

        pokemon.map((pokemon) => {
            pokemonDetail.classList.add(pokemon.type)
            for (let stat in pokemon.pokeStats) {
                newHtml += `<p>${stat}: ${pokemon.pokeStats[stat]}</p>`;
            }
        })

        pokemonDetail.innerHTML += newHtml


    })
}

loadPokemon();



