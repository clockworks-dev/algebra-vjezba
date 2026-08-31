const baseUrl = "https://pokeapi.co/api/v2/";
const getColorUrl = "pokemon-color/";
const color = "yellow";
const xhr = new XMLHttpRequest();

Handlebars.registerHelper("orderNumber", function (index) {
  return index + 1;
});

const createTemplate = function (yellowPokemons) {
  const pokemonList = document.getElementById("pokemon-template").innerHTML;
  const listTemplate = Handlebars.compile(pokemonList);
  document.getElementById("pokemon-list").innerHTML = listTemplate({
    yellowPokemons,
  });
};

/**
 *
 * Example 1: prema trazenom zahtjevu
 */
xhr.open("GET", `${baseUrl}${getColorUrl}${color}`, true);

xhr.onload = function () {
  const data = JSON.parse(xhr.response);
  console.log(data.pokemon_species);
  createTemplate(data.pokemon_species.slice(0, 20));
};
xhr.send();

/**
 *
 * Example 2: druga opcija
 */
// const getPokemonsByColor = async function (color = "black", limit = 10) {
//   return await fetch(`${baseUrl}${getColorUrl}${color}`)
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       return data?.pokemon_species;
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// getPokemonsByColor("yellow").then((yellowPokemons) => {
//   createTemplate(yellowPokemons.slice(0, 20));
// });
