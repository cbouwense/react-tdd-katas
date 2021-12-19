import { useEffect, useState } from "react";
import { getPokemonList } from "./adapters/storageAdapter";

export const usePokedex = () => {
   const [ pokemonList, setPokemonList ] = useState();
   const [ error, setError ] = useState();
   
   useEffect(() => {
      async function getAndSetPokemon() {
         getPokemonList()
            .then(p => {
               setPokemonList(() => p);
            })
            .catch(e => {
               console.error("Encountered error while fetching pokemon: ", e);
               setError(() => e);
            });
      }
      getAndSetPokemon();
   }, []);

   return { error, pokemonList };
};
