import Image from "next/image";
import styled from "styled-components";
import { m } from "framer-motion";
import { generateRandomNumber } from "@/util";
import { useState, useContext, useEffect, useRef } from "react";
import useSound from "use-sound";
import { GameContext } from "@/pages/_app";
import catMeow from "@/data/meow.json";
import { selectRandomFromArray } from "@/util";

const CatImage = styled(Image)`
position:absolute;
cursor:pointer;
bottom:${props => props.bottom || ""};
right:${props => props.right || ""};
user-drag: none;
-webkit-user-drag: none;
user-select: none;
-moz-user-select: none;
-webkit-user-select: none;
-ms-user-select: none;
pointer-events:auto;
transition: all ease-in-out ${props => props.transitionduration || "0"}s, transform ease-in-out .2s, filter ease-in-out .2s;
&:hover{
   filter: drop-shadow(5px 5px 3px rgba(0, 0, 0, 0.2));
   transform:scale(1.2);
}
`

const CatBox = styled(m.div)`
z-index:30;
width:100vw;
height:100vh;
position:fixed;
display:flex;
justify-content:center;
align-items:center;
pointer-events:none;
left:0;
top:0;
user-drag: none;
-webkit-user-drag: none;
user-select: none;
-moz-user-select: none;
-webkit-user-select: none;
-ms-user-select: none;
`

export default function Cat({
   onClick = () => { },
   alt,
   width = 100,
   height = 100,
   image,
   right,
   bottom,
}) {
   const [x, setX] = useState(0);
   const [y, setY] = useState(0);
   const [duration, setDuration] = useState(0);

   useEffect(() => {
      setY(bottom)
      setX(right)
      setTimeout(() => {
         const duration = (Math.random() * (5 - 1 + 1) + 1)
         setDuration(duration)
         let y;
         const x = generateRandomNumber(5, 90);
         y = generateRandomNumber(15, 75);
         setY(y)
         setX(x)
      }, 1000)
   }, []);
   
   const { Volume } = useContext(GameContext);
   const meow = useRef("/sound/meow1.mp3")
   const [sound] = useSound(meow.current, { volume: Volume, });

   return (
      <CatBox>
         <CatImage bottom={`${y}vh`} right={`${x}vw`} src={image} transitionduration={duration} width={width} height={height} 
         onClick={async ()=>{ onClick(); let randomMeow = await selectRandomFromArray(catMeow[0]); meow.current = await randomMeow; sound()}} alt={alt} />
      </CatBox>
   )
}