const pokemonDetail = document.getElementById('background');

function getUrl() {
    const url = window.location.search;
    const params = new URLSearchParams(url);
    const id = params.get('id');
    return id;
}

function loadPokemon() {
    pokeApi.getPokemonAdvancedDetails(getUrl()).then((pokemon = []) => {
        const newHtml = pokemon.map((pokemon) => `
        <p>${pokemon.type}</p>
        <p>${pokemon.name}</p>
        <p>${pokemon.abilities.join(', ')}</p>
        //imprimir aqui
        `).join('') //junta elementos de um array em uma string, sem separação
        pokemonDetail.innerHTML += newHtml
    })
}

loadPokemon();



