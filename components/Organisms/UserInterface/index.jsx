import styled from "styled-components";
import IconButton from "@/components/Atoms/IconButton";
import Typography from "@/components/Atoms/Text";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
const UserInterfaceDiv = styled.div`
position:fixed;
width:100vw;
height:100vh;
padding:2em;
pointer-events:none;
display:flex;
flex-direction:column;
justify-content:space-between;
`
const TopIcons = styled.div`
display:flex;
align-items:flex-end;
pointer-events:auto;
justify-content:space-between;
`
const BottomIcons = styled.div`
display:flex;
align-items:flex-end;
bottom:0;
pointer-events:auto;
gap:2em;
`
const ColIcon = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
text-align:${props => props.textAlign || "center"};
gap:.5em;
cursor:pointer;
`
const RowIcon = styled.div`
display:flex;
gap:${props => props.gap || ".5em"};
transform:${props => props.transform || ""};
cursor:pointer;
`
const MotionRowDiv = styled(motion.ColIcon)`
`
const WeatherDiv = styled.div`
display:flex;
flex-direction:column;
justify-content:space-between;
`
export default function UserInterface({
   catData,
   weatherData,
   userData,
   onCatDexClick = () => { },
}) {
   const [CookShow, setCookShow] = useState(false)
   return (
      <UserInterfaceDiv>
         <TopIcons>
            <RowIcon>
               <IconButton image={"/cats/caticon.svg"} alt="Profile Icon" />
               <Typography
                  text={"NAME"}
                  weight={"bold"}
                  size={"1.2em"}
               />
            </RowIcon>
            <RowIcon>
               <IconButton image={"/cats/caticon.svg"} alt="Weather Icon" />
               <WeatherDiv>
                  <Typography
                     text={"Weather"}
                     weight={"bold"}
                     size={"1.2em"}
                  />
                  <Typography
                     text={"42℃"}
                     size={"1.2em"}
                  />
               </WeatherDiv>
            </RowIcon>

         </TopIcons>
         <BottomIcons>
            <ColIcon onClick={onCatDexClick}>
               <IconButton image={"/cats/caticon.svg"} alt="CatDex Button" />
               <Typography
                  text={"Cat Dex"}
                  weight={"bold"}
                  size={"1.2em"}
               />
            </ColIcon>
            <ColIcon>
               <IconButton image={"/cats/caticon.svg"} alt="Items Button" />
               <Typography
                  text={"Items"}
                  weight={"bold"}
                  size={"1.2em"}
               />
            </ColIcon>

            <ColIcon>
               <AnimatePresence>

                  {CookShow &&
                     <motion.div
                        initial={{ opacity: 0, y: 100, x: "-25%" }}
                        animate={{ opacity: 1, y: -20 }}
                        exit={{ opacity: 0, y: 80 }}
                     >
                        <RowIcon gap={"2em"}>
                           <ColIcon>
                              <IconButton image={"/cats/caticon.svg"} alt="Cooking Button" />
                              <Typography
                                 text={"Place"}
                                 weight={"bold"}
                                 size={"1.2em"}
                              />
                           </ColIcon>
                           <ColIcon>
                              <IconButton image={"/cats/caticon.svg"} alt="Cooking Button" />
                              <Typography
                                 text={"Cook"}
                                 weight={"bold"}
                                 size={"1.2em"}
                              />
                           </ColIcon>
                        </RowIcon>
                     </motion.div>
                  }
               </AnimatePresence>
               <ColIcon onClick={() => { setCookShow(!CookShow) }} textAlign={"left"}>
                  <IconButton image={"/cats/caticon.svg"} alt="Treats Button" />
                  <Typography
                     text={"Cook"}
                     weight={"bold"}
                     size={"1.2em"}
                     padding={"0 1.4em"}
                  />
               </ColIcon>
            </ColIcon>

         </BottomIcons>
      </UserInterfaceDiv>
   )
}