import Image from "next/image";
import styled from "styled-components";
import { m } from "framer-motion";
import { generateRandomNumber } from "@/util";
import { useEffect, useState } from "react";


const CatImage = styled(Image)`
position:absolute;
cursor:pointer;
bottom:${props => props.bottom || ""};
right:${props => props.right || ""};
z-index:45;
user-drag: none;
-webkit-user-drag: none;
user-select: none;
-moz-user-select: none;
-webkit-user-select: none;
-ms-user-select: none;
pointer-events:auto;
transition: all ease-in-out ${props => props.transitionduration || "0"}s, transform ease-in-out .2s, filter ease-in-out .2s;
transition:;
&:hover{
   filter: drop-shadow(5px 5px 3px rgba(0, 0, 0, 0.2));
   transform:scale(1.2);
}
`

const CatBox = styled(m.div)`
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
const CatArea = styled(m.div)`
`
export default function Cat({
   catData,
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
      // console.log(catData)
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
   }, [])


   return (
      <CatBox>
         {/* <CatArea
            initial={{ x: `${x}vw`, y: `${y}vh` }}
            animate={{ x: `${x}vw`, y: `${y}vh` }}
            transition={{ duration: .2 }}
            whileHover={{
               scale: 1.2,
               transition: { duration: .15 },
            }}
         > */}
         <CatImage bottom={`${y}vh`} right={`${x}vw`} src={image} transitionduration={duration} width={width} height={height} onClick={onClick} alt={alt} />
         {/* </CatArea> */}
      </CatBox>
   )
}