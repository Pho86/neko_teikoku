import styled from "styled-components";
import { motion } from "framer-motion";

export const Slider = styled(motion.div)`
position:fixed;
bottom:0;
left:0;
width:100vw;
padding:3em;
background-color:var(--primary);
border-top: 6px solid var(--border);
z-index:51;
display:flex; 
justify-content:space-between;
align-items:center;
pointer-events:auto;
`
