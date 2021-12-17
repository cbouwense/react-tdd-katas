import React, { useEffect, useRef, useState } from "react";
import { getPokemon } from "./adapters/storageAdapter";

export const Pokedex = () => {
   const _isMounted = useRef(true);
   const [ pokemon, setPokemon ] = useState();
   const [ error, setError ] = useState();
   
   useEffect(() => {
      async function getAndSetPokemon() {
         getPokemon()
            .then(p => {
               if (_isMounted.current) setPokemon(() => p);
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

   if (error) return <p role="status">{error}</p>;
   if (!pokemon) return <p role="status">loading...</p>;
   return <ul>{pokemon.results.map(p => <li key={p.name}></li>)}</ul>;
};
