let pokemonCart = JSON.parse(localStorage.getItem("PokemonCartId")) || [];
const main = document.querySelector('.mainPanier');

pokemonCart.forEach((pokemonId, index) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then((response) => response.json())
        .then((pokemon) => {
            const div = document.createElement('div');
            div.classList.add('pokemonPanier');
            div.dataset.id = pokemonId;

            const color = pokemon.types[0].type.name;
            div.classList.add(color);

            const img = document.createElement('img');
            img.classList.add('imgPanier');
            img.src = pokemon.sprites.front_default;
            img.alt = `Image : ` + pokemon.name;

            const name = document.createElement('h4');
            name.textContent = pokemon.name;

            const buttons = document.createElement('div');
            buttons.classList.add('buttons');

            const button = document.createElement('button');
            button.classList.add('btn');
            button.textContent = "Voir plus";
            button.addEventListener('click', () => {
                localStorage.setItem('product_id', pokemonId);
                window.location.href = "produit.html";
            });

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('btn');
            deleteButton.textContent = "Supprimer";
            deleteButton.addEventListener('click', () => {
                pokemonCart.splice(index, 1);
                localStorage.setItem('PokemonCartId', JSON.stringify(pokemonCart));
                div.remove();
            });

            main.appendChild(div);
            div.appendChild(img);
            div.appendChild(name);
            div.appendChild(buttons);
            buttons.appendChild(button);
            buttons.appendChild(deleteButton);
        })
})