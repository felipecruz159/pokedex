const pokemonDetail = document.getElementById('advancedDetails');

function getUrl() {
    const url = window.location.search;
    const params = new URLSearchParams(url);
    const id = params.get('id');
    return id;
}

function loadPokemon() {
    pokeApi.getPokemonAdvancedDetails(getUrl()).then((pokemon = []) => {
        pokemonDetail.classList.add(pokemon.type)
        
        function loadStats(){
            var statsHtml = '';

            pokemon.map((pokemon) => {
                for (let stat in pokemon.pokeStats) {
                    // statsHtml += `<p>${stat}: ${pokemon.pokeStats[stat]}</p>`;
                    statsHtml += `<p>${stat}:</p>`;
                    statsHtml += `<div class="progress">${pokemon.pokeStats[stat]} <progress class="progress-${pokemon.type} progress" value="${pokemon.pokeStats[stat]}" max="100"></progress></div>`;
                }
            })
            return statsHtml
        }

        const newHtml = pokemon.map((pokemon) => `
        <div id="detailsBackground" class="detailsBackground ${pokemon.type}">
            <div class="nav">
                <a href="index.html">
                    <img src="assets/images/arrow_back_white_24dp.svg" alt="return">
                </a>
            </div>
            <div class="pokemonInfo">
                <div>
                    <h1>${pokemon.name}</h1>
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                </div>
                <div>
                    <h4>#${pokemon.number}</h4>
                </div>
            </div>
            <div class="image">
                <img src="assets/images/pokeball.png" alt="pokeball" class="pokeball">
                <img src="${pokemon.photo}"
                alt="${pokemon.name}">
            </div>
        </div>
        <div class="detailsInfo">
            <div class="abilitiesSize">
                <div class="abilities">
                    <h3>Abilities</h3>
                    <p>${pokemon.abilities.join(', ')}</p>
                </div>
                <div class="size">
                    <h3>Height: </h3><p>${pokemon.height}</p>
                    <h3>Weight: </h3><p>${pokemon.weight}</p>
                </div>
            </div>
            <div class="stats">
                ${loadStats()}
            </div>
        </div>
        `)

        pokemonDetail.innerHTML += newHtml

        
    })
}



loadPokemon();



