import Image from "next/image";
import styled from "styled-components";
import { motion } from "framer-motion";
import { selectRandomFromArray } from "@/util";
import { useEffect, useState } from "react";

const CatImage = styled(Image)`
position:absolute;
cursor:pointer;
bottom:${props => props.bottom || ""};
right:${props => props.right || ""};
z-index:40;
user-drag: none;
-webkit-user-drag: none;
user-select: none;
-moz-user-select: none;
-webkit-user-select: none;
-ms-user-select: none;
pointer-events:auto;
`
const CatBox = styled(motion.div)`
width:100vw;
height:100vh;
position:fixed;
display:flex;
justify-content:center;
align-items:center;
pointer-events:none;
`
const CatArea = styled(motion.div)`
`
export default function Cat({
   catData,
   onClick = () => { },
   alt,
   width = 100,
   height = 100,
   image,

}) {
   const [x, setX] = useState(0);
   const [y, setY] = useState(0);


   useEffect(() => {
      const x = generateRandomNumber(-250, 250);
      const y = generateRandomNumber(-250, 250);
      setY(y)
      setX(x)
      console.log(y, x)
   }, [])

   function generateRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
   }
   return (
      <CatBox>
         <CatArea
            initial={{ x: x, y: y }}
            animate={{ x: x, y:y }}
            transition={{ duration: .2 }}
            whileHover={{
               scale: 1.1,
               transition: { duration: .15 },
            }}
            drag={true}
            dragConstraints={{ left: -350, right: 350, top: -250, bottom: 250 }}
            dragElastic={0.1}
            dragTransition={{ bounceStiffness: 0, bounceDamping: 0 }}
         >
            <CatImage src={image} width={width} height={height} onClick={onClick} alt={alt} />
         </CatArea>
      </CatBox>
   )
}