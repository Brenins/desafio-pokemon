//Função principal que permite a conexao com a api atraves do metodo FETCH-API.
const fetchPokemon = () =>{
    
    var pesquisa = document.getElementById("txtBusca").value;
    pesquisa.toString;//Transforma o elemento da barrinha em string para que a api consiga ler normalmente.
    const getPokemonUrl = name => `https://pokeapi.co/api/v2/pokemon/${name}`;
    const pokemonPromises = [];

    //Retorno de dados via promessa de conexão pela api através do FETCH.
    pokemonPromises.push(fetch(getPokemonUrl(pesquisa)).then(response => response.json()))
    console.log(pokemonPromises) //Log de apoio para pesquisa de dados no console.

    Promise.all(pokemonPromises)
        .then(pokemons =>{
            const lisPokemons = pokemons.reduce((accumulator, pokemon)=>{
            const types = pokemon.types.map(typeInfo => typeInfo.type.name); //Array trazido da api pela funcio MAP, funcionando tipo While.
            const habilidade = pokemon.abilities.map(abilitiesInfo => abilitiesInfo.ability.name);
            const status = pokemon.stats.map(statusInfo => statusInfo.base_stat);
                accumulator += `
                    <li class="card shadow-lg">
                        <img class="card-image ${types[0]} " alt="${pokemon.name}" 
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png">
                        <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                        <h5 class="card-subtitle ${types[0]} shadow-lg">
                            Tipo: ${types.join('|')}
                            <br/>
                            Habilidades: ${habilidade.join(' | ')}
                            <br/>
                            HP: +${status[0]}
                            <br/>
                            Ataque: ${status[1]}
                            <br/>
                            Defesa: ${status[2]}
                            <br/>
                            Velocidade: ${status[5]}Km/h
                            </h5>


                        <div class="tamanho2">
                            <button class="btn btn-success 
                            border-0 rounded-pill shadow-lg t3" 
                            type="button" id="captura" 
                            onclick="capturar('${pokemon.name}')">Capturar</button>
                            <br>
                            <button class="btn btn-primary 
                            border-0 rounded-pill 
                            shadow-lg t3" type="button" id="evoluir"') 
                            onclick="erroEvolucao()">Evoluir</button>
                        </div>
                        <br>
                    </li>
                `
                return accumulator
            }, '')
            const ul = document.querySelector('[data-js="pokedex"]')
            ul.innerHTML = lisPokemons
        })
}



function salvar(){
    var novaListaPokemon = document.getElementById("txtBusca").value;

    if(localStorage.getItem('pokemons') == null){
        localStorage.setItem('pokemons','[]');
    }

    var antigaLisPokemon = JSON.parse(localStorage.getItem('pokemons'));
    antigaLisPokemon.push(novaListaPokemon);
    localStorage.setItem('pokemons',JSON.stringify(antigaLisPokemon));

    const pull=JSON.parse(localStorage.getItem('pokemons','[]'))
   reload(pull[3]);
}






//função de reload teste.
function reload(batata){
    alert(batata)
}

//Menuzinho de aviso de captura do pokemon.
function capturar(nomePokemon){
    Swal.fire({ position: 'center',icon: 'success',
    title: `Você capturou o ${nomePokemon}`,showConfirmButton: false,timer: 1500})
    salvar();
}

function erroEvolucao(){
    Swal.fire({position: 'center',icon: 'error',
        title: `Função não disponivel no momento!!!`,
        showConfirmButton: false,timer: 2000})
}