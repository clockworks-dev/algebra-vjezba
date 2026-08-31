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

    const popoverElements = document.querySelectorAll('[data-bs-toggle="popover"]');

    popoverElements.forEach(function (popoverElement) {
        new bootstrap.Popover(popoverElement, {
            template:
                '<div class="popover" role="tooltip">' +
                '<div class="popover-arrow"></div>' +
                '<h3 class="popover-header"></h3>' +
                '<div class="popover-close" role="button" tabindex="0" aria-label="Zatvori popover">&times;</div>' +
                '<div class="popover-body"></div>' +
                '</div>'
        });

        popoverElement.addEventListener("show.bs.popover", function () {
            popoverElements.forEach(function (otherPopoverElement) {
                if (otherPopoverElement !== popoverElement) {
                    bootstrap.Popover.getInstance(otherPopoverElement).hide();
                }
            });
        });
    });
}

document.addEventListener("click", function (event) {
    const closeButton = event.target.closest(".popover-close");

    if (closeButton) {
        const openPopover = closeButton.closest(".popover");
        const trigger = document.querySelector('[aria-describedby="' + openPopover.id + '"]');

        if (trigger) {
            bootstrap.Popover.getInstance(trigger).hide();
        }

        return;
    }

    if (!event.target.closest('[data-bs-toggle="popover"], .popover')) {
        document.querySelectorAll('[data-bs-toggle="popover"]').forEach(function (popoverElement) {
            bootstrap.Popover.getInstance(popoverElement).hide();
        });
    }
});

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
