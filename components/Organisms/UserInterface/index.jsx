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
padding:2.5em;
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
gap:2em;
`
const ColIcon = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
text-align:${props => props.textAlign || "center"};
cursor:pointer;
pointer-events:auto;
`
const RowIcon = styled.div`
pointer-events:auto;
display:flex;
gap:${props => props.gap || ".5em"};
cursor:pointer;
`
const SliderIcons = styled(motion.div)`
position:absolute;
`
const WeatherDiv = styled.div`
display:flex;
flex-direction:column;
justify-content:space-around;
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
                  weight={"600"}
                  size={"1.2em"}
               />
            </RowIcon>
            {weatherData && <RowIcon>
               <IconButton image={"/cats/caticon.svg"} alt="Weather Icon" />
               <WeatherDiv>
                  <Typography
                     text={weatherData.weather[0].main}
                     weight={"600"}
                     size={"1.2em"}
                  />
                  <Typography
                     text={`${weatherData.main.temp}℃`}
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
                  text={"cat dex"}
                  weight={"600"}
                  size={"1.2em"}
               />
            </ColIcon>
            <ColIcon>
               <IconButton image={"/cats/caticon.svg"} alt="Items Button" onClick={() => { setItemsShow(true) }} />
               <Typography
                  text={"items"}
                  weight={"600"}
                  size={"1.2em"}
               />
            </ColIcon>
            <ItemsSlider active={setItems}
               onExit={() => { setItemsShow(false) }} />

            <ColIcon>
               <AnimatePresence>
                  {CookShow &&
                     <SliderIcons
                        initial={{ opacity: 0, y: 100, x: "-25%" }}
                        animate={{ opacity: 1, y: -125 }}
                        exit={{ opacity: 0, y: 125 }}
                     >
                        <RowIcon gap={"2em"}>
                           <ColIcon>
                              <IconButton image={"/cats/caticon.svg"} alt="Cooking Button" />
                              <Typography
                                 text={"place"}
                                 weight={"600"}
                                 size={"1.2em"}
                              />
                           </ColIcon>
                           <ColIcon>
                              <IconButton image={"/cats/caticon.svg"} alt="Cooking Button" />
                              <Typography
                                 text={"cook"}
                                 weight={"600"}
                                 size={"1.2em"}
                              />
                           </ColIcon>
                        </RowIcon>
                     </SliderIcons>
                  }
               </AnimatePresence>
               <ColIcon onClick={() => { setCookShow(!CookShow) }}>
                  <IconButton image={"/cats/caticon.svg"} alt="Treats Button" />
                  <Typography
                     text={"treats"}
                     weight={"600"}
                     size={"1.2em"}
                  />
               </ColIcon>
            </ColIcon>

         </BottomIcons>
      </UserInterfaceDiv>
   )
}