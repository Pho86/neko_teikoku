import styled from "styled-components";
import { motion } from "framer-motion"
import Typography from "../Text";
import Image from "next/image";

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
pointer-events:auto;
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

export const PopUpNT = styled(motion.div)`
background-color:var(--primary);
padding:2.5em 2em;
border-radius:1em;
display:flex;
flex-direction:${props => props.direction || "column"};
justify-content:space-between;
align-items:center;
cursor:auto;
border: 5px solid var(--border);
gap:1em;
pointer-events:auto;
`
export const TopTab = styled(motion.div)`
width:150px;
height:40px;
border-radius: 1.2em 1.2em 0 0;
background-color:var(--border);
display:flex;
justify-content:center;
align-items:center;
transform:translate(-250%, 0);
pointer-events:auto;
`
export const PopUpCont = styled(motion.div)`
position:fixed;
z-index:55;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
pointer-events:none;
`
const PopUpRow = styled.div`
display:flex;
pointer-events:none;
`
const PopUpTabsCol = styled.div`
display:flex;
flex-direction:column;
gap:2em;
pointer-events:none;
margin-top:5%;
`
const PopupTab = styled.div`
background-color:${props => props.color || "var(--border-light)"};
display:flex;
padding:1em 1.5em 1em 2em;
border-radius:0 1.2em 1.2em 0em;
pointer-events:auto;
transition:all .1s ease-in-out;
cursor:pointer;
&:hover {
   background-color:${props => props.hovercolor || "var(--border-hard)"};
}
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
export function PopUpWithTab({
   content,
   direction,
   title,
   initial,
   animate,
   transition,
   exit,
   onExit = () => { },
   onCatDex = () => { },
   exitTab,
   catDexTab,
}) {
   return (
      <PopUpCont initial={initial}
         animate={animate}
         transition={transition}
         exit={exit}
      >
         <TopTab>
            <Typography text={title} size={"1.2rem"} color={"var(--white)"} weight={"500"}
            />
         </TopTab>
         <PopUpRow>
            <PopUpNT direction={direction}>
               {content}
            </PopUpNT>
            <PopUpTabsCol>
               {exitTab && <PopupTab onClick={onExit}>
                  <Image src="/icons/exit.svg" width={47} height={44} alt="exit icon" />
               </PopupTab>}
               {catDexTab && <PopupTab onClick={onCatDex} color={"var(--accent)"} hovercolor={"var(--light-accent)"}>
                  <Image src="/icons/cat.svg" width={47} height={44} alt="catdex icon" />
               </PopupTab>}
            </PopUpTabsCol>
         </PopUpRow>
      </PopUpCont>

   )
}  