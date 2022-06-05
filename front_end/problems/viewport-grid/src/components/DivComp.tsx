import { useState,useEffect, useLayoutEffect, useRef, useCallback } from "react";

interface Props {
  resizeHandlerReturn?: (update: ResizeHandlerProps) => void;  
}
interface ResizeHandlerProps {
  add?: () => void;
  remove?: () => void;
} 


export default function DivComp({ resizeHandlerReturn }: Props){
  const divRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>()
  const [width, setWidth] = useState<number>()
  

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

  useLayoutEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize)  
  },[divRef]);

  return (
  <div ref={divRef} className="myDiv"> {width} x {height} </div> 
  );
}
