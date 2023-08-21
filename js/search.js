// Populate new species dropdown on element
function populate_species_dropdown(id){

  // Get the drop-down element matching the id
  const select = document.getElementById(id);

  // Placeholder option
  const option = document.createElement('option');
  option.value = 'none';
  option.innerHTML = 'Not Selected';
  select.appendChild(option);

  // Loop over each dex entry
  POKEDEX.forEach((pokemon) => {
    // Create select menu option
    const option = document.createElement('option');

    // Set the value to the species name
    option.value = pokemon.species;

    // Convert the pokemon value to upper case
    option.innerHTML = toCapitalCase(pokemon.species);

    // Add the option to the element
    select.appendChild(option);
  });
}

// Function new moves dropdown on element
function populate_moves_dropdown(id){

  // Get the drop-down element matching the id
  const select = document.getElementById(id);

  // Placeholder option
  const option = document.createElement('option');
  option.value = 'none';
  option.innerHTML = 'Not Selected';
  select.appendChild(option);

  // Loop over each dex entry
  MOVES.forEach((move) => {
    // Create select menu option
    const option = document.createElement('option');

    // Set the value to the species name
    option.value = move.name;

    // Convert the move value to upper case
    option.innerHTML = toCapitalCase(move.name);

    // Add the option to the element
    select.appendChild(option);
  });
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
