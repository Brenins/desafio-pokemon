const fetchPokemon = () =>{
    
    var pesquisa = document.getElementById("txtBusca").value;
    pesquisa.toString;

    const getPokemonUrl = name => `https://pokeapi.co/api/v2/pokemon/${name}`

    const pokemonPromises = []

    pokemonPromises.push(fetch(getPokemonUrl(pesquisa)).then(response => response.json()))
    console.log("batata")
    Promise.all(pokemonPromises)
        .then(pokemons =>{
            const lisPokemons = pokemons.reduce((accumulator, pokemon)=>{
                const types = pokemon.types.map(typeInfo => typeInfo.type.name)
                accumulator += `
                    <li class="card">
                    <img class="card-img ${types[0]} " alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png">
                        <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                        <p class="card-subtitle">${types.join('|')}</p>
                        <button class="btn btn-primary" type="button" id="captura" onclick="capturar('${pokemon.name}')">Capturar</button>
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