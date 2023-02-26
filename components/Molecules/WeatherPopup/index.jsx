import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Typography from "@/components/Atoms/Text";
import Image from "next/image";
import IconButton from "@/components/Atoms/IconButton";
import Button from "@/components/Atoms/Button";
import WeatherInput from "@/components/Atoms/WeatherInput";
import { useEffect } from "react";
const WeatherDiv = styled.div`
    background-color: var(--primary);
    display: flex;
    align-items: center;
    border-radius: 1.2em;
    border: 3px solid var(--border);
    border-bottom: 8px solid var(--border);
    padding:1em 0em .5em 0em;
    justify-content: space-around;
    gap:4em;
    pointer-events:auto;
`

const WeatherCol = styled.div`
    display:flex;
    flex-direction:column;
    gap:.5em;
    width:100%:
`
    
const WeatherHighlight = styled.div`
    width:95%;
    height:10px;
    align-self:center;
    border-radius: 0px 0px 1em 1em;
    background-color: var(--light-accent);
`
const ButtonDiv = styled.div`
    pointer-events:auto;
`
const WeatherContainer = styled(motion.div)`
    display:flex;
    gap:.5em;
`
const WeatherRow = styled.div`
    display:flex;
    gap:2em;
    padding:${props => props.padding || "0"};
`

export default function WeatherPopup({
    weatherData,
    active,
    onExit = () => { },
    onWeatherSubmit = () => { },
    onWeatherChange = () => { }
}) {
    const [icon, setIcon] = useState('/weather-icons/clear-sky.png');

    useEffect(() => {
        if(weatherData.weather[0].main == "Clouds"){
            setIcon('/weather-icons/broken-clouds.png');
          } else if(weatherData.weather[0].main == "Clear") {
            setIcon('/weather-icons/clear-sky.png');
          } else if(weatherData.weather[0].main == "Atmosphere") {
            setIcon('/weather-icons/mist.png');
          } else if(weatherData.weather[0].main == "Rain") {
            setIcon('/weather-icons/rain.png');
          } else if(weatherData.weather[0].main == "Drizzle") {
            setIcon('/weather-icons/shower-rain.png');
          } else if(weatherData.weather[0].main == "Snow") {
            setIcon('/weather-icons/snow.png');
          } else if(weatherData.weather[0].main == "Thunderstorm") {
            setIcon('/weather-icons/thunderstorm.png');
          }
    });

    return (
        <AnimatePresence>
            {active &&
                <>
                    <WeatherContainer 
                    initial={{x:"120%"}}
                    animate={{x:0}}
                    exit={{x:"120%"}}
                    transition={{ delay: .01, duration: .5, ease: "easeInOut" }}
                    >
                        <ButtonDiv>
                            <Button onClick={onExit} image="/icons/exit.svg" color="var(--border-light)" alt="exit button" colorhover="var(--border-hard)" imgwidth={37} imgheight={34} />
                        </ButtonDiv>
                        <WeatherCol>
                            <WeatherDiv>
                                <WeatherCol>
                                    <WeatherRow padding={"0em 2em"}>
                                        <WeatherCol>
                                            <Typography text={weatherData.name} weight={"600"}
                                                size={"1.7rem"} />
                                            <Typography text={`${weatherData.main.temp} °C`}
                                                size={"2rem"}
                                                color={"var(--border-hard)"}
                                                weight={"600"} />
                                            <Typography text={weatherData.weather[0].description} />
                                        </WeatherCol>
                                        <IconButton image={icon} alt="Weather Icon" />
                                    </WeatherRow>
                                    <WeatherHighlight />
                                </WeatherCol>
                            </WeatherDiv>
                            <WeatherInput onWeatherChange={onWeatherChange} onSubmit={onWeatherSubmit} />
                        </WeatherCol>
                    </WeatherContainer>
                </>
            }
        </AnimatePresence>
    )
}