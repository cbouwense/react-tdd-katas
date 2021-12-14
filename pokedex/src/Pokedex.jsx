import React, { useEffect, useState } from "react";
import { getPokemon } from "./adapters/storageAdapter";

const usePokedex = () => {
   const [ pokemon, setPokemon ] = useState();
   
   useEffect(() => {
      console.log("in useEffect")
      async function getAndSetPokemon() {
         setPokemon(await getPokemon());
      }
      getAndSetPokemon();
      console.log("after getAndSetPokemon")
   }, []);

   return { pokemon };
};

export const Pokedex = () => {
   const { pokemon } = usePokedex();

   if (!pokemon) return <p role="status">loading...</p>;
   return <p>done!</p>;
};
