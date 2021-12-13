import { useState } from "react";
import "./App.css";

export default () => {
   const [counter, setCounter] = useState(0);

   return (
      <>
         <h1>Counter: <span role="status">{counter}</span></h1>
         <button onClick={() => setCounter(counter - 1)}>-</button>
         <button onClick={() => setCounter(counter + 1)}>+</button>
      </>
   );
};
