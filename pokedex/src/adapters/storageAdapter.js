export const getPokemon = async () => {
   const res = await fetch("https://pokeapi.co/api/v2/pokemon/");
   if (!res.ok) throw res.statusText;

   const pokemonMetadata = await res.json();
   const pokemon = pokemonMetadata.results;

   return Promise.all(pokemon.map(async (p) => {
      const res = await fetch(p.url);
      const { id, name } = await res.json();
      return { id, name };
   }));
};
