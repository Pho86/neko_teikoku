import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import axios from 'axios';
import { selectRandomFromArray, generateRandomNumber } from '@/util';
import { useEffect, useState, useRef, createContext } from 'react';
import useSound from 'use-sound';
import { useRouter } from 'next/router';
import { auth } from '@/firebase/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import { addCatData, fetchCurrentUserData, updateWeatherData, fetchUserItems, addUserItem, addUserTreat, addUserOfferings, fetchUserOfferings, changeUserOfferingState } from '@/server';
import CatDexCard from '@/components/Molecules/CatDexCard';
import CatDex from '@/components/Organisms/CatDex';
import UserInterface from '@/components/Organisms/UserInterface';
import Cat from '@/components/Atoms/Cat';
import styled from 'styled-components';
import ItemData from "@/data/items.json"
import TreatsData from "@/data/treats.json"
import Item from '@/components/Atoms/Item';
import Treats from '@/components/Atoms/Treats';
import { EmptySpace } from '@/components/Atoms/EmptySpacer';
import Advisor from '@/components/Atoms/Advisor';
import OfferingsData from "@/data/ingredients.json"

const GameArea = styled.div`
position:absolute;
width:100vw;
height:100vh;
padding:2.5em;
display:flex;
align-items:center;
justify-content:center;
pointer-events:auto;
`

const PopUps = styled.div`
width:100%;
height:100%;
display:flex;
justify-content:center;
align-items:center;
position:absolute;
pointer-events:none;
`

export const userContext = createContext()

