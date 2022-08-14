import React, { useEffect, useMemo, useState } from "react";

const App2 = () => {
  const [name, setName] = useState("");
  const [state, setState] = useState({
    name: "",
    selected: false,
  });

  // solution 1: memorized value dependency
  // const user = useMemo(
  //   () => ({
  //     name: state.name,
  //     selected: state.selected,
  //   }),
  //   [state.name, state.selected]
  // );

  // useEffect(() => {
  //   console.count(`The state has changed, useEffect runs!`);
  // }, [user]);

  // solution 2: primitive property based dependency
  useEffect(() => {
    console.count(`The state has changed, useEffect runs!`);
  }, [state.name, state.selected]);

  const handleAddName = () => {
    setState((prev) => ({ ...prev, name }));
  };

  const handleSelect = () => {
    setState((prev) => ({ ...prev, selected: true }));
  };

  return (
    <div>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <button onClick={handleAddName}>Add Name</button>
      <button onClick={handleSelect}>Select</button>
      {`{
        name:${state.name},
        selected:${state.selected.toString()}
      }`}
    </div>
  );
};

export default App2;
