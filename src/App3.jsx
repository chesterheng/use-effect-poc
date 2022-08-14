import React, { useEffect, useState } from "react";

const App3 = () => {
  const [number, setNumber] = useState(0);

  //WRONG (DO NOT UPDATE USING THE STATE ITSELF)
  // useEffect(() => {
  //   console.count("useeffect runs");
  //   setInterval(() => {
  //     setNumber(number + 1);
  //   }, [1000]);
  // }, [number]);

  //NO CLEAN-UP
  // useEffect(() => {
  //   console.count("useeffect runs");
  //   setInterval(() => {
  //     setNumber((prev) => prev + 1);
  //   }, [1000]);
  // }, []);

  //CORRECT
  useEffect(() => {
    console.count("useeffect runs");
    const interval = setInterval(() => {
      setNumber((prev) => prev + 1);
    }, [1000]);
    return () => {
      console.count("clearInterval");
      clearInterval(interval);
    };
  }, []);

  console.count("component rendered");
  return <div>{number}</div>;
};

export default App3;
