import React, { useEffect, useRef, useState } from "react";
import { getPokemon } from "./adapters/storageAdapter";

export const Pokedex = () => {
   let _isMounted = true;
   const [ pokemon, setPokemon ] = useState();
   const [ error, setError ] = useState();
   
   useEffect(() => {
      async function getAndSetPokemon() {
         getPokemon()
            .then(p => {
               if (_isMounted) setPokemon(() => p);
            })
            .catch(e => {
               if (_isMounted) {
                  console.error("Encountered error while fetching pokemon: ", e);
                  setError(() => e);
               }
            });
      }
      getAndSetPokemon();
      return () => { _isMounted = false; };
   }, []);

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
