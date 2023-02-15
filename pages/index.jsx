import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import axios from 'axios';
import CatDexCard from '@/components/Molecules/CatDexCard';
import CatDex from '@/components/Organisms/CatDex';
import UserInterface from '@/components/Organisms/UserInterface';
import Cat from '@/components/Atoms/Cat';
import styled from 'styled-components';
import { selectRandomFromArray, generateRandomNumber } from '@/util';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { auth } from '@/firebase/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import { addCatData, fetchCurrentUserData, updateWeatherData, fetchUserItems, addUserItem } from '@/server';
import Item from '@/components/Atoms/Item';

const GameArea = styled.div`
position:absolute;
width:100vw;
height:100vh;
padding:2.5em;
display:flex;
align-items:center;
justify-content:center;
`

const PopUps = styled.div`
width:100%;
height:100%;
display:flex;
justify-content:center;
align-items:center;
`

export default function Home({ data }) {

  const [cats, setCats] = useState([]);
  const [catDex, setCatDex] = useState(false);
  const [catCard, setCatCard] = useState(0);
  const [randomCats, setRandomCats] = useState([]);
  const [catData, setCatData] = useState([])
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserData, setCurrentUserData] = useState({});
  const [currentItems, setCurrentItems] = useState([]);
  const [activeItems, setActiveItems] = useState([]);

  const [location, setLocation] = useState("Vancouver");
  const [weather, setWeather] = useState();
  const [lang, setLang] = useState("en");
  const [units, setUnits] = useState("metric");

  const weatherUrl = useRef(`/api/weather?lang=${lang}&units=${units}&location=${location}`)
  const catUrl = useRef('/api/catbreed');

  const router = useRouter();

  const [filteredItems, setFilteredItems] = useState([]);

  const fetchWeather = async () => {
    try {
      const weatherResult = await axios.get(weatherUrl.current);
      await updateWeatherData(weatherResult.data.name)
      return weatherResult.data
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
    for (let i = 0; i < amountOfCats; i++) {
      let random = selectRandomFromArray(data);
      const x = generateRandomNumber(5, 90);
      const y = generateRandomNumber(15, 75);
      random.x = `${x}vw`;
      random.y = `${y}vh`;
      randomCats.push(random);
      // addCatData(random)
    }
  }

  const fetchData = async () => {
    const data = await getData();
    console.log(data)
    setCatData(data)
    const amountOfCats = generateRandomNumber(0, 2);
    await generateCats(data, amountOfCats)
  }

  const getData = async () => {
    const catResult = await fetchCats()
    const weatherResult = await fetchWeather()
    const itemsResult = await fetchItems()
    try {
      setCats(catResult)
      setWeather(weatherResult);
      setCurrentItems(itemsResult);
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


  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const currentUserData = await fetchCurrentUserData();
        setCurrentUser(currentUser);
        setCurrentUserData(currentUserData);
        setLocation(currentUserData.location);
        weatherUrl.current = `/api/weather?lang=${lang}&units=${units}&location=${currentUserData.location}`
      } else {
        alert("please log in")
        router.push('/login')
      }
      await fetchData();
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (

    <>
      <Head>
        <title>{`${currentUser.displayName}'s Home - Neko Teikoku`}</title>
      </Head>

      <main className={`${styles.main} background`}>
        {/* <h1>Neko Teikoku</h1> */}
        {currentItems && <UserInterface currentUser={currentUser} filteredItems={filteredItems} currentItems={currentItems} location={location} weatherData={weather} onWeatherSubmit={setNewWeather} onActiveClick={addActiveItem} onWeatherChange={onWeatherChange} onCatDexClick={() => { setCatDex(!catDex) }} />}
        <GameArea id="game">
          <PopUps>
            <CatDex catData={cats} catDex={catDex} onExit={() => { setCatDex(!catDex) }} activeCats={cats} selectCatCard={(id) => { console.log(id); setCatCard(id) }} />
            {cats && cats.map((cat, i) => {
              return (
                <CatDexCard key={i} catData={cat} show={catCard} width={"65%"} onExit={() => { setCatCard(0) }} onCatExit={() => { setCatCard(0); setCatDex(true) }} />
              )
            })}
            {activeItems && activeItems.map((item, i) => {
              return <Item key={i} alt={item.name} image={item.image} />
            })}
          </PopUps>
        </GameArea>

        {randomCats && randomCats.map((cat, i) => {
          return <Cat key={i} catData={cat} bottom={cat.y} right={cat.x} image={'/cats/catrest.svg'} alt={"MEOW MEOW"} onClick={() => { console.log(cat.id); setCatCard(cat.id); }} />
        })}

        {/* <h2 className={styles.head} >meowing @ {weather && weather.name.toLowerCase()}</h2> */}
      </main>
    </>
  )
}


// export async function getServerSideProps(context) {
//   let url = "http://localhost:3000/api/catbreed";
//   // if (process.env.VERCEL_URL) {
//   //   url = `https://${process.env.VERCEL_URL}/api/catbreed`;
//   // }
//   const { data } = await axios({
//     method: 'get',
//     url: url,
//   })
//   return {
//     props: { data }, // will be passed to the page component as props
//   }
// }