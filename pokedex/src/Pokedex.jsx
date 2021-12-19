import React from "react";
import { usePokedex } from "./Pokedex.hooks";

export const Pokedex = () => {
   const { error, pokemonList } = usePokedex();

   if (error) return <p role="status">{error}</p>;
   if (!pokemonList) return <p role="status">loading...</p>;
   return (
      <ul>
         {pokemonList.map(p => 
            <li key={p.name}>
               <h2>{p.name}</h2>
               <p>{p.id}</p>
               <p>{p.types}</p>
            </li>
         )}
      </ul>
   );
};
