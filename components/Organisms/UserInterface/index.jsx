import styled from "styled-components";
import IconButton from "@/components/Atoms/IconButton";
import Typography from "@/components/Atoms/Text";
import { m, AnimatePresence } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import ItemsSlider from "@/components/Organisms/ItemsSlider";
import TreatsSlider from "../TreatsSlider";
import TreatsDex from "../TreatsDex";
import WeatherPopup from "@/components/Molecules/WeatherPopup";
import { StrokedText } from 'stroked-text';
import SettingsPopup from "@/components/Molecules/SettingsPopup";
import Image from "next/image";
import { userContext } from "@/pages";
import Offerings from "@/components/Molecules/OfferingPopup";
import LeaderboardDex from "@/components/Organisms/LeaderboardDex"
import CatDex from "../CatDex";

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
background-color: rgba(254, 249, 237, 0.8);
padding:.5em 2em;
gap:2em;
border-radius:1.5em;
border: 0px solid var(--border-hard);
border-left: 5px solid var(--border-hard);
align-self:flex-start;
transition: all .15s ease-in-out;
display: flex;
align-items: center;
&:hover {
   border: 3px solid var(--border-hard);
   background-color: var(--primary);
}
`

const WeatherCol = styled.div`
display:flex;
flex-direction:column;
gap:1.5em;
align-self:flex-start;
`

const WeatherRow = styled(RowIcon)`
background-color: rgba(254, 249, 237, 0.8);
border: 0px solid var(--border-hard);
border-right: 5px solid var(--border-hard);
padding:.5em 1.5em;
gap:2em;
border-radius:1.5em;
align-self:flex-end;
display:flex;
transition: all .15s ease-in-out;
&:hover {
   background-color:var(--primary);
   border: 3px solid var(--border-hard);
}
`

const SliderIcons = styled(m.div)`
position:absolute;
`

const WeatherDiv = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
gap:.3em;
text-align:center;
`

const SettingsDiv = styled(m.div)`
   display:flex;
   flex-direction:column;
   gap:1.5em;
   align-self:flex-start;
`

const TextCont = styled.div`
   display:flex;
   flex-direction: column;
   gap: 0.5em;
   display: flex;
   align-items: flex-start;
`

const SettingIcon = styled.div`
   display: flex;
   align-items: center;
   gap: .5em;
`



