// Populate new species dropdown on element
function populate_species_dropdown(id) {
  // Get the drop-down element matching the id
  const select = document.getElementById(id);

  // Placeholder option
  const option = document.createElement("option");
  option.value = "none";
  option.innerHTML = "Select Species";
  select.appendChild(option);

  // Loop over each dex entry
  POKEDEX.forEach((pokemon) => {
    // Create select menu option
    const option = document.createElement("option");

    // Set the value to the species name
    option.value = pokemon.species;

    // Convert the pokemon value to upper case
    option.innerHTML = toCapitalCase(pokemon.species);

    // Add the option to the element
    select.appendChild(option);
  });
}

// Populate new abilities dropdown on element
function populate_abilities_dropdown(id) {
  // Get the drop-down element matching the id
  const select = document.getElementById(id);

  // Placeholder option
  const option = document.createElement("option");
  option.value = "none";
  option.innerHTML = "No Ability";
  select.appendChild(option);

  // Loop over each dex entry
  ABILITIES.forEach((ability) => {
    // Create select menu option
    const option = document.createElement("option");

    // Set the value to the species name
    option.value = ability;

    // Convert the move value to upper case
    option.innerHTML = toCapitalCase(ability);

    // Add the option to the element
    select.appendChild(option);
  });
}

// Populate new moves dropdown on element
function populate_moves_dropdown(id) {
  // Get the drop-down element matching the id
  const select = document.getElementById(id);

  // Placeholder option
  const option = document.createElement("option");
  option.value = "none";
  option.innerHTML = "No Move";
  select.appendChild(option);

  // Loop over each dex entry
  MOVES.forEach((move) => {
    // Create select menu option
    const option = document.createElement("option");

    // Set the value to the species name
    option.value = move.name;

    // Convert the move value to upper case
    option.innerHTML = toCapitalCase(move.name);

    // Add the option to the element
    select.appendChild(option);
  });
}

// Populate tera type dropdown on element
function populate_tera_dropdown(id){
  // Get the drop-down element matching the id
  const select = document.getElementById(id);

  // Placeholder option
  const option = document.createElement("option");
  option.value = "none";
  option.innerHTML = "No Tera Type";
  select.appendChild(option);

  // Loop over each dex entry
  TYPE_LIST.forEach((type) => {
    // Create select menu option
    const option = document.createElement("option");

    // Set the value to the species name
    option.value = type;

    // Convert the move value to upper case
    option.innerHTML = toCapitalCase(type);

    // Add the option to the element
    select.appendChild(option);
  });
}

function get_color(type) {

  // Placeholder
  color = "";

  // Color is found
  if (type in COLORS) {
    // Get the color for the type
    color = COLORS[type];
  }
  else // Color not found
  {
    // Warning
    console.warn(`Color for type '${type}' not found!`)
  }

  // Return color
  return color;
}

// function kv_map(object: object): list
function kv_map(object) {

  // Object which will be returned
  let obj = {};

  // Dereference the keys from the object
  let keys = Object.keys(object);

  // Iterate over the keys array
  for (let i = 0; i < keys.length; i++) {
    // Set the value of the key in the return to the index of the key in the original object
    obj[keys[i]] = i;
  }

  // Return the created object to the calling process
  return obj;
}
