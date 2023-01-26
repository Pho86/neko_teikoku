import styled from "styled-components";
import { motion } from "framer-motion"

export const OpacityBackground = styled(motion.div)`
background: rgba(0, 0, 0, 5);
width:100vw;
height:100vh;
position:fixed;
left:50%;
top:50%;
cursor:pointer;
transform: ${props => props.transform || "translate(-50%, -50%)"};
z-index:55;
`

export const PopUp = styled(motion.div)`
background-color:var(--primary);
top: 50%;
left: 50%;
position:fixed;
transform: translate(-50%, -50%);
padding:2.5em 2.5em;
border-radius:1em;
display:flex;
flex-direction:column;
justify-content:space-between;
align-items:center;
cursor:auto;
z-index:56;
border: 5px solid var(--border);
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