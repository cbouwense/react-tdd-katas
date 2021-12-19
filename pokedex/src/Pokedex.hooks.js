import { useEffect, useState } from "react";
import { getPokemon } from "./adapters/storageAdapter";

export const usePokedex = () => {
   const [ pokemon, setPokemon ] = useState();
   const [ error, setError ] = useState();
   
   useEffect(() => {
      async function getAndSetPokemon() {
         getPokemon()
            .then(p => {
               setPokemon(() => p);
            })
            .catch(e => {
               console.error("Encountered error while fetching pokemon: ", e);
               setError(() => e);
            });
      }
      getAndSetPokemon();
   }, []);

   return { error, pokemon };
};
