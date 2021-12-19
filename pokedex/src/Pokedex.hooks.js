import { useEffect, useRef, useState } from "react";
import { getPokemonList } from "./adapters/storageAdapter";

export const usePokedex = () => {
   const _isMounted = useRef(true);
   const [ pokemonList, setPokemonList ] = useState();
   const [ error, setError ] = useState();
   
   useEffect(() => {
      async function getAndSetPokemon() {
         getPokemonList()
            .then(p => {
               if (_isMounted.current) setPokemonList(() => p);
            })
            .catch(e => {
               if (_isMounted.current) {
                  console.error("Encountered error while fetching pokemon: ", e);
                  setError(() => e);
               }
            });
      }
      getAndSetPokemon();
      return () => { _isMounted.current = false; };
   }, []);

   return { error, pokemonList };
};
