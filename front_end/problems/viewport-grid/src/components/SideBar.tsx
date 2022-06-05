import { useState, useEffect, useLayoutEffect } from "react";
import { Burger } from "../icons/Burger";
import DivComp from "./DivComp"

export default function SideBar() {
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [view, setView] = useState(false);
  const [resizeHandlers, setResizeHandlers] = useState<Array<() => void>>([])

  useLayoutEffect(() => {
    resizeHandlers.forEach((handleResize) => handleResize())
  }, [row, col, view, resizeHandlers]) 

  const rowChange = (e) => {
    setRow(e.target.value);
  }

  const colChange = (e) => {
    setCol(e.target.value);
  }

  const toggleView = () => {
    setView(!view);
  };

  const tableStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${col}, 1fr)`,
    gridTemplateRows: `repeat(${row}, 1fr)`,
  }

  const onContinue = ({ add, remove } : { add?: any , remove?: any }) => {
    if (add) {
      setResizeHandlers((handleResizes) => [...handleResizes, add])
    }
    if (remove) {
      setResizeHandlers((handleResizes) => (
        handleResizes.filter((handleResize) => handleResize !== remove)
      ))
      }
  }

  useEffect(() =>  {
    console.log(resizeHandlers)
  },[resizeHandlers])


  const maker = (col, row) => {
    const table = row * col;
    const newTable = []
    const tableMaker = (table) => {
      for (let i = 0; i < table; i++) {
        newTable.push (
            <DivComp resizeHandlerReturn={onContinue} key={i} />
        );
      }
      return newTable
    };
    return <>{tableMaker(table)}</>; 
  }

  return (
    <div className="main">
      <div className="sideBar">
        <button onClick={toggleView}>
          <Burger />
        </button>
        {view && (
          <>
            <h2> Rows </h2>
            <input 
            onChange={rowChange} 
            type="number" 
            placeholder="0"
            max='10'
            min='0' />

            <h2> Column </h2>
            <input 
            onChange={colChange} 
            type="number" 
            placeholder="0"
            max='10'
            min='0' />
          </>
        )}
      </div>
      <div style={tableStyle} className="table">
      {maker(col,row)}
      </div>
    </div>
  );
}
