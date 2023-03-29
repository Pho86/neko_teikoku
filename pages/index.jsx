import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import axios from 'axios';
import { selectRandomFromArray, generateRandomNumber } from '@/util';
import { useEffect, useState, useRef, createContext, useContext } from 'react';
import useSound from 'use-sound';
import { useRouter } from 'next/router';
import { auth } from '@/firebase/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import { addCatData, fetchCurrentUserData, updateWeatherData, fetchUserItems, addUserOfferings, fetchUserOfferings, changeUserOfferingState, fetchUserTreats, fetchCatData, adjustUserTreat, updateUserData, fetchLeaderboard, addUserItem } from '@/server';
import CatDexCard from '@/components/Molecules/CatDexCard';
import UserInterface from '@/components/Organisms/UserInterface';
import Cat from '@/components/Atoms/Cat';
import styled from 'styled-components';
import ItemData from "@/data/items.json"
import TreatsData from "@/data/treats.json"
import CatData from "@/data/cat.json"
import Item from '@/components/Atoms/Item';
import Treats from '@/components/Atoms/Treats';
import { EmptySpace } from '@/components/Atoms/EmptySpacer';
import Advisor from '@/components/Atoms/Advisor';
import OfferingsData from "@/data/ingredients.json";
import { GameContext } from './_app';
import Loader from '@/components/Molecules/Loader';

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

  // user data
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserData, setCurrentUserData] = useState([])
  const [currentItems, setCurrentItems] = useState([]);
  const [activeItems, setActiveItems] = useState([]);
  const [activetreats, setActiveTreats] = useState([]);
  const [currentOfferings, setCurrentOfferings] = useState([])
  const [currentTreats, setCurrentTreats] = useState([]);
  const [currentLeaderboard, setCurrentLeaderboard] = useState([])

  // user weather data
  const [location, setLocation] = useState("Vancouver");
  const [weather, setWeather] = useState();
  const [lang, setLang] = useState("en");
  const [units, setUnits] = useState("metric");
  const [background, setBackground] = useState('day');

  // api urls
  const weatherUrl = useRef(`/api/weather?lang=${lang}&units=${units}&location=${location}`)
  const catUrl = useRef('/api/catbreed');

  // sound data
  const { Volume, setVolume, BGMVolume } = useContext(GameContext)
  const [bgm, bgmController] = useSound('/music/bgm1.mp3', {
    volume: BGMVolume - .1, autoplay: true, loop: true,
  }
  );
  const router = useRouter();

  const fetchWeather = async () => {
    try {
      const weatherResult = await axios.get(weatherUrl.current);
      await updateWeatherData(weatherResult.data.name)
      const weather = weatherResult.data
      if (weather) {
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

  const fetchUserItem = async () => {
    const itemsResult = await fetchUserItems();
    return itemsResult
  }

  const fetchUserTreat = async () => {
    const treatsResult = await fetchUserTreats();
    return treatsResult
  }

  const fetchUserCats = async () => {
    const catsResult = await fetchCatData();
    return catsResult
  }

  const fetchCatsData = async () => {
    const catResults = await axios.get(catUrl.current);
    return catResults.data
  }

  const generateCats = async (data, amountOfCats) => {
    let randomMeows = randomCats;
    for (let i = 0; i < amountOfCats; i++) {
      let randomCat = await selectRandomFromArray(data);
      await addCatData(randomCat)
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
      let offering = await selectRandomFromArray(OfferingsData)
      offering.cat = randomCat.breedName
      await addUserOfferings(offering);
      randomMeows.push(randomCat)
    }
    const offerings = await fetchOfferings();
    const newCats = await fetchCats();
    setRandomCats(randomMeows)
    await updateUserData(newCats);
    setCurrentOfferings(offerings);
    await fetchLeaderboardUsers();
  }

  const filterItems = async (items) => {
    await ItemData.filter((item) => {
      for (let i = 0; i < items.length; i++) {
        if (item.id === items[i].itemID) {
          item.count = items[i].count
          item.itemID = items[i].id
        }
      }
    })
    return ItemData
  }

  const filterOfferings = async (offerings) => {
    await OfferingsData.filter((item) => {
      for (let i = 0; i < offerings.length; i++) {
        if (item.id === offerings[i].itemID) {
          item.count = offerings[i].count
          item.cat = offerings[i].cat
          item.state = offerings[i].state
          item.itemID = offerings[i].id
        }
      }
    })
    return OfferingsData
  }

  const filterTreats = async (treats) => {
    await TreatsData.filter((treat) => {
      for (let i = 0; i < treats.length; i++) {
        if (treat.id === treats[i].itemID) {
          treat.count = treats[i].count
          treat.itemID = treats[i].id
        }
      }
    })
    return TreatsData
  }

  const filterNewCats = async (apiCats, userCats) => {
    await apiCats.filter(async (cat) => {
      for (let i = 0; i < userCats.length; i++) {
        if (cat.id === userCats[i].catId) {
          cat.img = await selectRandomFromArray(CatData);
          cat.count = userCats[i].count;
        }
      }
    })
    return apiCats
  }

  const filterCats = async (userCats) => {
    await cats.filter((cat) => {
      for (let i = 0; i < userCats.length; i++) {
        if (cat.id === userCats[i].catId) {
          cat.count = userCats[i].count;
        }
      }
    })
    return cats
  }

  const fetchOfferings = async () => {
    const offeringsResult = await fetchUserOfferings();
    const filteredOfferings = await filterOfferings(offeringsResult);
    return filteredOfferings
  }

  const fetchItems = async () => {
    const itemsResult = await fetchUserItem();
    const filteredItems = await filterItems(itemsResult);
    return filteredItems;
  }

  const fetchTreats = async () => {
    const treatsResult = await fetchUserTreat();
    const filteredTreats = await filterTreats(treatsResult)
    return filteredTreats
  }

  const fetchNewCats = async () => {
    const catAPIResult = await fetchCatsData();
    const catUserResult = await fetchUserCats();
    const filteredCats = await filterNewCats(catAPIResult, catUserResult)
    return filteredCats
  }

  const fetchCats = async () => {
    const catUserResult = await fetchUserCats();
    const filteredCats = await filterCats(catUserResult)
    return filteredCats
  }

  const fetchAllData = async () => {
    const catsResult = await fetchNewCats();
    const weatherResult = await fetchWeather();
    const offerings = await fetchOfferings();
    const items = await fetchItems();
    const treats = await fetchTreats();
    await fetchLeaderboardUsers();
    try {
      setWeather(weatherResult);
      setCurrentItems(items);
      setCurrentOfferings(offerings);
      setCurrentTreats(treats)
      setCats(catsResult);
    }
    catch (error) {
      console.log(error)
    }
  }

  const fetchLeaderboardUsers = async () => {
    const users = await fetchLeaderboard();
    setCurrentLeaderboard(users)
  }

  const addActiveItem = async (item) => {
    if (item.count >= 1) {
      setActiveItems([...activeItems, item])
      item.count -= 1
      soundPlace();
    }
  }
  const [soundPlace] = useSound('/sound/place.mp3', { volume: Volume-.3, });

  const addTreat = async (treat) => {
    if (treat.count > 0) {
      const treats = await adjustUserTreat(treat)
      setActiveTreats([treat])
      treat.count -= 1
      soundPlace();
      setTimeout(async () => {
        const amountOfCats = generateRandomNumber(1, 3);
        await generateCats(cats, amountOfCats)
        await fetchCats();
      }, 1500);
    }
  }

  const setOfferings = async (offerings) => {
    offerings.filter(async (offers) => {
      if (offers.state === false) {
        for (let i = 0; i < offerings.length; i++) {
          if (currentOfferings[offerings[i].id - 1].state === false) {
            await changeUserOfferingState(offerings[i]);
          }
        }
      }
    })
    const fetchedOfferings = await fetchOfferings();
    setCurrentOfferings(fetchedOfferings)
  }
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser != null) {
        const currentUserData = await fetchCurrentUserData();
        setCurrentUser(currentUser);
        setCurrentUserData(currentUserData)
        setLocation(currentUserData.location);
        weatherUrl.current = `/api/weather?lang=${lang}&units=${units}&location=${currentUserData.location}`
        await fetchAllData();
        setLoading(false)
        // for (let i = 0; i < ItemData.length; i++) {
        //   await addUserItem(ItemData[i])
        // }
      } else {
        await router.push('/login')
        await router.reload()
      }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (

    <>
      <Head>
        <title>{`${currentUser.displayName}'s Home - Neko Teikoku`}</title>
      </Head>
        <Loader active={loading}/>

      <main className={`${styles.main} background`} style={{ backgroundImage: (`url('/backgrounds/${background}.png')`) }}>
        {/* <h1>Neko Teikoku</h1> */}
        <EmptySpace />

        <userContext.Provider value={{ weather, currentUser, currentOfferings, currentItems, currentTreats, setCurrentOfferings, setCurrentTreats, setOfferings, fetchTreats, fetchItems, fetchOfferings, bgm, bgmController, currentLeaderboard, cats, currentUserData, fetchLeaderboardUsers, catDex, setCatDex }}>
          {currentUser && <UserInterface location={location} onWeatherSubmit={setNewWeather} onActiveClick={addActiveItem} onWeatherChange={onWeatherChange} onTreatClick={addTreat} selectCatCard={(id) => { setCatCard(id) }} />}
          <GameArea id="game">

            {cats && cats.map((cat, i) => {
              return <CatDexCard key={i} catData={cat} show={catCard} width={"65%"} onExit={() => { setCatCard(0) }} onCatExit={() => { setCatCard(0); setCatDex(true) }} />
            })}

            <Advisor />

            {activeItems && activeItems.map((item, i) => {
              return <Item key={i} alt={item.name} image={item.image} />
            })}

            {randomCats && randomCats.map((cat, i) => {
              return <Cat key={i} catData={cat} bottom={cat.y} right={cat.x} image={cat.img} alt={`${cat.breedName} image resting`} onClick={() => { setCatCard(cat.id); }} />
            })}

            {activetreats && activetreats.map((treat, i) => {
              return <Treats key={i} alt={treat.name} image={treat.image} />
            })}

          </GameArea>
        </userContext.Provider>


        <h2 className={styles.head} id="meowing" >meowing @ {weather && weather.name.toLowerCase()}</h2>

      </main>
    </>
  )
}