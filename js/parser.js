// Nickname (Species) (Gender) @ Item
// Key: Value
// EVs: x HP / x Atk / x Def / x SpA / x SpD / x Spe
// IVs: x HP / x Atk / x Def / x SpA / x SpD / x Spe
// Nature Nature
// - Move 1
// - Move 2
// - Move 3
// - Move 4

// statTemplate(init: int): object
// Return a pokemon stat field template,
// with a default value in each field of 0
// or 'init' if specified
function statTemplate(init = 0) {
  return {
    hp: init,
    atk: init,
    def: init,
    spa: init,
    spd: init,
    spe: init,
  };
}

// setTemplate(void): object
// Return a pokemon set template
function setTemplate() {
  return {
    species: "",
    nickname: "",
    gender: "",
    ability: "",
    evs: statTemplate(0),
    ivs: statTemplate(31),
    nature: "",
    item: "",
    moves: [],
    other: {},
  };
}

function parseStats(stats, str) {
  // Split on the seperator
  let s = str.split("/");

  // Loop over the stats
  for (stat of s) {
    // Split the stat on the space
    st = stat.split(" ");

    // Switch on the stat
    switch (st[1].toLowerCase()) {
      case "hp":
        stats.hp = parseInt(st[0]);
      case "atk":
        stats.atk = parseInt(st[0]);
      case "def":
        stats.def = parseInt(st[0]);
      case "spa":
        stats.spa = parseInt(st[0]);
      case "spd":
        stats.spd = parseInt(st[0]);
      case "spe":
        stats.spe = parseInt(st[0]);
    }
  }

  // Return the updated object
  return stats;
}

// parseSet(str: string): object
// Given a string sequence containing
// Pokemon showdown sets, returns a json
// list  of the sets converted to objects.
function parseSets(str) {
  // Empty array of sets
  let sets = [];

  // Get a new set template
  let current = null;

  // Get the species from the pokedex
  const SPECIES = Object.keys(POKEDEX);

  // Loop over each line in the string (lowercase)
  for (let line of str.split("\n")) {

    // Series of increasingly obscure cases
    // Check if this is the first line of the pokemon
    // Can be formatted a bunch of different ways
    // Case 1: No Item, Gender, Nickname: Species
    // Case 2: No Item, Gender: Nickname (Species)
    // Case 3: No Item: Nickname (Species) (Gender)
    // Case 4: Full: Nickname (Species) (Gender) @ Item

    // Strip the line to barest contents
    const line_strip = line.trim().toLowerCase();

    if (
      line.includes("@") || // Will always trigger if item is specified
      line.includes("(") || // Will always trigger if gender / nn is specified
      SPECIES.includes(line_strip) || // Line is the name of a pokemon
      (line.trim() != "" && line.trim().split(" ").length == 1)
    ) {

      // Will trigger if nothing is specified
      // If a set template has not been created yet, create one
      // If one already exists, add it to the list and create a new one
      if (current !== null) {
        // Add the current to the list
        sets.push(current);
      }

      // Create a new set object
      current = setTemplate();

      // If set if male
      if (line_strip.includes("(m)")) {
        // Remove gender from the line
        line = line.replace("(m)", "").replace("(M)", "");

        // Set set gender to male
        current.gender = "m";
      }

      // If set is female
      else if (line_strip.includes("(f)")) {
        // Remove gender from the line
        line = line.replace("(f)", "").replace("(F)", "");

        // Set the gender to female
        current.gender = "f";
      }

      // If line still contains any '()', must be a nickname
      if (line.includes("(")) {
        // Split the string on any '(' or ')'
        let li = line.trim().split(/(\(|\))/);

        // Add the nickname to the object
        current.nickname = li[0].trim();

        // Remove the first two objects (nickname + '(')
        li.splice(0, 2);

        // Add the species to the object
        current.species = li[0].trim();

        // Remove the first two objects (nickname + '(')
        li.splice(0, 2);

        // Join the split back together again
        line = li.join("");
      }

      // If line contains a '@', must be an item after it
      if (line.includes("@")) {
        // Split the string on the '@' token
        let li = line.trim().split("@");

        // If the first index is not null
        if (li[0].trim() !== "") {
          // Set the species to the value of the first index
          current.species = li[0].trim();
        }

        // If the second index is not null
        if (li[1].trim() !== "") {
          // Set the item to the value of the s econd index
          current.item = li[1].trim();
        }
      }

      // Line is in the species list
      if (SPECIES.includes(line_strip)){
        // Set the species to the line
        current.species = line_strip;
      }
    }

    // If the line contains the 'ability:' text
    else if (line_strip.includes("ability:")) {
      // Set the ability to the ability pulled from the text
      current.ability = line.split(":")[1].trim();
    }

    // If the line  contains the 'evs:' text
    else if (line_strip.includes("evs:")) {
      // Parse the stats from the text, set it to the current
      current.evs = parseStats(current.evs, line.split(":")[1].trim());
    }

    // If the line  contains the 'ivs:' text
    else if (line_strip.includes("ivs:")) {
      // Parse the stats from the text, set it to the current
      current.ivs = parseStats(current.ivs, line.split(":")[1].trim());
    }

    // All other random arbitrary k/v pairs, add to the other property
    else if (line.includes(":")) {
      // Key: Value, i.e. Shiny: Yes, Ability: Intimidate, etc.

      // Split the line on the ':'
      let li = line.trim().split(":");

      // Assign a 'key' in the 'other' property of the
      // current object to the 'value'
      current.other[li[0].trim().toLowerCase()] = li[1].trim();
    }

    // If the line contains the 'nature' text
    else if (line_strip.includes("nature")) {
      // Retrieve the nature from the string and add it to the object
      current.nature = line.split(" ")[0].trim();
    }

    // If the line starts with a '-', is a move
    else if (line.trim().startsWith("-")) {
      // Add the move text to the moves list  for the set
      current.moves.push(line.replace("-", "").trim());
    }
  }

  // Made it to the end, add the last set to the stack
  sets.push(current);

  // Return all of the parsed sets
  return sets;
}
