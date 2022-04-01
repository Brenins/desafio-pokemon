const fetchCapturados = () =>{
    const getPokemonUrl = name =>`https://pokeapi.co/api/v2/pokemon/${name}`;

    const capturadosPromises = []

   for (let i = 1; i <= 150; 1++){
        capturadosPromises.push(fetch(getPokemonUrl(i)).then(response => response.jason()))
    }
    Promise.all(capturadosPromises)
        .then(capturados =>{
            const lisCapturados = capturados.reduce((accumulator, pokemon)=>{
                const tipos = capturados.types.map(typeInfo => typeInfo.type.name)
                accumulator += `<li class="card ${tipos[0]}">
                    <img class="card-image  alt="${capturados.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${capturados.id}.png" />
                    <h2 class="card-title">${capturados.id}. ${capturados.name}</h2>
                    <p class="card-subtitle">${types.join(' | ')}</p>
                    <li>`
                return accumulator
            }, '')
            const ul = document.querySelector('[data-js="pokedex"]')
            ul.innerHTML = lisCapturados;
        })
}