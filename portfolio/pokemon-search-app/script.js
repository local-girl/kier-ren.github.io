const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weightDiv = document.getElementById("weight");
const heightDiv = document.getElementById("height");
const typesDiv = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const spriteContainer = document.getElementById("sprite-container");

const pokemonDatabase = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";



const searchDatabase = async (query) => {
  query = query.toLowerCase().replace(" ", "-").replace(".", "");
  try {
    const pokemon = pokemonDatabase + "/" + query;
    const res = await fetch(pokemon);
    const data = await res.json();
    updateText(data);
  } catch (err) {
    alert("Pokémon Not Found");
    console.log(err);
  }
};

const updateText = (data) => {
  const { name, id, weight, height, types, stats } = data;
  const baseStats = [];

  stats.forEach((item, index) => {
    baseStats.push(stats[index].base_stat);
  });

  pokemonName.textContent = name.toUpperCase().replace("NIDORAN-M", "NIDORAN ♂").replace("NIDORAN-F", "NIDORAN ♀").replace("-", " ");
  pokemonId.textContent = "#" + id;
  weightDiv.textContent = "Weight: " + weight;
  heightDiv.textContent = "Height: " + height;

  types.forEach((item, index) => {
    const type = types[index].type.name.toUpperCase();
    typesDiv.innerHTML += `<div class="pokemon-type" id="${type.toLowerCase()}-type">${type}</div>`
  });

  hp.textContent += baseStats[0];
  attack.textContent += baseStats[1];
  defense.textContent += baseStats[2];
  specialAttack.textContent += baseStats[3];
  specialDefense.textContent += baseStats[4];
  speed.textContent += baseStats[5];

  hp.classList.remove("hidden");
  attack.classList.remove("hidden");
  defense.classList.remove("hidden");
  specialAttack.classList.remove("hidden");
  specialDefense.classList.remove("hidden");
  speed.classList.remove("hidden");


  spriteContainer.innerHTML += `<img id="sprite" src="${data.sprites.front_default}" alt="${name} sprite"></img>`
};


const clear = () => {
  spriteContainer.innerHTML = "";
  pokemonName.textContent = "";
  pokemonId.textContent = "";
  heightDiv.textContent = "";
  weightDiv.textContent = "";
  typesDiv.textContent = "";
  hp.textContent = "";
  attack.textContent = "";
  defense.textContent = "";
  specialAttack.textContent = "";
  specialDefense.textContent = "";
  speed.textContent = "";
  hp.classList.add("hidden");
  attack.classList.add("hidden");
  defense.classList.add("hidden");
  specialAttack.classList.add("hidden");
  specialDefense.classList.add("hidden");
  speed.classList.add("hidden");
}

// search on Enter key press or button click
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    clear();
    searchDatabase(searchInput.value);
  }
});

searchButton.addEventListener("click", () => {
  clear();
  searchDatabase(searchInput.value);
});