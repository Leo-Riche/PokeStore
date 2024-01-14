const id = document.querySelector('#pokemonList');
const select = document.querySelector('#Filtre');

fetch('https://pokeapi.co/api/v2/type')
    .then((response) => response.json())
    .then((data) => {
        const option = document.createElement('option');
        option.value = "all";
        option.textContent = "Tous";
        select.appendChild(option);
        data.results.forEach((type) => {
            const option = document.createElement('option');
            option.value = type.name;
            option.textContent = type.name;
            select.appendChild(option);
        });
    });

select.addEventListener('change', (event) => {
    const selectedType = event.target.value;
    const pokemons = document.querySelectorAll('.pokemon');
    pokemons.forEach((pokemon) => {
        const types = Array.from(pokemon.querySelectorAll('.type')).map(type => type.textContent);

        if (selectedType === 'all' || types.includes(selectedType)) {
            pokemon.style.display = 'flex';
        } else {
            pokemon.style.display = 'none';
        }
    });
});

function createPokemonElement(data) {
    const div = document.createElement('div');
    div.classList.add('pokemon');
    div.dataset.id = data.id;
    const divImg = document.createElement('div');
    const divType = document.createElement('div');
    divType.classList.add('divType');

    if (data.types) {
        data.types.forEach((type) => {
            div.dataset.id = data.id;
            const types = document.createElement('p');
            types.classList.add('type');
            types.textContent = type.type.name;
            types.classList.add(type.type.name);
            const color = type.type.name;
            div.classList.add(color);
            div.classList.remove(div.classList.item(2))
            divType.appendChild(types);
        });
    }

    const img = document.createElement('img');
    img.src = data.sprites.front_default;
    img.alt = `Image : ` + data.name;
    divImg.appendChild(img);

    const h4 = document.createElement('h4');
    h4.textContent = data.name;
    const button = document.createElement('button');
    button.classList.add('btn');
    button.textContent = "Voir plus";

    const pokemonList = document.querySelector('#pokemonList');
    pokemonList.appendChild(div);
    div.appendChild(divImg);
    div.appendChild(h4)
    div.appendChild(divType);
    div.appendChild(button);

    return div;
}

const div = document.querySelector('.search');
const button = document.querySelector('#Rechercher');

button.addEventListener('click', () => {
    const input = document.querySelector('#Recherche');
    const pokemonName = input.value;
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Aucun pokémon avec le nom "${pokemonName}" n'a été trouvé.`);
        }
        return response.json();
    })
    .then((data) => {
        if (pokemonName === '') {
            fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
                .then((response) => response.json())
                .then((data) => {
                    data.results.forEach((pokemon) => {
                        fetch(pokemon.url)
                            .then((response) => response.json())
                            .then((pokemonData) => {
                                createPokemonElement(pokemonData);
                            });
                    });
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            } else {
            const pokemonContainer = document.querySelector('#pokemonList');
            pokemonContainer.innerHTML = '';

            const div = document.createElement('div');
            div.classList.add('pokemon');
            const divImg = document.createElement('div');
            const divType = document.createElement('div');
            divType.classList.add('divType');

            if (data.types) {
                data.types.forEach((type) => {
                    div.dataset.id = data.id;
                    const types = document.createElement('p');
                    types.classList.add('type');
                    types.textContent = type.type.name;
                    types.classList.add(type.type.name);
                    const color = type.type.name;
                    div.classList.add(color);
                    div.classList.remove(div.classList.item(2))
                    divType.appendChild(types);
                });
            }

                const img = document.createElement('img');
                img.src = data.sprites.front_default;
                img.alt = `Image : ` + data.name;
                divImg.appendChild(img);

                const h4 = document.createElement('h4');
                h4.textContent = data.name;
                const button = document.createElement('button');
                button.classList.add('btn');
                button.textContent = "Voir plus";

                const pokemonList = document.querySelector('#pokemonList');
                pokemonList.appendChild(div);
                div.appendChild(divImg);
                div.appendChild(h4)
                div.appendChild(divType);
                div.appendChild(button);
            }})
            .catch((error) => {
                console.error('Error:', error);
            });
    
});

fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then((response) => response.json())
    .then((data) => {
    data.results.forEach((pokemon) => {
        const div = document.createElement('div');
        div.classList.add('pokemon');
        const divImg = document.createElement('div');
        const divType = document.createElement('div');
        divType.classList.add('divType');

        fetch(pokemon.url)
            .then((response) => response.json())
            .then((data) => {
                data.types.forEach((type) => {
                    div.dataset.id = data.id;
                    const types = document.createElement('p');
                    types.classList.add('type');
                    types.textContent = type.type.name;
                    types.classList.add(type.type.name);
                    const color = type.type.name;
                    div.classList.add(color);
                    div.classList.remove(div.classList.item(2))
                    divType.appendChild(types);
                });
                const img = document.createElement('img');
                img.src = data.sprites.front_default;
                img.alt = `Image : ` + data.name;
                divImg.appendChild(img);
            });
                    
        const h4 = document.createElement('h4');
        h4.textContent = pokemon.name;
        const button = document.createElement('button');
        button.classList.add('btn');
        button.textContent = "Voir plus";

        id.appendChild(div);
        div.appendChild(divImg);
        div.appendChild(h4)
        div.appendChild(divType);
        div.appendChild(button);
    });
});

id.addEventListener('click', (e) => {
    const div = e.target.closest('.pokemon');
    if (div) {
        const button = div.querySelector('button');
        button.addEventListener('click', () => {
            const idPokemon = div.dataset.id;
            localStorage.setItem('product_id', idPokemon);
            window.location.href = "produit.html";
        });
    };
});

window.onload = (event) => {
    const element = document.querySelector('#pokemonList'); 
    element.classList.add('fadeInUpBig');
}
