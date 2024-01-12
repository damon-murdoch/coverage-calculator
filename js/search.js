// Populate new species dropdown on element
function populateSpeciesDropdown(id) {
  // Get the drop-down element matching the id
  const select = document.getElementById(id);

  // Placeholder option
  const option = document.createElement("option");
  option.value = "none";
  option.innerHTML = "Select Species";
  select.appendChild(option);

  // Loop over each dex entry
  for(const species in POKEDEX){
    // Get the species data
    const speciesData = POKEDEX[species];

    // Create select menu option
    const option = document.createElement("option");

    // Set the value to the species name
    option.value = species;

    // Convert the pokemon value to upper case
    option.innerHTML = toCapitalCase(speciesData.name);

    // Add the option to the element
    select.appendChild(option);
  }
}

// Populate new abilities dropdown on element
function populateAbilitiesDropdown(id) {
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
function populateMovesDropdown(id) {
  // Get the drop-down element matching the id
  const select = document.getElementById(id);

  // Placeholder option
  const option = document.createElement("option");
  option.value = "none";
  option.innerHTML = "No Move";
  select.appendChild(option);

  // Loop over each dex entry
  for(const move in MOVES) {

    // Get the move data
    const moveData = MOVES[move];

    // Create select menu option
    const option = document.createElement("option");

    // Set the value to the species name
    option.value = move;
    
    // Convert the move value to upper case
    option.innerHTML = toCapitalCase(moveData.name);

    // Add the option to the element
    select.appendChild(option);
  };
}

// Populate tera type dropdown on element
function populateTeraDropdown(id){
  // Get the drop-down element matching the id
  const select = document.getElementById(id);

  // Placeholder option
  const option = document.createElement("option");
  option.value = "none";
  option.innerHTML = "No Tera Type";
  select.appendChild(option);

  // Loop over each dex entry
  TYPELIST.forEach((type) => {
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

function getColor(type) {

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

// function kvMap(object: object): list
function kvMap(object) {

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
