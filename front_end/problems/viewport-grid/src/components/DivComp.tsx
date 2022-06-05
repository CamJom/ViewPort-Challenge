import { useState,useEffect, useLayoutEffect, useRef, useCallback } from "react";

// defining Prop for the components 
// interface is a Typescript construct with mutiple properties to be used. 
interface Props {
  resizeHandlerReturn?: (update: ResizeHandlerProps) => void;  
}
interface ResizeHandlerProps {
  add?: () => void;
  remove?: () => void;
} 

export default function DivComp({ resizeHandlerReturn }: Props){
  //use Ref Refferences the individual div to be interacted with in this case it is the div 'myDiv' element 
  const divRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>()
  const [width, setWidth] = useState<number>()
  
// getBoundingClientRect provides dimension related properties of the Refferenced elements. 
// Some properties are width and height of the element. 
  const handleResize = useCallback(() => {
    const containerSize = divRef.current?.getBoundingClientRect?.();
    if (containerSize) {
      setWidth(Math.round(containerSize.width));
      setHeight(Math.round(containerSize.height));
    }
  },[]);

  useEffect(() => {
    resizeHandlerReturn({ add: handleResize })
    return () => resizeHandlerReturn({ remove: handleResize })
  }, [])

  // useLayoutEffect handles much like useEffect but is executed synchronesly after rendering. 
  // But before browser painting allowing access to the DOM before the browsers displays the changes. 
  useLayoutEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize)  
  },[divRef]);

  return (
  <div ref={divRef} className="myDiv"> {width} x {height} </div> 
  );
}
