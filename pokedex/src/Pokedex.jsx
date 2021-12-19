import React from "react";
import { usePokedex } from "./Pokedex.hooks";

export const Pokedex = () => {
   const { error, pokemon } = usePokedex();

   if (error) return <p role="status">{error}</p>;
   if (!pokemon) return <p role="status">loading...</p>;
   return (
      <ul>
         {pokemon.map(p => 
            <li key={p.name}>
               <h2>{p.name}</h2>
               <p data-testid="pokemonId">{p.id}</p>
            </li>
         )}
      </ul>
   );
};
