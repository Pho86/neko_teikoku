import styled from "styled-components";
import { motion } from "framer-motion"

export const OpacityBackground = styled(motion.div)`
background: rgba(0, 0, 0, 5);
width:103vw;
height:105vh;
position:fixed;
left:0;
top:0;
cursor:pointer;
transform: ${props => props.transform || ""};
`

export const PopUp = styled(motion.div)`
background-color:var(--primary);
top: 50%;
left: 50%;
position:fixed;
transform: translate(-50%, -50%);
padding:2em 2em;
border-radius:.5em;
width:${props=> props.width || "65%"};
display:flex;
flex-direction:column;
align-items:center;
cursor:auto;
`

export function OpacityBackgroundFade({
   onClick = () => { },
   transform
}) {
   return (
      <OpacityBackground
         initial={{ opacity: 0 }}
         animate={{ opacity: .2 }}
         exit={{ opacity: 0 }}
         onClick={onClick}
         transform={transform}
      />
   )
}