import { useState, useEffect, useLayoutEffect } from "react";
import { Burger } from "../icons/Burger";
import DivComp from "./DivComp";

export default function SideBar() {
  const [row, setRow] = useState<number>(0);
  const [col, setCol] = useState<number>(0);
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  // useState '<Array<() => void>>([])'  is spesifically used in typscript to ensure that received elements are an Array of functions. 
  const [resizeHandlers, setResizeHandlers] = useState<Array<() => void>>([]);

  // Resets state for div sizes
  useLayoutEffect(() => {
    resizeHandlers.forEach((handleResize) => handleResize());
  }, [row, col, showSideBar, resizeHandlers]);

  const rowChange = (e) => {
    setRow(e.target.value);
  };
  const colChange = (e) => {
    setCol(e.target.value);
  };
  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  // Takes in input values from state and splits the 'table' class propostionaly.
  const tableStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${col}, 1fr)`,
    gridTemplateRows: `repeat(${row}, 1fr)`,
  };

  // Passing callback to Child element to add or remove resizing handlers during mouting/remounting.
  // Remouting is needed only when DOM is mounted and removes unessesary callbacks.
  const onContinue = ({ add, remove }: { add?: any; remove?: any }) => {
    if (add) {
      setResizeHandlers((handleResizes) => [...handleResizes, add]);
    }
    if (remove) {
      setResizeHandlers((handleResizes) =>
        handleResizes.filter((handleResize) => handleResize !== remove)
      );
    }
  };

  useEffect(() => {
    console.log(resizeHandlers);
  }, [resizeHandlers]);

  const tableGenerator = (col, row) => {
    const cells = row * col;
    const newTable = [];
    for (let i = 0; i < cells; i++) {
      newTable.push(<DivComp resizeHandlerReturn={onContinue} key={i} />);
    }
    return <>{newTable}</>;
  };

  return (
    <div className="main">
      <div className="sideBar">
        <button onClick={toggleSideBar}>
          <Burger />
        </button>
        {showSideBar && (
          <>
            <h2> Rows </h2>
            <input
              onChange={rowChange}
              type="number"
              placeholder="0"
              max="10"
              min="0"
            />

            <h2> Column </h2>
            <input
              onChange={colChange}
              type="number"
              placeholder="0"
              max="10"
              min="0"
            />
          </>
        )}
      </div>
      <div style={tableStyle} className="table">
        {tableGenerator(col, row)}
      </div>
    </div>
  );
}
