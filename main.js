"use strict";

const API_URL = "https://pokeapi.co/api/v2/pokemon-color/yellow/";
const RESULTS_LIMIT = 20;

function showError() {
    const status = document.getElementById("status");
    status.textContent = "Podaci trenutačno nisu dostupni. Pokušajte ponovno kasnije.";
    status.classList.add("error");
}

function renderPokemon(pokemon) {
    const source = document.getElementById("pokemon-template").innerHTML;
    const template = Handlebars.compile(source);

    document.getElementById("pokemon-results").innerHTML = template({ pokemon });
}

function getYellowPokemon() {
    const request = new XMLHttpRequest();
    request.open("GET", API_URL, true);

    request.onload = function () {
        if (request.status < 200 || request.status >= 300) {
            showError();
            return;
        }

        const data = JSON.parse(request.responseText);
        const pokemon = data.pokemon_species.slice(0, RESULTS_LIMIT).map(function (species, index) {
            return {
                number: index + 1,
                name: species.name,
                url: species.url
            };
        });

        renderPokemon(pokemon);
        document.getElementById("status").textContent = "Prikazano je prvih 20 vrsta.";
    };

    request.onerror = showError;
    request.send();
}

getYellowPokemon();
