const specificInfoForEachPokemon = (listOfPokemon) =>
   Promise.all(
      listOfPokemon.map(
         async (p) => {
            const res = await fetch(p.url);
            const { id, name, types } = await res.json();
            return {
               id,
               name,
               types: commaSeparatedTypeNames(types)
            };
         }
      )
   );

const listOfPokemonInResponse = async (response) => {
   const pokemonMetadata = await response.json();
   return pokemonMetadata.results;
};

const commaSeparatedTypeNames = (types) => types.map(t => t.type.name).join(", ");

export const getPokemon = async () => {
   const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
   if (!response.ok) throw response.statusText;

   const pokemonList = await listOfPokemonInResponse(response);
   const info = await specificInfoForEachPokemon(pokemonList);
   return info;
};
