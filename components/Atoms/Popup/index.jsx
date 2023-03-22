import styled from "styled-components";
import { m } from "framer-motion"
import Typography from "../Text";
import Image from "next/image";
import IconButton from "../IconButton";
import useSound from 'use-sound';
import { useContext } from "react";
import { userContext } from "@/pages";

export const OpacityBackground = styled(m.div)`
background: rgba(0, 0, 0, ${props => props.opacity || ".5"});
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

export const PopUp = styled(m.div)`
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

export const PopUpNT = styled(m.div)`
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
export const TopTab = styled(m.div)`
width:150px;
height:40px;
border-radius: 1.2em 1.2em 0 0;
background-color:${props => props.tabcolor || "var(--button-light)"};
display:flex;
justify-content:center;
align-items:center;
pointer-events:auto;
cursor:pointer;
`
export const PopUpCont = styled(m.div)`
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
const TopTabs = styled.div`
display:flex;
width:80%;
gap:2em;
`

export function OpacityBackgroundFade({
   onClick = () => { },
   transform,
   opacity
}) {
   return (
      <OpacityBackground
         initial={{ opacity: 0 }}
         animate={{ opacity: (opacity ? opacity : .2) }}
         exit={{ opacity: 0 }}
         onClick={onClick}
         transform={transform}
      />
   )
}
/**
 * 
 * @param {*} content expects a react child component, this is the content inside the popup 
 * @param {*} title expects a string, this is the title of the popup 
 * @returns the popup
 */
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
   onNext = () => { },
   onPrevious = () => { },
   exitTab,
   catDexTab,
   arrows,
   secondTab,
   tabcolor,
   onSecondTabClick = () => { },
   onFirstTabClick = () => { },
}) {
   const { Volume } = useContext(userContext)
   const [sound] = useSound('/sound/bamboohit.mp3', { volume: Volume, });
   return (
      <PopUpCont initial={initial}
         animate={animate}
         transition={transition}
         exit={exit}
      >
         <TopTabs>
            <TopTab tabcolor={tabcolor ? "var(--button-light)" : "var(--border)"} onClick={onFirstTabClick}>
               <Typography text={title} size={"1.2rem"} color={tabcolor ? "var(--border)" : "var(--white)"} weight={"500"}
               />
            </TopTab>
            {secondTab &&
               <TopTab tabcolor={!tabcolor ? "var(--button-light)" : "var(--border)"} onClick={onSecondTabClick}>
                  <Typography text={secondTab} size={"1.2rem"} color={!tabcolor ? "var(--border)" : "var(--white)"} weight={"500"}
                  />
               </TopTab>
            }
         </TopTabs>
         <PopUpRow>
            <PopUpNT direction={direction}>
               {arrows && <IconButton
                  image="/icons/leftarrowlight.svg"
                  hover
                  secondImage="/icons/leftarrow.svg"
                  alt="Go back" width={75} height={75}
                  onClick={onPrevious} />}
               {content}
               {arrows && <IconButton
                  image="/icons/rightarrowlight.svg"
                  hover
                  secondImage="/icons/rightarrow.svg"
                  alt="Go forward" width={75} height={75}
                  onClick={onNext} />}
            </PopUpNT>
            <PopUpTabsCol>
               {exitTab && <PopupTab onClick={() => { onExit(); sound() }}>
                  <Image src="/icons/exit.svg" width={47} height={44} alt="exit icon" />
               </PopupTab>}
               {catDexTab && <PopupTab onClick={() => { onCatDex(); sound() }} color={"var(--accent)"} hovercolor={"var(--light-accent)"}>
                  <Image src="/icons/cat.svg" width={47} height={44} alt="catdex icon" />
               </PopupTab>}
            </PopUpTabsCol>
         </PopUpRow>
      </PopUpCont >

   )
}  