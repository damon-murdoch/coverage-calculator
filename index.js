// Get base url from url
function getBaseUrl(url){
  // Return url without arguments
  return url.split('?')[0];
}

// toCapitalCase(str: string)
// Returns the provided string
// with the first letter of each
// word capitalised.
function toCapitalCase(str) {
  // Split the string on the spaces
  let spl = str.split(" ");

  // Loop over the string splits
  for (let i = 0; i < spl.length; i++) {
    // If the string is greater
    // than one character
    if (spl[i].length > 1) {
      // Capitalise the first letter, add the rest as lowercase
      spl[i] = spl[i].charAt(0).toUpperCase() + spl[i].slice(1).toLowerCase();
    } // String is one or less characters
    else {
      // Convert the string to upper case
      spl[i] = spl[i].toUpperCase();
    }
  }

  // Join the split string on spaces
  return spl.join(` `);
}

// pad(n: int, width: int, z: int
// n: number we are padding
// width: maximum width we are padding to
// z: character we are padding with
function pad(n, width, z = 0) {
  // Convert input number to a string
  n = n + "";

  // Return the padded number as a string
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

// load_table(void): void
// Renders the table rows for each type to the screen
function load_types() {
  // Dereference the table object
  let table = document.getElementById("table-coverage");

  // Current row in the table we are working with
  // Used to designate the id given to each row
  let i = 0;

  // Iterate over each type
  for (const type in TYPES) {
    // Generate the row for the new type
    let row =
      `<tr id='row-` +
      i +
      `'><td><img src='img/type/` +
      type +
      `.png'></img></td>` +
      `<td id='` +
      i +
      `-0'> 0 </td>` +
      `<td id='` +
      i +
      `-1'> 0 </td>` +
      `<td id='` +
      i +
      `-2'> 0 </td>` +
      `<td id='` +
      i +
      `-3'> 0 </td>` +
      `<td id='` +
      i +
      `-4'> 0 </td>` +
      `<td id='` +
      i +
      `-5'> 0 </td>` +
      `<td id='` +
      i +
      `-rating'> No Rating </td>` +
      `</tr>`;

    // Add the new row to the table
    table.innerHTML += row;

    // Increment the current row
    i++;
  }
}

// import_pokemon(set: object, id: int): void
// Imports a given set object 'set'
// to the form object at index 'id'
function import_pokemon(set, id) {
  // Convert the species to lower case
  const species_lower = set.species.toLowerCase();

  // If the species is in the list
  if (SPECIES.includes(species_lower)) {
    // Set the species of the set to the species
    document.getElementById("pkmn-species-" + id).value = species_lower;

    // Convert the ability to lower case
    const ability_lower = set.ability.toLowerCase();

    // If the ability is in the list
    if (ABILITIES.includes(ability_lower)) {
      // Set the ability of the set to the ability
      document.getElementById("pkmn-ability-" + id).value = ability_lower;
    }
    // No ability / not important ability
    else if (NO_ABILITY.includes(ability_lower)){
      // Do not need to log
    }
    // Unhandled ability
    else {
      console.warn(`Unrecognised ability: '${ability_lower}' ...`);
    }

    // If the tera type is specified
    if ("tera type" in set.other) {
      // Convert the tera type to lower case
      const tera_lower = set.other["tera type"].toLowerCase();

      // Update the tera type for the
      document.getElementById("pkmn-tera-" + id).value = tera_lower;
    }

    // Loop over the moves
    for (let i in set.moves) {
      // Get the move and convert to lower case
      const move_lower = set.moves[i].toLowerCase();

      // If the move is in the list
      if (MOVES_LIST.includes(move_lower)) {
        // Generate the row id (for console)
        let row_id = "pkmn-" + id + "-move-" + (parseInt(i) + 1);

        // Set the current move to the move from the imported set
        document.getElementById(row_id).value = move_lower;
      } // Move is not in the list
      else {
        console.warn(`Unrecognised move: '${move_lower}' ...`);
      }
    }

    // Verify the displayed sprite
    set_sprite(id);
  } // Unrecognised species
  else {
    console.warn(`Unrecognised species: '${species_lower}' ...`);
  }

  // Update
  update(id);
}

// add_pokemon(void): void
// Adds a new pokemon selection tab to the window
function add_pokemon(set = null) {
  // Dereference the table object
  let table = document.getElementById("table-pkmn-contents");

  // Dereference the pokemon_count object,
  // and increment it after assignment
  let id = document.pokemon_count++;

  // Create the data row
  let data = document.createElement("tr");

  // Set the data row id
  data.id = "pkmn-" + id + "-info";

  // Species placeholder element id
  const species_id = `pkmn-species-${id}`;

  // Ability placeholder element id
  const ability_id = `pkmn-ability-${id}`;

  // Tera type placeholder element id
  const tera_id = `pkmn-tera-${id}`;

  // Tera enabled / disabled checkbox
  const tera_check_id = `${tera_id}-check`;

  // Set the data row content
  data.innerHTML =
    `<td><img id='pkmn-${id}-sprite' src='img/box/egg.png'></img></td>` +
    `<td><div>` +
    `<select id='${species_id}' class='form-control' name='pkmn-species-${id}' onChange='update(${id})'></select>` +
    `<select id='${ability_id}' class='form-control mt-2' name='pkmn-ability-${id}' onChange='update(${id})'></select>` +
    `<div class='input-group mt-2'><div class="input-group-text"><small class='mr-2'>Terastralised</small>` +
    `<input id='${tera_check_id}' type="checkbox" name='${tera_check_id}' onChange='update(${id})'></div>` +
    `<select id='${tera_id}' class='form-control' name='pkmn-tera-${id}' onChange='update(${id})'></select></div>` +
    `</div></td>`;

  // Add the data row to the form
  table.appendChild(data);

  // Create the moves selection row
  let move = document.createElement("tr");

  // Set the move row id
  move.id = "pkmn-" + id + "-move";

  // Set the move row content
  move.innerHTML =
    `<td><div class=''>` +
    `<td><select id='pkmn-${id}-move-1' class='form-control' name='pkmn-move1-${id}' onChange='update(${id})'></select>` +
    `<select id='pkmn-${id}-move-2' class='form-control' name='pkmn-move2-${id}' onChange='update(${id})'></select>` +
    `<select id='pkmn-${id}-move-3' class='form-control' name='pkmn-move3-${id}' onChange='update(${id})'></select>` +
    `<select id='pkmn-${id}-move-4' class='form-control' name='pkmn-move4-${id}' onChange='update(${id})'></select>` +
    `</div></td>`;

  // Add the move row to the form
  table.appendChild(move);

  // Create the control row
  let ctrl = document.createElement("tr");

  // Set the control row id
  ctrl.id = "pkmn-" + id + "-ctrl";

  // Set the control row content
  ctrl.innerHTML =
    `<td colspan=2><div class='row'>` +
    `<button id='pkmn-rmov-${id}' class='col btn btn-danger ml-3 mr-1 mt-1' onClick='rmv_pokemon(${id})'>Remove Pokemon</button>` +
    `<button id='pkmn-hide-${id}' class='col btn btn-secondary mr-3 ml-1 mt-1' onClick='toggle_moves(${id})'>Show Moves</button>` +
    `</div></td>`;

  // Add the control row to the form
  table.appendChild(ctrl);

  // Populate the species drop-down
  populate_species_dropdown(species_id);

  // Populate the abilities drop-down
  populate_abilities_dropdown(ability_id);

  // Populate the tera type drop-down
  populate_tera_dropdown(tera_id);

  // Loop over move drop-downs
  for (let i = 1; i <= 4; i++) {
    // Populate the move drop-down
    populate_moves_dropdown(`pkmn-${id}-move-${i}`);
  }

  // Hide the moves from the form to save space by default
  toggle_moves(id);

  // If a pokemon set  is
  // provided in the arguments
  if (set) {
    // Import it into the row
    import_pokemon(set, id);
  }
}

// rmv_pokemon(id: int): void
// Removes the pokemon selection tab from the window
function rmv_pokemon(id) {
  // Remove the related elements from the form
  document.getElementById("pkmn-" + id + "-info").remove();
  document.getElementById("pkmn-" + id + "-move").remove();
  document.getElementById("pkmn-" + id + "-ctrl").remove();

  // Update the table
  update();
}

// hide_moves(id: int): void
// Hides the selected pokemon tab from the form to save space
function hide_moves(id) {
  // Hide the moves display of the pokemon
  document.getElementById("pkmn-" + id + "-move").style.display = "none";

  // Update the hide-moves button to be a show-moves button
  let toggle = document.getElementById("pkmn-hide-" + id);

  // Set the display text on the button
  toggle.innerHTML = "Show Moves";
}

// hide_moves(id: int): void
// Shows the selected pokemon tab on the form
function show_moves(id) {
  // Hide the moves display of the pokemon
  document.getElementById("pkmn-" + id + "-move").style.display = "table-row";

  // Update the hide-moves button to be a show-moves button
  let toggle = document.getElementById("pkmn-hide-" + id);

  // Set the display text on the button
  toggle.innerHTML = "Hide Moves";
}

// toggle_moves(id: int): void
// Depending on the current style
function toggle_moves(id) {
  // Dereference the move control tab
  let elem = document.getElementById("pkmn-" + id + "-move");

  // If the element is currently hidden
  if (elem.style.display == "none") {
    // Run the display routine
    show_moves(id);
  } // Element is currently displayed
  else {
    // Run the hide routine
    hide_moves(id);
  }
}

// verify_sprite(img: element): void
// Given an (image) element, verify
// that the image has been rendered
// successfully.
function verify_sprite(img) {
  // If image failed to load,
  // naturalWidth will be zero.
  if (img.naturalWidth === 0) {
    return false;
  }

  // No other way of checking: assume it’s ok.
  return true;
}

// get_sprite(id: int): void
// Given a pokemon id, (attempt to)
// update the sprite displayed in
// the sprite box for the given pokemon.
function set_sprite(id) {
  // Dereference the sprite object for the pokemon
  let sprite = document.getElementById(`pkmn-${id}-sprite`);

  // Get the species for the Pokemon with the given id, converted to lower case
  const id_species = document.getElementById("pkmn-species-" + id).value;

  // Convert the species to lower case
  const species_lower = id_species.toLowerCase();

  // Find the species in the pokedex array
  const species = POKEDEX.find((x) => x.species == species_lower);

  // If the search was successful
  if (species) {
    // Generate the sprite reference
    const species_sprite = species_lower.replace(" ", "-");

    // Generate the filename
    let filename = `img/box/${species_sprite}.png`;

    // Set the sprite source to the generated image name
    sprite.src = filename;

    // If the sprite is verified successfully
    if (verify_sprite(species_sprite)) {
      // Script has worked as expected, return true
      return true;
    }
  }

  // If we make it here, sprite has not been configured

  // Set it to the default egg sprite
  sprite.src = `img/box/egg.png`;

  // False indicates sprite was not set properly
  return false;
}

// function get_ability(damage: int, index: int, ability: string): int
// Returns the damage taken for a given current damage stat (damage),
// a type index (index), and an ability (ability).
function get_ability(damage, index, ability) {
  // 0: normal
  // 1: weak
  // 2: resist
  // 3: immune

  // Switch on type
  switch (index) {
    // Electric Type
    case 3:
      // Switch on ability
      switch (ability) {
        // Motor Drive Grants Lightning Immunity
        case "motor drive":
        // Volt Absorb grants Lightning Immunity
        case "volt absorb":
        // Lightning Rod Grants Lightning Immunity
        case "lightning rod":
          {
            // Set damage to 3 (immune)
            damage = 3;
          }
          break;
      }

      break;

    // Fire Type
    case 6:
      // Switch on ability
      switch (ability) {
        // Fluffy adds fire weakness
        case "fluffy":
        // Dry Skin adds fire weakness
        case "dry skin":
          {
            // Switch on damage dealt
            switch (damage) {
              // If the attack is currently neutral
              case 0: {
                // Set it to super-effective
                damage = 1;
                break;
              }

              // If the attack is currently resisted
              case 2: {
                // Set it to neutral
                damage = 0;
                break;
              }
            }
          }

          break;

        // Baked Body grants fire immunity
        case "baked body":
        // Flash Fire grants fire immunity
        case "flash fire": {
          // Set damage to 3 (immune)
          damage = 3;
          break;
        }

        // Grants additional fire resist
        case "heatproof":
        // Grants additional fire resist
        case "water bubble":
        // Grants additional fire resist
        case "thick fat":
          {
            // Switch on damage dealt
            switch (damage) {
              // If the attack is currently neutral
              case 0: {
                // Set it to resisted
                damage = 2;
                break;
              }

              // If the attack is currently super-effective
              case 1: {
                // Set it to neutral
                damage = 0;
                break;
              }
            }
          }
          break;
      }

      break;

    // Ghost Type
    case 8: {
      // Switch on ability
      switch (ability) {
        case "purifying salt": {
          switch (damage) {
            case 0: {
              // Neutral
              damage = 2; // Resist
            }
            case 1: {
              // Weak
              damage = 0; // Neutral
            }
          }
        }
      }
      break;
    }

    // Grass Type
    case 9:
      {
        // Switch on ability
        switch (ability) {
          // Sap Sipper - Grants immunity to grass moves
          case "sap Sipper": {
            // Set damage to 3 (immune)
            damage = 3;
            break;
          }
        }
      }
      break;

    // Ground Type
    case 10: {
      // Switch on ability
      switch (ability) {
        // Earth Eater - Grants immunity to ground moves
        case "earth eater":
        // Levitate - Grants immunity to ground moves
        case "levitate": {
          // Set damage to 3 (immune)
          damage = 3;
          break;
        }
      }
      break;
    }

    // Ice Type
    case 11: {
      // Switch on ability
      switch (ability) {
        // Grants additional ice resist
        case "thick fat": {
          // Switch on damage dealt
          switch (damage) {
            // If the attack is currently neutral
            case 0: {
              // Set it to resisted
              damage = 2;
              break;
            }
            // If the attack is currently super-effective
            case 1: {
              // Set it to neutral
              damage = 0;
              break;
            }
          }
          break;
        }
      }
      break;
    }

    // Water Type
    case 17:
      {
        // Switch on ability
        switch (ability) {
          // Water Absorb - Grants immunity to water moves
          case "water absorb": {
            // Set damage to 3 (immune)
            damage = 3;
            break;
          }
        }
      }
      break;
  }

  // Return the new damage value to the calling process
  return damage;
}

// function get_move(move: object, ability: string)
// Given a move and an ability, evaluates what type
// the move will be when the user has the given
// ability and returns it to the calling process.
function get_move(move, ability = null) {
  // Dereference the move type
  let type = move.type;

  // Get the category of the move
  // let category = move.category;

  // If the move is a sound-based move, set sound to 1. Otherwise, set to 0
  // let sound = "sound" in move.flags && move.flags["sound"] == 1 ? 1 : 0;

  // Check if the move is sound-based or not
  let sound = move.name in SOUND_MOVES;

  // If the category is either physical or special
  // In other words, if the attack deals damage

  // If the move is either physical or special
  if (["physical", "special"].includes(move.category)) {
    // If the ability is set
    if (ability) {
      // Switching on ability rather than type
      // simplifies the handling of Normalize.
      switch (ability) {
        // Aerilate - Converts all normal attacks to flying
        case "Aerilate":
          // If the attack is normal, change it to flying
          // Otherwise, leave it alone
          type = type == "Normal" ? "Flying" : type;

          break;

        // Pixilate - Converts all normal attacks to fairy
        case "Pixilate":
          // If the attack is normal, change it to fairy
          // Otherwise, leave it alone
          type = type == "Normal" ? "Fairy" : type;

          break;

        // Galvanize - Converts all normal attacks to electric
        case "Galvanize":
          // If the attack is normal, change it to electric
          // Otherwise, leave it alone
          type = type == "Normal" ? "Electric" : type;

          break;

        // Refridgerate - Converts all normal attacks to ice
        case "Refridgerate":
          // If the attack is normal, change it to ice
          // Otherwise, leave it alone
          type = type == "Normal" ? "Ice" : type;

          break;

        // Liquid Voice - Converts all sound attacks to water
        case "Liquid Voice":
          // If the attack is sound based, change it to water
          // Otherwise, leave it alone
          type = sound == 1 ? "Water" : type;

          break;

        // Normalize - Converts all attacks to normal
        case "Normalize":
          // Make the attack normal type
          type = "Normal";

          break;
      }
    }
  } // If the attack does not deal damage
  else {
    // Push a null value to fill space
    // Status moves do not count towards
    // type coverage

    type = null;
  }

  // Return the type of the move to the calling process
  return type;
}

// function get_coverage(types: list): object
// Given a list object containing two or less types,
// calculates the weaknesses and resistances of the
// type or type combination.
// 0: immune, 1: 4x resist, 2: resist, 3: neutral, 4: weak, 5: 4x weak
function get_coverage(types, ability = null) {
  // Generate a map for the combo coverage

  // Rows 0-6 are used

  let map = get_map(document.typeCount, 6);

  // Iterate over the types in the combo
  for (let type of types) {
    // Dereference the type info from the types data
    let target = document.types[type];

    // Iterate over other types
    for (source in target.damageTaken) {
      // Convert the source to lower case
      const source_lower = source.toLowerCase();

      // Dereference the source index from the types map
      let s_index = document.typeMap[source_lower];

      // If the current source is not a type
      if (s_index) {
        // 0: normal
        // 1: weak
        // 2: resist
        // 3: immune

        // Dereference the type of damage taken from the target
        damage = target.damageTaken[source_lower];

        // If an ability is provided
        if (ability) {
          // Get the new damage, as modified by the ability
          damage = get_ability(damage, s_index, ability);
        }

        // Switch case on damage taken
        switch (damage) {
          // Normal Damage
          case 0:
            // Increment the neutral index
            map[s_index][3]++;

            break;

          // Hits for weakness
          case 1:
            // Increment the weak index
            map[s_index][4]++;

            break;

          // Hits for resistance
          case 2:
            // Increment the resist index
            map[s_index][2]++;

            break;

          // Is immune
          case 3:
            // Increment the immune index
            map[s_index][0]++;

            break;
        }
      }
    }
  }

  // Iterate over the rows in the map
  for (let x = 0; x < map.length; x++) {
    // Dereference the row
    let row = map[x];

    // If Ability is Wonder Guard
    if (ability == "Wonder Guard") {
      // If the type isn't weak
      if (!(row[4] || row[5])) {
        // Make the type immune
        row[0] = 1;
      }
    }

    // If there are any immunities, zero out the rest of the fields
    if (row[0] > 0) {
      // Set it to one
      row[0] = 1;

      // Zero out weak, resist, neutral
      row[2] = row[3] = row[4] = 0;
    }
    // If there are two resistances, zero the resistance field and make it a 4x resistance
    else if (row[2] == 2) {
      // Set 4x resist to 1
      row[1] = 1;

      // Set 2x resist to 0
      row[2] = 0;
    }

    // If there are two weaknesses, zero the weakness field and make it a 4x weakness
    else if (row[4] == 2) {
      // Set 4x weakness to 1
      row[5] = 1;

      // Set 2x weakness to 0
      row[4] = 0;
    }

    // If there is two neutral types, OR
    // If there is one weakness and one resistance, zero out weakness and resistance and make it neutral
    else if (row[3] == 2 || row[2] == row[4]) {
      // Set neutral to 1
      row[3] = 1;

      // Set weak and resist to 0
      row[2] = row[4] = 0;
    }

    // Otherwise, the type either singularly is weak or resists, set neutral to 0
    else {
      // Set neutral to 0
      row[3] = 0;
    }
  }

  // Return the map to the handling process
  return map;
}

// function get_damage(moves: list, ability: string): map
function get_damage(moves, ability) {
  // Generate a map for the combo coverage

  // Rows 0,2,4 are used
  // Rows 1,3 are there for padding

  let map = get_map(document.typeCount, 6);

  // Iterate over the moves in the moves list
  for (let move of moves) {
    // If the move has been set
    if (move) {
      // Iterate over each type
      for (let type_name in document.types) {
        // Dereference the type id
        let type_id = document.typeMap[type_name];

        // Dereference the type info
        let type = document.types[type_name];

        // Switch on damage taken from the current move for the given type
        switch (type.damageTaken[move]) {
          // Normal
          case 0:
            // Increment the neutral hits variable
            map[type_id][3]++;

            break;

          // Weak
          case 1:
            // Increment the weakness hits variable
            map[type_id][4]++;

            break;

          // Resist
          case 2:
            // Increment the resisted hits variable
            map[type_id][2]++;

            break;

          // Immune
          case 3:
            // Increment the immune hits variable
            map[type_id][0]++;

            break;
        }
      }
    } // Move is null
    else {
      // Do nothing
    }
  }

  return map;
}

// function get_table_defensive(types: list): list[]
// Given a list of types, returns the defensive values
// Which should be inserted into the display table.
function get_table_defensive(types, abilities) {
  // X Value: Number of different types
  // Y Value: Number of columns (Excl. Type Logo)
  let map = get_map(document.typeCount, 6);

  // Iterate over the list of types provided
  // for (combo of types)
  for (let i = 0; i < types.length; i++) {
    // Dereference this indexes' type combo
    let combo = types[i];

    // Dereference this indexes ability
    let ability = abilities[i];

    // Generate the map
    let combo_map = get_coverage(combo, ability);

    // Add the two maps together
    map = add_map(map, combo_map);
  }

  // Return the generated map to the calling process
  return map;
}

// function set_table_defensive(void): void
// Called by the web page form to load the defensive
// table.
function set_table_defensive() {
  // Set the document active variable to 0 (defensive)
  document.active = 0;

  // Darken the defensive tab, to show that it is active
  document.getElementById("option-defensive").className = "bg-dark";

  // Lighten the offensive tab, to show that it is hidden
  document.getElementById("option-offensive").className = "bg-secondary";

  // Update the form
  update();
}

// function get_table_offensive(types: list): list[]
// Given a list of types, returns the offensive values
// Which should be inserted into the display table.
function get_table_offensive(moves, abilities) {
  // X Value: Number of different types
  // Y Value: Number of columns (Excl. Type Logo)
  let map = get_map(document.typeCount, 6);

  for (let i = 0; i < moves.length; i++) {
    // Dereference the indexes' moves
    let moveset = moves[i];

    // Dereference this indexes ability
    let ability = abilities[i];

    // Generate the map
    let damage_map = get_damage(moveset, ability);

    // Add the two maps together
    map = add_map(map, damage_map);
  }

  // Return the generated map to the calling process
  return map;
}

// function set_table_defensive(void): void
// Called by the web page form to load the defensive
// table.
function set_table_offensive() {
  // Set the document active variable to 0 (defensive)
  document.active = 1;

  // Lighten the defensive tab, to show that it is hidden
  document.getElementById("option-defensive").className = "bg-secondary";

  // Darken the offensive tab, to show that it is active
  document.getElementById("option-offensive").className = "bg-dark";

  // Update the form
  update();
}

function evaluate_row(row) {
  // ROW INDEXES:
  // 0: immunities
  // 1: 4x resists
  // 2: 2x resists
  // 3: neutrals
  // 4: 2x weaks
  // 5: 4x weaks
  // 6: rating

  // This will serve as
  // a mathematical rating
  // for how good your coverage
  // for the given type is.

  // Weights:
  // 4x resists and immunities add 2, regular resists add 1
  // 4x weaks remove 2, regular weaks remove 1
  // neutral hits neither add nor remove anything

  // Return the calculated rating
  return 0 + row[0] * 2 + row[1] * 2 + row[2] - row[4] - row[5] * 2;
}

// Given a map (list[]) object generated by the offensive
// or defensive table generation functions, inserts the
// values into the display table on the page.
function populate_table(map) {
  // iterate over map 'x'
  for (let i = 0; i < map.length; i++) {
    // Iterate over map 'y'
    for (let j = 0; j < map[i].length; j++) {
      // Dereference the row on the table
      document.getElementById(i + "-" + j).innerHTML = map[i][j];
    }

    // Get a mathematical rating of the row
    let rating =
      document.active == 0 ? evaluate_row(map[i]) : -evaluate_row(map[i]);

    // Dereference the row we are looking at
    let elem_row = document.getElementById("row-" + i);

    // Dereference row element containing the rating
    let elem_rating = document.getElementById(i + "-rating");

    // If the rating is greater than or equal to two
    // Meaning that, we have 2 or more resistances than weaknesses
    if (rating >= 2) {
      // Very good coverage
      elem_rating.innerHTML = "Very Good";

      // Row background dark green
      elem_row.style[`background-color`] = get_color("verygood");
    }

    // If we have one more resistance than weaknesses
    else if (rating > 0) {
      // Good coverage
      elem_rating.innerHTML = "Good";

      // Row background light green
      elem_row.style[`background-color`] = get_color("good");
    }

    // If we have the same number of weaknesses and resistances
    else if (rating == 0) {
      // Even coverage
      elem_rating.innerHTML = "Even";

      // Row background white
      elem_row.style[`background-color`] = get_color("neutral");
    }

    // If we have 2 or more weaknesses than resistances
    else if (rating <= -2) {
      // Very poor coverage
      elem_rating.innerHTML = "Very Poor";
      //getbootstrap.com/docs/4.0/utilities/text/
      // Row background dark red
      https: elem_row.style[`background-color`] = get_color("verybad");
    }

    // If we have one more weakness than resistances
    else if (rating < 0) {
      // Poor Coverage
      elem_rating.innerHTML = "Poor";

      // Row background light red
      elem_row.style[`background-color`] = get_color("bad");
    }

    // Unknown Rating
    else {
      // No coverage
      elem_rating.innerHTML = "Not Calculated";

      // Row background white
      elem_row.style[`background-color`] = get_color("neutral");
    }
  }
}

// Load team from parameters, if possible
function load_team_from_params(){
  // Get the parameters sent to the current page
  const params = new URLSearchParams(window.location.search);

  // Get the team from the params
  const team = params.get('team');

  // Team is set
  if (team)
  {
    console.log("Loading team from params ...");

    // Decode the base-64 string
    const content = atob(team);

    // Import team from the content
    import_showdown(content);
    console.log("Done.");
  }
  else // Team is not set
  {
    // Check for a team in cookies
    const content = getCookie('team');

    // Content is not null
    if (content !== null && content !== ''){    
      console.log("Loading team from cookies ...");
      // Import team from the content
      import_showdown(content);
      console.log("Done.");
    }
  }
}

// update(id: int): void
// Given a pokemon id (which can be null),
// refreshes the calculations in the spreadsheet
// to reflect the updated Pokemon.

// If an ID is supplied, that Pokemon's sprite
// will be checked for an update (as it is new
// or has been modified) while the update is performed.
function update(id = null) {
  // If the given id is null or undefined
  if (id == null || id == undefined) {
    // No need to update sprites
  } else {
    // Attempt to update sprite
    set_sprite(id);
  }

  // Array of all of the types
  // which are on the team
  // (Duplicates allowed)
  document.types_list = [];

  // Array of all of the abilities
  // which are on the team
  // (Duplicates allowed)
  document.abilities_list = [];

  // Array of all of the move types
  // which are on the team
  // (Duplicates allowed)
  document.moves_list = [];

  document.paste_export = [];

  // Iterate over all of the elements which start with 'pkmn-species-'
  document
    .querySelectorAll(`*[id*='pkmn-species-']`)
    .forEach(function (element) {
      // Dereference the ID Value of the Pokemon
      let id = element.id.split("pkmn-species-")[1];

      // Convert the species to lower case
      const species = element.value.toLowerCase();

      // Find the pokedex entry for the species
      const lookup_dex = POKEDEX.find((x) => x.species == species);

      // If a non-null value is returned
      if (lookup_dex) {
        // Update the content for the export link

        // Start with just the name of the Pokemon and a new line
        let content = element.value + `\n`;

        // Pokemon type list
        const types = [];

        // Dereference the ability
        const tera_lower = document
          .getElementById("pkmn-tera-" + id)
          .value.toLowerCase();

        // Check if the tera is enabled or disabled for this pokemon
        const tera_checked = document.getElementById(
          `pkmn-tera-${id}-check`
        ).checked;

        // If tera type is found
        if (TYPE_LIST.includes(tera_lower)) {
          // Use the tera type instead of the normal type
          if (tera_checked) {
            // Add the type to the types list
            types.push(tera_lower);
          }

          // Add the name of the ability to the export content
          content += `Tera Type: ` + toCapitalCase(tera_lower) + `\n`;
        }

        // If the types list is empty (no tera type)
        if (types.length === 0) {
          // Add the primary type to the list
          types.push(lookup_dex.type1);

          // Dex entry has a second type
          if ("type2" in lookup_dex) {
            // Add it to the list
            types.push(lookup_dex.type2);
          }
        }

        // Add the type combination to the list of types
        document.types_list.push(types);

        // Dereference the ability
        const ability_lower = document.getElementById(
          "pkmn-ability-" + id
        ).value;

        // Ability is found
        if (ABILITIES.includes(ability_lower)) {
          // Add the ability to the abilities list
          document.abilities_list.push(ability_lower);

          // Add the name of the ability to the export content
          content += `Ability: ` + toCapitalCase(ability_lower) + `\n`;
        } 
        else // Pokemon has no set ability / invalid ability
        {    
          // No ability / not important ability
          if (NO_ABILITY.includes(ability_lower)){
            // Do not need to log
          }
          // Unhandled ability
          else {
            console.warn(`Unrecognised ability: '${ability_lower}' ...`);
          }

          // Add null to abilities list
          document.abilities_list.push(null);
        }

        // Empty list of moves
        let moves = [];

        // Iterate over the pokemon's moves in the form
        document
          .querySelectorAll(`*[id*='pkmn-${id}-move-']`)
          .forEach(function (mv_element) {
            // Convert the move name to lower case
            const mv_name = mv_element.value.toLowerCase();

            // Find the move data in the moves list
            let lookup_move = MOVES.find((x) => x.name === mv_name);

            // If a non-null value is returned
            if (lookup_move) {
              // Evaluate the type
              let type = get_move(lookup_move, ability_lower);

              // Add the move type to the moves list
              moves.push(type);

              // Add the move to the export content
              content += `- ` + mv_element.value + `\n`;
            } else {
              // Push a null value to fill space
              moves.push(null);
            }
          });

        // Add the set's list of moves to the document moves list
        document.moves_list.push(moves);

        // Add the pokemon's paste content to the export variable
        document.paste_export.push(content);
      } else {
        // Pokemon does not exist, no need to continue
        console.warn(`Warning: Species '${species}' not found!`);
      }
    });

  // If we are looking at the
  // defensive table
  if (document.active == 0) {
    // Generate the defensive coverage table
    document.defense = get_table_defensive(
      document.types_list,
      document.abilities_list
    );

    // Populate the displayed table using the defensive data
    populate_table(document.defense);
  } // We are looking at the offensive table
  else {
    // Generate the offensive coverage table
    document.offense = get_table_offensive(
      document.moves_list,
      document.abilities_list
    );

    // Populate the displayed table using the offensive data
    populate_table(document.offense);
  }

  // Convert the paste export to base64, and save it to cookies
  setCookie('team', btoa(document.paste_export), 30);
}

// import_showdown(): void
// Imports the pokemon from the user's
// clipboard to the form
function import_showdown(content = null) {

  // Content is not defined
  if (content === null){
    // Get the text from the textarea
    content = document.getElementById("text-import").value;
  }

  // Parse the sets from the import
  let sets = parseSets(content);

  // Loop over the sets
  for (const set of sets) {
    // Add the set to the page
    add_pokemon(set);
  }

  // Remove the import form
  document.getElementById("table-pkmn-import").innerHTML = ``;
}

// Initialise the document variables

// Variable recording the unique id of
// each pokemon added to the form - this
// is required to reference the values of
// each pokemon object uniquely
document.pokemon_count = 0;

// --- Data Files --- //

// Pokedex document reference
document.pokedex = POKEDEX;

// Abilities document reference
document.abilities = ABILITIES;

// Moves document reference
document.moves = MOVES;

// Not strictly required, but makes sense as a reference
document.types = TYPES;

// Reference of the number of types in the game
document.typeCount = TYPE_LIST.length;

// Reference of the table index associated with each type
document.typeMap = kv_map(document.types);

// --- Program Variables --- //

// 2D Array for building the defensive calculations table
// Empty / undefined by default, is built during update
document.defense = null;

// 2D Array for building the offensive calculations table
// Empty / undefined by default, is built during update
document.offense = null;

// Specifies which table is active
// 0: Defense, 1: Offense
document.active = 0;

// --- Run Startup Scripts --- //

// Load the type rows into the page
load_types();

// Set the active table to the defenses table
set_table_defensive();

// Load a team from the arguments, if present
load_team_from_params();

// --- Add Event Listeners --- //

// Export to clipboard event listener
document
  .getElementById("paste-export")
  .addEventListener("click", async (event) => {
    // If the clipboard module exists in the client's browser
    if (navigator.clipboard) {
      // Export string which will be copied to the clipboard
      let content = document.paste_export.join(`\n`);

      try {
        // Copy the string to the clipboard
        await navigator.clipboard.writeText(content);

        // Successful copy alert
        window.alert(
          document.paste_export.length +
            " Pokemon copied to clipboard successfully."
        );
      } catch (err) {
        // Report the failure to the error console
        console.error(
          "Failed to copy content `" + content + "`! Reason: `" + err + "`"
        );
      }
    } // Clipboard module is not available
    else {
      // Report failure to console, continue
      console.error("Clipboard interaction not supported by browser.");
    }
  });

// Import from clipboard event listener
document
  .getElementById("paste-import")
  .addEventListener("click", async (event) => {
    document.getElementById("table-pkmn-import").innerHTML = `
  <tr>
    <td>
      <textarea id='text-import' class='form-control' placeholder='Paste your team here...'></textarea>
    </td>
  </tr>
  <tr>
    <td>
      <button id='btn-import' type='button' class='btn btn-primary' onClick='import_showdown()'>
        Submit
      </button>
    </td>
  </tr>
  `;
  });

// Share page link event listener
document
  .getElementById("share-page")
  .addEventListener("click", async (event) => {
    // If the clipboard module exists in the client's browser
    if (navigator.clipboard) {
      // Export string which will be copied to the clipboard
      const content = document.paste_export.join(`\n`);

      // Convert the string to base64
      const encodedTeam = btoa(content);

      // Get the base url for the page (no arguments)
      const base = getBaseUrl(window.location.href);

      try {
        // Origin is not null
        if (base !== 'null') {
          // Generate the url to copy
          const encodedUrl = `${base}?team=${encodedTeam}`;

          // Copy the string to the clipboard
          await navigator.clipboard.writeText(encodedUrl);

          // Successful copy alert
          message = "Page link copied successfully.";

          window.alert(message);
        } 
        else // Origin is null
        {
          throw Error(`Origin is null! Is this a local site?`);
        }
      } catch (err) {
        // Report the failure to the error console
        console.error(
          "Failed to copy url `" + encodedTeam + "`! Reason: `" + err + "`"
        );
      }
    } // Clipboard module is not available
    else {
      // Report failure to console, continue
      console.error("Clipboard interaction not supported by browser.");
    }
  });

  // Reload page link event listener
document
.getElementById("reset-page")
.addEventListener("click", async (event) => {

  // Get the base url for the page (no arguments)
  const base = getBaseUrl(window.location.href);

  // Redirect to base url
  window.location.href = base;
});