export default function UserInterface({
   onWeatherSubmit = () => { },
   onWeatherChange = () => { },
   location,
   onActiveClick = (item) => { return item },
   onTreatClick = (treat) => { return treat },
   selectCatCard = (id) => { return id; },
}) {
   const [cookShow, setCookShow] = useState(false);
   const [expanded, setExpanded] = useState(false);
   const [setItems, setItemsShow] = useState(false);
   const [treats, setTreatsShow] = useState(false);
   const [offer, setOfferShow] = useState(false);
   const [weatherShow, setWeatherShow] = useState(false);
   const [settings, setSettings] = useState(false);
   const [icon, setIcon] = useState('/weather-icons/clear-sky.gif');
   const { weather, currentUser, cats, currentUserData, catDex, setCatDex } = useContext(userContext);
   const [leaderboard, setLeaderboard] = useState(false);
   useEffect(() => {
      if (weather) {
         if (weather.weather[0].main == "Clouds") {
            setIcon('/weather-icons/scattered-clouds.gif');
         } else if (weather.weather[0].main == "Clear") {
            setIcon('/weather-icons/clear-sky.gif');
         } else if (weather.weather[0].main == "Atmosphere") {
            setIcon('/weather-icons/mist.gif');
         } else if (weather.weather[0].main == "Rain") {
            setIcon('/weather-icons/rain.gif');
         } else if (weather.weather[0].main == "Drizzle") {
            setIcon('/weather-icons/shower-rain.gif');
         } else if (weather.weather[0].main == "Snow") {
            setIcon('/weather-icons/snow.gif');
         } else if (weather.weather[0].main == "Thunderstorm") {
            setIcon('/weather-icons/thunderstorm.gif');
         }
      }
   }, [weather]);
   return (
      <>
         <UserInterfaceDiv>
            <TopIcons>
               <RowIcon>
                  <WeatherCol>
                     <ProfileRow
                        onClick={() => { setSettings(!settings) }}
                        id="logout"
                     >
                        <IconButton image={currentUserData.avatar ? currentUserData.avatar : "/user/pfp.svg"} alt="Profile Icon" />
                        <TextCont>
                           <StrokedText fill='var(--white)' stroke='var(--border-hard)' strokeWidth={5} style={{
                              fontSize: '1.5rem',
                           }}>
                              {currentUser.displayName}
                           </StrokedText>
                           <SettingIcon>
                              <StrokedText fill='var(--white)' stroke='var(--button-medium)' strokeWidth={5} style={{
                                 fontSize: '1.2rem',
                              }}>
                                 settings
                              </StrokedText>
                              <Image
                                 src={'/icons/settingsIcon.svg'}
                                 width={25}
                                 height={25}
                                 alt={"settings gear logo"}
                              />
                           </SettingIcon>
                        </TextCont>
                     </ProfileRow>
                     <AnimatePresence>
                        {
                           settings && <SettingsDiv
                              initial={{ x: "-120%" }}
                              animate={{ x: -0 }}
                              exit={{ x: "-120%" }}
                              transition={{ duration: .5 }}>
                              <SettingsPopup onExit={() => { setSettings(false) }} />
                           </SettingsDiv>
                        }
                     </AnimatePresence>
                  </WeatherCol>

               </RowIcon>
               <WeatherCol>
                  {weather && <>
                     <WeatherRow onClick={() => { setWeatherShow(!weatherShow) }} id="weather">
                        <IconButton image={icon} alt="Weather Icon" />
                        <WeatherDiv>
                           <Typography
                              text={weather.weather[0].main}
                              weight={"600"}
                              size={"1.2rem"}
                           />
                           <Typography
                              text={`${weather.main.temp} °C`}
                              size={"1.8rem"}
                              color={"var(--border-hard)"}
                              weight={"500"}
                           />
                        </WeatherDiv>
                     </WeatherRow>
                     <WeatherPopup location={location} onWeatherChange={onWeatherChange} onWeatherSubmit={onWeatherSubmit} active={weatherShow} onExit={() => { setWeatherShow(false) }} />
                  </>
                  }
               </WeatherCol>

            </TopIcons>
            <BottomIcons>
               <ColIcon onClick={()=> { setCatDex(true) }} id="catdex">
                  <IconButton image={"/menuIcons/catdex.svg"} alt="CatDex Button" type={'menu'} />
                  <Typography
                     text={"cat dex"}
                     weight={"600"}
                     size={"1.2rem"}
                  />
               </ColIcon>
               <ColIcon onClick={() => { setItemsShow(true) }}>
                  <IconButton image={"/menuIcons/items.svg"} alt="Items Button" type={'menu'} />
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
                                 <IconButton image={"/menuIcons/place.svg"} alt="Cooking Button" onClick={() => { setTreatsShow(true) }} type={'menu'} />
                                 <Typography
                                    text={"place"}
                                    weight={"600"}
                                    size={"1.2rem"}
                                 />
                              </ColIcon>
                              <ColIcon>
                                 <IconButton image={"/menuIcons/cook.svg"} alt="Cooking Button" onClick={() => { setCookShow(true) }} type={'menu'} />
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
                     <IconButton image={"/menuIcons/treats.svg"} alt="Treats Button" type={'menu'} />
                     <Typography
                        text={"treats"}
                        weight={"600"}
                        size={"1.2rem"}
                     />
                  </ColIcon>
               </ColIcon>

               <ColIcon onClick={() => { setOfferShow(true) }}>
                  <IconButton image={"/menuIcons/offerings.svg"} alt="Offerings Button" type={'menu'} />
                  <Typography
                     text={"offerings"}
                     weight={"600"}
                     size={"1.2rem"}
                  />
               </ColIcon>

               <ColIcon onClick={() => { setLeaderboard(true) }}>
                  <IconButton image={"/menuIcons/leaderboard.svg"} alt="Leaderboard Button" type={'menu'} />
                  <Typography
                     text={"leaderboard"}
                     weight={"600"}
                     size={"1.2rem"}
                  />
               </ColIcon>

            </BottomIcons>
            <TreatsSlider active={treats}
               onExit={() => { setTreatsShow(false) }} onTreatClick={onTreatClick} />
            <ItemsSlider onActiveClick={onActiveClick} active={setItems}
               onExit={() => { setItemsShow(false) }} />
         </UserInterfaceDiv>

         <Offerings active={offer} btnText={"ACKNOWLEDGE ALL"}
            onExit={() => { setOfferShow(false) }}
         />

         <TreatsDex active={cookShow}
            onExit={() => { setCookShow(false) }} />
         <CatDex catData={cats} active={catDex} onExit={() => { setCatDex(false) }} activeCats={cats} selectCatCard={(id) => { selectCatCard(id) }} />
         <LeaderboardDex active={leaderboard}
            onExit={() => { setLeaderboard(false) }} />

      </>
   )
}