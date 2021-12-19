const specificInfoForEachPokemon = (listOfPokemon) =>
   Promise.all(
      listOfPokemon.map(
         async (p) => {
            const res = await fetch(p.url);
            const { id, name } = await res.json();
            return { id, name };
         }
      )
   );

const listOfPokemonInResponse = async (response) => {
   const pokemonMetadata = await response.json();
   return pokemonMetadata.results;
};

export const getPokemon = async () => {
   const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
   if (!response.ok) throw response.statusText;

   const pokemonList = await listOfPokemonInResponse(response);
   return specificInfoForEachPokemon(pokemonList);
};