export default function Home() {

  // game data
  const [cats, setCats] = useState([]);
  const [catDex, setCatDex] = useState(false);
  const [catCard, setCatCard] = useState(0);
  const [randomCats, setRandomCats] = useState([]);
  const [catData, setCatData] = useState([]);

  // user data
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserData, setCurrentUserData] = useState({});
  const [currentItems, setCurrentItems] = useState([]);
  const [activeItems, setActiveItems] = useState([]);
  const [activetreats, setActiveTreats] = useState([]);
  const [currentOfferings, setCurrentOfferings] = useState([])
  const [currentTreats, setCurrentTreats] = useState([])

  // user weather data
  const [location, setLocation] = useState("Vancouver");
  const [weather, setWeather] = useState();
  const [lang, setLang] = useState("en");
  const [units, setUnits] = useState("metric");
  const [background, setBackground] = useState('day')

  // api urls
  const weatherUrl = useRef(`/api/weather?lang=${lang}&units=${units}&location=${location}`)
  const catUrl = useRef('/api/catbreed');

  // sound data
  const [Volume, setVolume] = useState(1);
  const [bgm1] = useSound('/music/bgm1.mp3', { volume: Volume, loop: true, interrupt: true });
  const [bgm2] = useSound('/music/bgm2.mp3', { volume: Volume, });

  const router = useRouter();


  const fetchWeather = async () => {
    try {
      const weatherResult = await axios.get(weatherUrl.current);
      await updateWeatherData(weatherResult.data.name)
      const weather = weatherResult.data
      if (weather) {
        console.log(weather)
        if (weather.rain) {
          setBackground('rain')
        }
        else if (weather.weather[0].main === "Snow") {
          setBackground('snow')
        }
        else if (weather.clouds.all > 50) {
          setBackground('night')
        }
        else {
          setBackground('day')
        }
      }
      return weather
    } catch (error) {
      setLocation("Vancouver");
      alert("an error has occured, your location has been reset to vancouver")
      const weatherResult = await axios.get(`/api/weather?lang=${lang}&units=${units}&location=Vancouver`)
      return weatherResult.data
    }
  }

  const setNewWeather = async () => {
    const weatherResult = await fetchWeather();
    setWeather(weatherResult);
  }

  const onWeatherChange = async (value) => {
    setLocation(value.target.value)
    weatherUrl.current = `/api/weather?lang=${lang}&units=${units}&location=${value.target.value}`
  }

  const fetchItems = async () => {
    const itemsResult = await fetchUserItems();
    return itemsResult
  }

  const fetchCats = async () => {
    const catResults = await axios.get(catUrl.current);
    return catResults.data
  }

  const generateCats = async (data, amountOfCats) => {
    let randomMeows = randomCats;
    for (let i = 0; i < amountOfCats; i++) {
      let randomCat = await selectRandomFromArray(data);
      const x = generateRandomNumber(0, 100);
      let y;
      randomCat.x = x;
      if (x < 15 || x < 85) y = generateRandomNumber(0, 100);
      else if (x > 15 || x < 85) {
        let helper = generateRandomNumber(1, 2)
        if (helper === 1) y = generateRandomNumber(90, 100)
        if (helper === 2) y = generateRandomNumber(0, 15)
      }
      randomCat.y = y;
      randomMeows.push(randomCat)
      let offering = selectRandomFromArray(OfferingsData)
      // let offering = OfferingsData[2]
      offering.cat = randomCat.breedName
      setCurrentOfferings([...currentOfferings, offering])
      await addUserOfferings(offering);
    }
    for (let i = 0; i < randomMeows.length; i++) {
      setRandomCats([...randomCats, randomMeows[i]])
    }
    const offerings = await fetchOfferings();
    setCurrentOfferings(offerings)
  }

  const filterItems = async (items) => {
    await ItemData.filter((item, index) => {
      for (let i = 0; i < items.length; i++) {
        if (item.id === items[i].itemID) {
          item.count = items[i].count
        }
      }
    })
    return ItemData
  }
  const filterOfferings = async (offerings) => {
    await OfferingsData.filter((item, index) => {
      for (let i = 0; i < offerings.length; i++) {
        if (item.id === offerings[i].itemID) {
          item.count = offerings[i].count
          item.cat = offerings[i].cat
          item.catImg = offerings[i].catImg
          item.state = offerings[i].state
          item.itemID = offerings[i].id
        }
      }
    })
    return OfferingsData
  }

  const fetchData = async () => {
    const data = await getData();
    console.log(data)
    setCatData(data)
  }

  const fetchOfferings = async () => {
    const offeringsResult = await fetchUserOfferings();
    const filteredOfferings = await filterOfferings(offeringsResult);
    return filteredOfferings
  }
  const getData = async () => {
    const catResult = await fetchCats();
    const weatherResult = await fetchWeather();
    const itemsResult = await fetchItems();
    const filteredItems = await filterItems(itemsResult);
    const offerings = await fetchOfferings();
    try {
      setCats(catResult)
      setWeather(weatherResult);
      setCurrentItems(filteredItems);
      setCurrentOfferings(offerings);
      return catResult
    }
    catch (error) {
      console.log(error)
    }
  }


  const addActiveItem = async (item) => {
    if (item.count >= 1) {
      setActiveItems([...activeItems, item])
      item.count -= 1
    }
  }

  const addTreat = async (treat) => {
    setActiveTreats([treat])
    treat.count -= 1
    setTimeout(async () => {
      const amountOfCats = generateRandomNumber(1, 3);
      await generateCats(catData, amountOfCats)
    }, 1500)
  }

  const Playit = () => {
    var audio = new Audio({ src: ["/music/bgm1.mp3"], Volume: .5 });
    audio.play();
  }

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser != null) {
        // Playit()
        const currentUserData = await fetchCurrentUserData();
        setCurrentUser(currentUser);
        setCurrentUserData(currentUserData);
        setLocation(currentUserData.location);
        weatherUrl.current = `/api/weather?lang=${lang}&units=${units}&location=${currentUserData.location}`
        await fetchData();

        // PLACEHOLDER FOR TESTING
        await addUserItem(ItemData[0]);
        await addUserTreat(TreatsData[0]);
      } else {
        router.push('/login')
        // alert("please log in")
      }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const setOfferings = async (offerings) => {
    let offers = currentOfferings
    offerings.filter((offers)=> {
      if(offers.state === false) {
        offers.state = true
      }
    })
    // for (let i = 0; i < offerings.length; i++) {
    //   if (offers[offerings[i].id - 1].state === false) {
    //     offers[offerings[i].id - 1].state = true
    //     console.log(offers[offerings[i].id - 1])
    //     await changeUserOfferingState(offerings[i]);
    //   }
    // }
    console.log(offerings)
    setCurrentOfferings(offers)
  }
  return (

    <>
      <Head>
        <title>{`${currentUser.displayName}'s Home - Neko Teikoku`}</title>
      </Head>

      <main className={`${styles.main} background`} style={{ backgroundImage: (`url('/backgrounds/${background}.png')`) }}>
        {/* <h1>Neko Teikoku</h1> */}
        <EmptySpace />
        <userContext.Provider value={{ weather, currentUser, currentOfferings, currentItems, currentTreats, setCurrentOfferings, Volume, setOfferings }}>
          {currentUser && <UserInterface location={location} onWeatherSubmit={setNewWeather} onActiveClick={addActiveItem} onWeatherChange={onWeatherChange} onTreatClick={addTreat} onCatDexClick={() => { setCatDex(!catDex) }} />}
        </userContext.Provider>
        <GameArea id="game">

          <PopUps>
            <CatDex catData={cats} catDex={catDex} onExit={() => { setCatDex(!catDex) }} activeCats={cats} selectCatCard={(id) => { setCatCard(id) }} />
          </PopUps>

          {cats && cats.map((cat, i) => {
            return <CatDexCard key={i} catData={cat} show={catCard} width={"65%"} onExit={() => { setCatCard(0) }} onCatExit={() => { setCatCard(0); setCatDex(true) }} />
          })}

          <Advisor />

          {activeItems && activeItems.map((item, i) => {
            return <Item key={i} alt={item.name} image={item.image} />
          })}

          {randomCats && randomCats.map((cat, i) => {
            return <Cat key={i} catData={cat} bottom={cat.y} right={cat.x} image={'/cats/catrest.svg'} alt={"MEOW MEOW"} onClick={() => { setCatCard(cat.id); }} />
          })}

          {activetreats && activetreats.map((treat, i) => {
            return <Treats key={i} alt={treat.name} image={treat.image} />
          })}

        </GameArea>



        <h2 className={styles.head} >meowing @ {weather && weather.name.toLowerCase()}</h2>

      </main>
    </>
  )
}