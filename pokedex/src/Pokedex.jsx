import React, { useEffect } from "react";
import { getPokemon } from "./services/storageAdapter";
import "./App.css";

const usePokedex = () => {
   useEffect(() => {
      getPokemon();
   }, []);
};

export const Pokedex = () => {
   usePokedex();

   return <p role="status">loading...</p>;
};
