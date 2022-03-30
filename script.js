const fetchPokemon = () =>{
    
    var pesquisa = document.getElementById("txtBusca").value;
    pesquisa.toString;

    const getPokemonUrl = name => `https://pokeapi.co/api/v2/pokemon/${name}`

    const pokemonPromises = []

    pokemonPromises.push(fetch(getPokemonUrl(pesquisa)).then(response => response.json()))
    console.log(pokemonPromises)
    Promise.all(pokemonPromises)
        .then(pokemons =>{
            const lisPokemons = pokemons.reduce((accumulator, pokemon)=>{
            const types = pokemon.types.map(typeInfo => typeInfo.type.name);
            const habilidade = pokemon.abilities.map(abilitiesInfo => abilitiesInfo.ability.name)
            console.log(habilidade)
            
                accumulator += `
                    <li class="card">
                        <img class="card-img ${types[0]} " alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png">
                        <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                        <h4 class="card-subtitle">
                            Tipo: ${types.join('|')}</h4>
                        <h5 class="card-subtitle">Habilidades: ${habilidade.join(' | ')}</h5>
                        <button class="btn btn-primary border-0 rounded-pill" type="button" id="captura" onclick="capturar('${pokemon.name}')">Capturar</button>
                    </li>
                `
                return accumulator
            }, '')

            const ul = document.querySelector('[data-js="pokedex"]')

            ul.innerHTML = lisPokemons
        })

}


function reload(){
    location.reload();
}

function capturar(nomePokemon){
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: `Você capturou o ${nomePokemon}`,
        showConfirmButton: false,
        timer: 1500
      })
}