//Função principal que permite a conexao com a api atraves do metodo FETCH-API.
const fetchPokemon = () =>{
    
    var pesquisa = document.getElementById("txtBusca").value;
    pesquisa.toString;//Transforma o elemento da barrinha em string para que a api consiga ler normalmente.
    const getPokemonUrl = name => `https://pokeapi.co/api/v2/pokemon/${name}`;
    const pokemonPromises = [];

    //Retorno de dados via promessa de conexão pela api através do FETCH.
    pokemonPromises.push(fetch(getPokemonUrl(pesquisa)).then(response => response.json()))
    
    Promise.all(pokemonPromises)
        .then(pokemons =>{
            const lisPokemons = pokemons.reduce((accumulator, pokemon)=>{
            const types = pokemon.types.map(typeInfo => typeInfo.type.name); //Array trazido da api pela funcio MAP, funcionando tipo While.
            const habilidade = pokemon.abilities.map(abilitiesInfo => abilitiesInfo.ability.name);
            const status = pokemon.stats.map(statusInfo => statusInfo.base_stat);
                accumulator += `
                    <li class="card ${types[0]} shadow-lg">
                        <h5 class="card-title">N°${pokemon.id} - ${pokemon.name}</h5>
                        <img class="card-image ${types[0]} " alt="${pokemon.name}" 
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png">
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


const fetchCapturados = () =>{
    const getPokemonUrl = name =>`https://pokeapi.co/api/v2/pokemon/${name}`;

    const capturadosPromises = []
    const pull=JSON.parse(localStorage.getItem('pokemons','[]'))
    
    for( let i = 0; i < pull.length; i++){
        var nome = pull[i];
        nome.toString;
        capturadosPromises.push(fetch(getPokemonUrl(nome)).then(response => response.json()))
    }
    Promise.all(capturadosPromises)
        .then(capturados =>{
            var lisCapturados = capturados.reduce((accumulator, capturados)=>{
                const types = capturados.types.map(typeInfo => typeInfo.type.name)
                var numero = contador();
                var nome = capturados.name;
                accumulator += `<li class="card ${types[0]} shadow-lg">
                    <img class="card-image  alt="${capturados.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${capturados.id}.png" />
                    <h2 class="card-title">N°${numero}  ${capturados.name}</h2>
                    <button class="btn btn-light border-0 
                    rounded-pill shadow 
                    bg-primary p-2 text-white bg-opacity-75" 
                    type="button" 
                    id="liberar" onclick="liberar('${capturados.name}')">Libertar</button>
                    <br>
                    <li>`
                return accumulator
            }, '')
            const ul = document.querySelector('[data-js="pokedex"]')
            ul.innerHTML = lisCapturados;
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


}


var num = 0;
function contador(){
    num++;
    return num;
}

function liberar(nome){
    const pull= JSON.parse(localStorage.getItem('pokemons',''))
    const listaAtual = [];

    const novaLista = []
    for( let i = 0; i < pull.length; i++){
        listaAtual.push(pull[i]);
    }
    console.log("atual", listaAtual)
    var indice = listaAtual.indexOf(nome);
    listaAtual.splice(indice, 1);
    localStorage.removeItem('pokemons');
    
    if(localStorage.getItem('pokemons') == null){
        localStorage.setItem('pokemons','');
        localStorage.setItem('pokemons',JSON.stringify(listaAtual));
    }

    fetchCapturados();
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