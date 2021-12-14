import React, { useEffect, useState } from "react";
import { getPokemon } from "./adapters/storageAdapter";

export const Pokedex = () => {
   const [ pokemon, setPokemon ] = useState();
   
   useEffect(() => {
      async function getAndSetPokemon() {
         getPokemon().then(setPokemon);
      }
      getAndSetPokemon();
   }, []);

   if (!pokemon) return <p role="status">loading...</p>;
   return <p>done!</p>;
};
