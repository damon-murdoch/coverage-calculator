// List of abilities
const ABILITIES = [
  "filter", // Reduces super-effective damage.
  "solid rock", // Reduces super-effective damage.
  "prism armor", // Reduces super-effective damage.
  "flash fire", // Immune to Fire-type moves; boosts Fire-type moves.
  "levitate", // Immune to Ground-type moves.
  "wonder guard", // Only takes damage from super-effective moves.
  "storm drain", // Draws Water-type moves to user.
  "water absorb", // Heals from Water-type moves.
  "volt absorb", // Heals from Electric-type moves.
  "sap sipper", // Raises Attack on Grass-type moves; immune to them.
  "thick fat", // Reduces damage from Fire and Ice-type moves.
  "dry skin", // Heals from Water-type moves; damaged by Fire-type.
  "heatproof", // Halves damage from Fire-type moves.
  "fluffy", // Halves damage from contact moves; takes double from Fire.
  "tangling hair", // Lowers attacker's Speed on contact.
  "long reach", // Uses moves with recoil/drain without making contact.
  "disguise", // Blocks one damaging move.
  "cacophony", // Immune to sound-based moves.
  "justified", // Raises Attack on Dark-type moves; immune to them.
  "rattled", // Raises Speed on Bug/Dark/Ghost-type moves.
  "punk rock", // Reduces sound-based moves' damage; boosts sound moves.
  "ice scales", // Doubles resistance to special moves if hit points are full.
  "ice face", // Takes reduced damage from the first physical move.
  "bulletproof", // Immune to ball and bomb moves.
  "soundproof", // Immune to sound-based moves.
  "flare boost", // Boosts Special Attack when burned.
  "iron barbs", // Damages attackers on contact moves.
  "mirror armor", // Reflects stat-lowering moves.
  "mirror coat", // Reflects special moves with double damage.
  "counter", // Deals double damage when hit by a physical move.
  "metal burst", // Deals double damage when hit by a physical move.
  "magic guard", // Immune to indirect damage (except entry hazards).
  "wonder skin", // Increases chance of status moves failing.
  "color change", // Changes type to the type of the last move used.
  "stamina", // Raises Defense on hit.
  "grass pelt", // Raises Defense when on Grassy Terrain.
  "aroma veil", // Protects allies from Attract and Taunt.
  "queenly majesty", // Protects from priority moves.
  "dazzling", // Protects from priority moves.
  "flower gift", // Raises Attack and Special Defense in sun for allies.
  "aurora veil", // Reduces damage from physical and special moves.
  "dauntless shield", // Protects from all moves that target multiple Pokémon.
  "berserk", // Raises Special Attack when hit points drop below half.
  "punk rock", // Boosts the power of sound-based moves.
  "turboblaze", // Ignores Abilities that could hinder moves.
  "teravolt", // Ignores Abilities that could hinder moves.
];

// Null / no ability list
const NO_ABILITY = [
  '', 'none', 'null', null
];