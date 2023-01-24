import styled from "styled-components";
import IconButton from "@/components/Atoms/IconButton";
import Typography from "@/components/Atoms/Text";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ItemsSlider from "@/components/Molecules/ItemsSlider";

const UserInterfaceDiv = styled.div`
position:fixed;
width:100vw;
height:100vh;
padding:2em;
pointer-events:none;
display:flex;
flex-direction:column;
justify-content:space-between;
z-index:44;
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
pointer-events:auto;
`
const RowIcon = styled.div`
pointer-events:auto;
display:flex;
gap:${props => props.gap || ".5em"};
cursor:pointer;
`
const WeatherDiv = styled.div`
display:flex;
flex-direction:column;
justify-content:space-between;
`
export default function UserInterface({
   weatherData,
   userData,
   onCatDexClick = () => { },
}) {
   const [CookShow, setCookShow] = useState(false);
   const [setItems, setItemsShow] = useState(false);
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
            {weatherData && <RowIcon>
               <IconButton image={"/cats/caticon.svg"} alt="Weather Icon" />
               <WeatherDiv>
                  <Typography
                     text={weatherData.weather[0].main}
                     // text={weatherData.current.condition.text}
                     weight={"bold"}
                     size={"1.2em"}
                  />
                  <Typography
                     text={`${weatherData.main.temp}℃`}
                     // text={`${weatherData.current.temp_c}℃`}
                     size={"1.2em"}
                  />
               </WeatherDiv>
            </RowIcon>
            }

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
               <IconButton image={"/cats/caticon.svg"} alt="Items Button" onClick={() => { setItemsShow(true) }} />
               <Typography
                  text={"Items"}
                  weight={"bold"}
                  size={"1.2em"}
               />
            </ColIcon>
            <ItemsSlider active={setItems}
               onExit={() => { setItemsShow(false) }} />

            <ColIcon>
               <AnimatePresence>
                  {CookShow &&
                     <motion.div
                        initial={{ opacity: 0, y: 100, x: "-25%" }}
                        animate={{ opacity: 1, y: 0 }}
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