const MAX_DEX_ID = 493;

export const getRandomPokemon = (notThisOne?: number) => {
  const pokedexNumber = Math.floor(Math.random() * (MAX_DEX_ID - 1) + 1);
  // Math.random = number between 0 and 1
  // Times up to 492
  // 1 x 492 + 1 = 493
  // 0.05 * 493 = 24.65 -> 24
  // 0 x 493 = 0 + 1 = 1

  if (pokedexNumber !== notThisOne) return pokedexNumber;
  getRandomPokemon(notThisOne);
};
