import styled from "styled-components";
import { motion } from "framer-motion"

export const OpacityBackground = styled(motion.div)`
background: rgba(0, 0, 0, 0.2);
width:100vw;
height:100vh;
position:fixed;
left:0;
top:0;
cursor:pointer;
`

export const PopUpDiv = styled(motion.div)`
background-color:var(--primary);
top: 50%;
left: 50%;
position:fixed;
transform: translate(-50%, -50%);
padding:1em 2em;
width:80%;
height:60%;
display:flex;
flex-direction:column;
align-items:center;
cursor:auto;
`