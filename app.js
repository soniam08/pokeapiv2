// Función para obtener un Pokémon por ID o nombre
async function getPokemon(idOrName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
    const data = await response.json();
    return data;
}

function createCard(pokemon) {
    const nombre = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const imagen = pokemon.sprites.front_default;
    const altura = pokemon.height / 10;
    const peso = pokemon.weight / 10;
    const tipos = pokemon.types.map(t => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)).join(', ');
    const pastelTipos = {
        normal:   "#f8f3e1",
        fire:     "#ffd7b5",
        water:    "#bae5f9",
        electric: "#fff1b6",
        grass:    "#cafadf",
        ice:      "#def1fa",
        fighting: "#fad2c4",
        poison:   "#e4c3fb",
        ground:   "#ffe1aa",
        flying:   "#e9f8ff",
        psychic:  "#ffd3ee",
        bug:      "#e5fcb5",
        rock:     "#f5e1b9",
        ghost:    "#e4defc",
        dragon:   "#d1c2fe",
        dark:     "#e5dbe7",
        steel:    "#e3ecf7",
        fairy:    "#ffd9ef"
    };
    const tipoPrincipal = pokemon.types[0].type.name;
    let fondoColor = pastelTipos[tipoPrincipal] || "#ffeaf7";
    if (pokemon.types.length > 1) {
        const tipoSecundario = pokemon.types[1].type.name;
        const color2 = pastelTipos[tipoSecundario] || "#ffeaf7";
        if (tipoSecundario !== tipoPrincipal) {
            fondoColor = `linear-gradient(120deg, ${pastelTipos[tipoPrincipal]} 49%, ${color2} 51%)`;
        }
    }
    const card = document.createElement('div');
    card.className = 'card';
    card.style.background = fondoColor;
    const img = document.createElement('img');
    img.src = imagen;
    img.alt = nombre;
    const h3 = document.createElement('h3');
    h3.textContent = nombre;
    const pAltura = document.createElement('p');
    pAltura.textContent = `Altura: ${altura} m`;
    const pPeso = document.createElement('p');
    pPeso.textContent = `Peso: ${peso} kg`;
    const pTipo = document.createElement('p');
    pTipo.textContent = `Tipo: ${tipos}`;
    card.appendChild(img);
    card.appendChild(h3);
    card.appendChild(pAltura);
    card.appendChild(pPeso);
    card.appendChild(pTipo);
    const contenedor = document.querySelector('.contenedor');
    contenedor.appendChild(card);
}

function limpiarContenedor() {
    const contenedor = document.querySelector('.contenedor');
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
}

async function mostrarPrimeros151() {
    limpiarContenedor();
    const promesas = [];
    for (let id = 1; id <= 151; id++) {
        promesas.push(getPokemon(id));
    }
    const pokemons = await Promise.all(promesas);
    pokemons.forEach(poke => {
        if (poke) createCard(poke);
    });
}

let inicio = 152;
const cantidadPorLote = 10;

async function mostrarLotePokemons() {
    const promesas = [];
    for (let id = inicio; id < inicio + cantidadPorLote; id++) {
        promesas.push(getPokemon(id));
    }
    const pokemons = await Promise.all(promesas);
    pokemons.forEach(poke => {
        if (poke) createCard(poke);
    });
    inicio += cantidadPorLote;
}

async function buscarPokemonPorNombre(nombre) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`);
        if (!response.ok) throw new Error('Pokemon no encontrado :c');
        const data = await response.json();
        return data;
    } catch (error) {
        return null;
    }
}

const evolucionesEevee = [
    'eevee', 'vaporeon', 'jolteon', 'flareon', 'espeon',
    'umbreon', 'leafeon', 'glaceon', 'sylveon'
];
async function mostrarEvolucionesEevee() {
    limpiarContenedor();
    const promesas = evolucionesEevee.map(nombre => getPokemon(nombre));
    const pokemons = await Promise.all(promesas);
    pokemons.forEach(poke => {
        if (poke) createCard(poke);
    });
}

const pokemonsFavoritos = [
    'togepi', 'vulpix', 'bellossom', 'pachirisu', 'azurill'
];
async function mostrarPokemonsFavoritos() {
    limpiarContenedor();
    const promesas = pokemonsFavoritos.map(nombre => getPokemon(nombre));
    const pokemons = await Promise.all(promesas);
    pokemons.forEach(poke => {
        if (poke) createCard(poke);
    });
}

const pokemonsGatos = [
    52,     
    53,     
    677,  
    678,    
    431,   
    432,    
    509,    
    510,    
    725,    
    726,    
    727,    
    403,    
    404,    
    405,   
    807,    
    903,    
    243,    
    791    
];
async function mostrarPokemonsGatos() {
    limpiarContenedor();
    const promesas = pokemonsGatos.map(nombre => getPokemon(nombre));
    const pokemons = await Promise.all(promesas);
    pokemons.forEach(poke => {
        if (poke) createCard(poke);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarPrimeros151();

    document.getElementById("boton").addEventListener("click", mostrarLotePokemons);

    document.getElementById("botonbusqueda").addEventListener("click", async () => {
        const input = document.getElementById("buscador");
        const nombre = input.value.trim();
        if (nombre === "") {
            console.log("El campo está vacío");
            return;
        }
        limpiarContenedor();
        const pokemon = await buscarPokemonPorNombre(nombre);
        if (pokemon) {
            createCard(pokemon);
        } else {
            alert("Pokémon no encontrado :c");
        }
        input.value = "";
    });

    // Botón Eevee y evoluciones
    const botonBuscar = document.getElementById('botonbusqueda');
    const botonEevee = document.createElement('button');
    botonEevee.textContent = 'Eeveelutions';
    botonEevee.className = 'boton-principal';
    botonEevee.style.marginLeft = '10px';
    botonBuscar.parentNode.insertBefore(botonEevee, botonBuscar.nextSibling);
    botonEevee.addEventListener('click', mostrarEvolucionesEevee);

    // Botón favoritos
    const botonFavoritos = document.createElement('button');
    botonFavoritos.textContent = 'Mis Favoritos';
    botonFavoritos.className = 'boton-principal';
    botonFavoritos.style.marginLeft = '10px';
    botonEevee.parentNode.insertBefore(botonFavoritos, botonEevee.nextSibling);
    botonFavoritos.addEventListener('click', mostrarPokemonsFavoritos);

    // Botón gatos
    const botonGatos = document.createElement('button');
    botonGatos.textContent = 'Gatos';
    botonGatos.className = 'boton-principal';
    botonGatos.style.marginLeft = '10px';
    botonFavoritos.parentNode.insertBefore(botonGatos, botonFavoritos.nextSibling);
    botonGatos.addEventListener('click', mostrarPokemonsGatos);
});