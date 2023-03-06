import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import styled from "styled-components"
import { useState } from "react";
import CatTextBox from "@/components/Molecules/CatTextBox";
import AdvisorPhrases from "@/data/phrases.json"
import { selectRandomFromArray } from "@/util";

const CatImage = styled(Image)`
cursor:pointer;
user-drag: none;
-webkit-user-drag: none;
user-select: none;
-moz-user-select: none;
-webkit-user-select: none;
-ms-user-select: none;
pointer-events:auto;
transition: all ease-in-out ${props => props.transitionduration || ".2"}s;
&:hover{
   filter: drop-shadow(5px 5px 3px rgba(0, 0, 0, 0.2));
   transform:scale(1.1);
}
`

const CatDiv = styled.div`
bottom:${props => props.bottom || ""};
right:${props => props.right || ""};
z-index:45;
position:absolute;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
transform:translate(-20vw, -10vh);
pointer-events:auto;
`
const CatBox = styled(motion.div)`
pointer-events:none;
z-index:43;
`
export default function Advisor({
}) {
   const [textbox, setTextBox] = useState(false);
   const [text, setText] = useState("")
   const HandleTextBox = () => {
      const x = selectRandomFromArray(AdvisorPhrases[1])
      setText(x)
      setTextBox(!textbox)
   }
   return (
      <CatBox>
         <CatDiv>
            <CatImage src={'/cats/advisor.svg'} id="advisor" width={180} height={150} alt={'this is your advisor'} onClick={HandleTextBox} />
            <AnimatePresence>
               {textbox && <CatTextBox text={text} />}
            </AnimatePresence>
         </CatDiv>
      </CatBox>
   )
}