import styled from "styled-components";
import IconButton from "@/components/Atoms/IconButton";
import Typography from "@/components/Atoms/Text";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import ItemsSlider from "@/components/Organisms/ItemsSlider";
import TreatsSlider from "../TreatsSlider";
import TreatsDex from "../TreatsDex";
import WeatherPopup from "@/components/Molecules/WeatherPopup";
import { StrokedText } from 'stroked-text';
import SettingsPopup from "@/components/Molecules/SettingsPopup";

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
align-items:flex-start;
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

const ProfileRow = styled(RowIcon)`
padding:.5em 2em;
gap:2em;
border-radius:1em;
align-self:flex-start;
transition: all .2s ease-in-out;
&:hover {
   box-shadow: 4px 4px 4px 0px #D9D9D9;
}
`

const WeatherCol = styled.div`
display:flex;
flex-direction:column;
gap:1.5em;
align-self:end;
`

const WeatherRow = styled(RowIcon)`
background-color:var(--primary);
padding:.5em 1.5em;
gap:2em;
border-radius:1em;
align-self:flex-end;
display:flex;
transition: all .2s ease-in-out;
// justify-self:auto;
&:hover {
   box-shadow: 4px 4px 4px 0px #D9D9D9;
}
`

const SliderIcons = styled(motion.div)`
position:absolute;
`

const WeatherDiv = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
gap:.3em;
text-align:center;
`
const SettingsDiv = styled.div`
   // display:flex;
   // flex-direction:column;
   // // justify-content:center;
   // // gap:.3em;
   // position: absolute;

   display:flex;
   flex-direction:column;
   gap:1.5em;
   align-self:flex-start;
`

export default function UserInterface({
   weatherData,
   currentUser,
   onCatDexClick = () => { },
   onWeatherSubmit = () => { },
   onWeatherChange = () => { },
   location,
   currentItems,
   filteredItems,
   onActiveClick = (item) => { return item },
}) {
   const [cookShow, setCookShow] = useState(false);
   const [expanded, setExpanded] = useState(false);
   const [setItems, setItemsShow] = useState(false);
   const [treats, setTreatsShow] = useState(false);
   const [weatherShow, setWeatherShow] = useState(false);
   const [settings, setSettings] = useState(false);

   useEffect(() => {

   }, [])

   return (
      <>
         <UserInterfaceDiv>
            <TopIcons>
               <RowIcon>
                  <WeatherCol>
                     <ProfileRow
                        onClick={() => { setSettings(!settings) }}
                     >
                        <IconButton image={"/cats/caticon.svg"} alt="Profile Icon" />
                        <StrokedText fill='var(--white)' stroke='var(--border-hard)' strokeWidth={5} style={{
                           fontSize: '1.5rem',
                        }}>
                           {currentUser.displayName}
                        </StrokedText>
                     </ProfileRow>

                     {

                        settings && <SettingsDiv>
                           <SettingsPopup onExit={() => { setSettings(false) }} />
                        </SettingsDiv>
                     }
                  </WeatherCol>

               </RowIcon>
               <WeatherCol>
                  {weatherData && <>
                     <WeatherRow onClick={() => { setWeatherShow(!weatherShow) }}>
                        <IconButton image={"/cats/caticon.svg"} alt="Weather Icon" />
                        <WeatherDiv>
                           <Typography
                              text={weatherData.weather[0].main}
                              weight={"600"}
                              size={"1.2rem"}
                           />
                           <Typography
                              text={`${weatherData.main.temp} °C`}
                              size={"1.8rem"}
                              color={"var(--border-hard)"}
                              weight={"500"}
                           />
                        </WeatherDiv>
                     </WeatherRow>
                     <WeatherPopup weatherData={weatherData} location={location} onWeatherChange={onWeatherChange} onWeatherSubmit={onWeatherSubmit} active={weatherShow} onExit={() => { setWeatherShow(false) }} />
                  </>
                  }
               </WeatherCol>

            </TopIcons>
            <BottomIcons>
               <ColIcon onClick={onCatDexClick}>
                  <IconButton image={"/cats/caticon.svg"} alt="CatDex Button" />
                  <Typography
                     text={"cat dex"}
                     weight={"600"}
                     size={"1.2rem"}
                  />
               </ColIcon>
               <ColIcon onClick={() => { setItemsShow(true) }}>
                  <IconButton image={"/cats/caticon.svg"} alt="Items Button" />
                  <Typography
                     text={"items"}
                     weight={"600"}
                     size={"1.2rem"}
                  />
               </ColIcon>

               <ColIcon>
                  <AnimatePresence>
                     {expanded &&
                        <SliderIcons
                           initial={{ opacity: 0, y: 100, x: "-25%" }}
                           animate={{ opacity: 1, y: -125 }}
                           exit={{ opacity: 0, y: 125 }}
                           transition={{ duration: .25 }}
                        >
                           <RowIcon gap={"2em"}>
                              <ColIcon>
                                 <IconButton image={"/cats/caticon.svg"} alt="Cooking Button" onClick={() => { setTreatsShow(true) }} />
                                 <Typography
                                    text={"place"}
                                    weight={"600"}
                                    size={"1.2rem"}
                                 />
                              </ColIcon>
                              <ColIcon>
                                 <IconButton image={"/cats/caticon.svg"} alt="Cooking Button" onClick={() => { setCookShow(true) }} />
                                 <Typography
                                    text={"cook"}
                                    weight={"600"}
                                    size={"1.2rem"}
                                 />
                              </ColIcon>
                           </RowIcon>
                        </SliderIcons>
                     }
                  </AnimatePresence>
                  <ColIcon onClick={() => { setExpanded(!expanded) }}>
                     <IconButton image={"/cats/caticon.svg"} alt="Treats Button" />
                     <Typography
                        text={"treats"}
                        weight={"600"}
                        size={"1.2rem"}
                     />
                  </ColIcon>
               </ColIcon>

               <ColIcon onClick={() => { }}>
                  <IconButton image={"/cats/caticon.svg"} alt="Offerings Button" />
                  <Typography
                     text={"offerings"}
                     weight={"600"}
                     size={"1.2rem"}
                  />
               </ColIcon>

            </BottomIcons>
            <TreatsSlider active={treats}
               onExit={() => { setTreatsShow(false) }} />
            {currentItems && <ItemsSlider onActiveClick={onActiveClick} filteredItems={filteredItems} currentItems={currentItems} active={setItems}
               onExit={() => { setItemsShow(false) }} />}

         </UserInterfaceDiv>
         <TreatsDex active={cookShow}
            onExit={() => { setCookShow(false) }} />

      </>
   )
}