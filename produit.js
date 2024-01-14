const pokemonId = localStorage.getItem('product_id');

fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then((response) => response.json())
    .then((data) => {
        const body = document.querySelector('body');
        const color = data.types[0].type.name;
        const pokemonName = document.querySelector('.pokemonName');
        const pokemonImg = document.querySelector('.pokemonImg');
        const pokemonImage1 = document.querySelector('.pokemonImage1');
        const pokemonImage2 = document.querySelector('.pokemonImage2');
        const pokemonImage3 = document.querySelector('.pokemonImage3');
        const pokemonType = document.querySelector('.pokemonType');
        const pokemonType1 = document.querySelector('.pokemonType1');
        const pokemonTypeColor = data.types[0].type.name;
        const pokemonHeight = document.querySelector('.height');
        const pokemonWeight = document.querySelector('.weight');
        const pokemonGeneration = document.querySelector('.generation');
        const pokemonAbility = document.querySelector('.ability');

        body.classList.add(color);
        pokemonName.textContent = data.name;
        pokemonImg.src = data.sprites.front_default;
        pokemonImg.alt = `Image : ` + data.name;
        pokemonImage1.src = data.sprites.back_default;
        pokemonImage1.alt = `Image dos : ` + data.name;
        pokemonImage2.src = data.sprites.front_shiny;
        pokemonImage2.alt = `Image shiny : ` + data.name;
        pokemonImage3.src = data.sprites.back_shiny;
        pokemonImage3.alt = `Image dos shiny : ` + data.name;
        pokemonType1.textContent = data.types[0].type.name;
        pokemonType1.classList.add('type');
        pokemonType1.classList.add(data.types[0].type.name);
        pokemonType1.classList.add(pokemonTypeColor);
        pokemonType.appendChild(pokemonType1);

        if(data.types[1]) {
            const pokemonType2 = document.createElement('p');
            pokemonType2.textContent = data.types[1].type.name;
            pokemonType2.classList.add(data.types[1].type.name);
            pokemonType2.classList.add('type');
            pokemonType2.classList.add(pokemonTypeColor);
            pokemonType.appendChild(pokemonType2);
        };

        pokemonHeight.textContent = data.height / 10 + ' m';
        pokemonWeight.textContent = data.weight / 10 + ' kg';
        pokemonAbility.textContent = data.abilities[0].ability.name;

        if (data.id <= 151) {
            pokemonGeneration.textContent = "1";
        } else if (data.id <= 251) {
            pokemonGeneration.textContent = "2";
        } else if (data.id <= 386) {
            pokemonGeneration.textContent = "3";
        } else if (data.id <= 493) {
            pokemonGeneration.textContent = "4";
        } else if (data.id <= 649) {
            pokemonGeneration.textContent = "5";
        } else if (data.id <= 721) {
            pokemonGeneration.textContent = "6";
        } else if (data.id <= 809) {
            pokemonGeneration.textContent = "7";
        } else if (data.id <= 898) {
            pokemonGeneration.textContent = "8";
        };
    });

const button = document.querySelector('.ajouterAuPanier');
let pokemonCart = JSON.parse(localStorage.getItem("PokemonCartId")) || [];

button.addEventListener('click', () => {
    pokemonCart.push(pokemonId);
    localStorage.setItem("PokemonCartId", JSON.stringify(pokemonCart));
    button.classList.add('heartBeat');
});
button.addEventListener('animationend', () => {
    button.classList.remove('heartBeat');
});