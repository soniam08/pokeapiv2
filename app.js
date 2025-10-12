// Función para obtener un Pokémon por ID o nombre
async function getPokemon(idOrName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`); //Pide los datos de un pokemon especifico (id) o por nombre a la pokeapi
    const data = await response.json(); //cuando la funcion este lista crea un objeto (json) para trabajar con los datos en js
    return data; //devuelve los datos
}

// Crear la tarjeta del Pokémon y añadirla al contenedor usando appendChild
function createCard(pokemon) {
    const nombre = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1); //La inicial en mayús y el resto en minuscula
    const imagen = pokemon.sprites.front_default;  //Extrae la imagen
    const altura = pokemon.height / 10;
    const peso = pokemon.weight / 10;
    const tipos = pokemon.types.map(t => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)).join(', ');//Map crea un vector de los tipos y los separa con el join , si fuera mas de uno

    // Determinar color según el primer tipo
    let fondoColor = 'rgba(228, 186, 224, 1)'; // color por defecto
    const tipoPrincipal = pokemon.types[0].type.name;

    if (tipoPrincipal === 'normal') {
        fondoColor = "#C6C6A7";
    } else if (tipoPrincipal === 'fire') {
        fondoColor = "#F5AC78";
    } else if (tipoPrincipal === 'water') {
        fondoColor = "#9DB7F5";
    } else if (tipoPrincipal === 'electric') {
        fondoColor = "#FAE078";
    } else if (tipoPrincipal === 'grass') {
        fondoColor = "#A7DB8D";
    } else if (tipoPrincipal === 'ice') {
        fondoColor = "#BCE6E6";
    } else if (tipoPrincipal === 'fighting') {
        fondoColor = "#D67873";
    } else if (tipoPrincipal === 'poison') {
        fondoColor = "#C183C1";
    } else if (tipoPrincipal === 'ground') {
        fondoColor = "#EBD69D";
    } else if (tipoPrincipal === 'flying') {
        fondoColor = "#C6B7F5";
    } else if (tipoPrincipal === 'psychic') {
        fondoColor = "#FA92B2";
    } else if (tipoPrincipal === 'bug') {
        fondoColor = "#C6D16E";
    } else if (tipoPrincipal === 'rock') {
        fondoColor = "#D1C17D";
    } else if (tipoPrincipal === 'ghost') {
        fondoColor = "#A292BC";
    } else if (tipoPrincipal === 'dragon') {
        fondoColor = "#A27DFA";
    } else if (tipoPrincipal === 'dark') {
        fondoColor = "#A29288";
    } else if (tipoPrincipal === 'steel') {
        fondoColor = "#D1D1E0";
    } else if (tipoPrincipal === 'fairy') {
        fondoColor = "#F4BDC9";
    }

    // Crear elementos DOM
    const card = document.createElement('div');
    card.className = 'card';
    card.style.backgroundColor = fondoColor;

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

    // Añadir nodos al card
    card.appendChild(img);
    card.appendChild(h3);
    card.appendChild(pAltura);
    card.appendChild(pPeso);
    card.appendChild(pTipo);

    // Añadir card al contenedor
    const contenedor = document.querySelector('.contenedor');
    contenedor.appendChild(card);
}

// Función para limpiar el contenedor antes de nuevos resultados
function limpiarContenedor() {
    const contenedor = document.querySelector('.contenedor');
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
}

// Mostrar los primeros 151 Pokémon al cargar la página
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

// Funcionalidad del botón para cargar más Pokémon en lotes
let inicio = 152; // Comenzar a cargar más desde el 152
const cantidadPorLote = 10; // Cantidad de Pokémon a cargar por botón

async function mostrarLotePokemons() {
    const promesas = [];
    for (let id = inicio; id < inicio + cantidadPorLote; id++) {
        promesas.push(getPokemon(id));
    }
    const pokemons = await Promise.all(promesas);
    pokemons.forEach(poke => {
        if (poke) createCard(poke);
    });
    inicio += cantidadPorLote; // Actualiza el inicio para el siguiente lote
}

// Buscar Pokémon por nombre con manejo de errores
async function buscarPokemonPorNombre(nombre) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`);
        if (!response.ok) throw new Error('Pokemon no encontrado :c');
        const data = await response.json();
        return data;
    } catch (error) {
        return null;  // Pokémon no encontrado
    }
}

// Mostrar Eevee y sus evoluciones
const evolucionesEevee = [
    'eevee',
    'vaporeon',
    'jolteon',
    'flareon',
    'espeon',
    'umbreon',
    'leafeon',
    'glaceon',
    'sylveon'
];

async function mostrarEvolucionesEevee() {
    limpiarContenedor();
    const promesas = evolucionesEevee.map(nombre => getPokemon(nombre));
    const pokemons = await Promise.all(promesas);
    pokemons.forEach(poke => {
        if (poke) createCard(poke);
    });
}

// Mis Pokes fav
const pokemonsFavoritos = [
    'togepi',
    'vulpix',
    'bellossom',
    'pachirisu',
    'azurill'
];

async function mostrarPokemonsFavoritos() {
    limpiarContenedor();
    const promesas = pokemonsFavoritos.map(nombre => getPokemon(nombre));
    const pokemons = await Promise.all(promesas);
    pokemons.forEach(poke => {
        if (poke) createCard(poke);
    });
}

// Evento para botones y carga inicial
document.addEventListener('DOMContentLoaded', () => {
    // Mostrar los primeros 151 Pokémon al cargar la página
    mostrarPrimeros151();

    // Botón Cargar más
    document.getElementById("boton").addEventListener("click", mostrarLotePokemons);

    // Botón Buscar Pokémon
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

    // Crear y añadir botón para Eevee y evoluciones
    const botonBuscar = document.getElementById('botonbusqueda');
    const botonEevee = document.createElement('button');
    botonEevee.textContent = 'Mostrar Eevee y Evoluciones';
    botonEevee.className = 'boton-principal';
    botonEevee.style.marginLeft = '10px';
    botonBuscar.parentNode.insertBefore(botonEevee, botonBuscar.nextSibling);
    botonEevee.addEventListener('click', mostrarEvolucionesEevee);

    // Crear y añadir botón para Pokémon favoritos
    const botonFavoritos = document.createElement('button');
    botonFavoritos.textContent = 'Mis Favoritos';
    botonFavoritos.className = 'boton-principal';
    botonFavoritos.style.marginLeft = '10px';
    botonEevee.parentNode.insertBefore(botonFavoritos, botonEevee.nextSibling);
    botonFavoritos.addEventListener('click', mostrarPokemonsFavoritos);
});