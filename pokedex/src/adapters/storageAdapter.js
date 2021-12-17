export const getPokemon = async () => {
   const res = await fetch("https://pokeapi.co/api/v2/pokemon/");
   if (!res.ok) throw res.statusText;

   const pokemon = await res.json();
   return pokemon;
};