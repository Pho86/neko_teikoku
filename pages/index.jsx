import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import CatDexCard from '@/components/Molecules/CatDexCard';
import CatDex from '@/components/Organisms/CatDex';
import UserInterface from '@/components/Organisms/UserInterface';
import Cat from '@/components/Atoms/Cat';
import { selectRandomFromArray, generateRandomNumber } from '@/util';
import styled from 'styled-components';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/firebase.config';
import { useRouter } from 'next/router';
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
  const [randomCats, setRandomCats] = useState([])
  const [location, setLocation] = useState("Vancouver");
  const [weather, setWeather] = useState();
  const [currentUser, setCurrentUser] = useState({})

  let lang = "en";
  let units = "metric";

  let catUrl = '/api/catbreed'
  let openWeatherURL = `/api/weather?lang=${lang}&units=${units}&location=${location}`;

  const router = useRouter();

  const getData = async () => {
    const result = await axios.get(catUrl)
    const weatherResult = await axios.get(openWeatherURL)
    try {
      setCats(result.data)
      setWeather(weatherResult.data);
      console.log(weatherResult.data)
      return result.data
    }
    catch (error) {
      console.log(error)
    }
  }

  const RefreshData = async () => {
    const amountOfCats = generateRandomNumber(0, 2);
    setRandomCats([])
    for (let i = 0; i < amountOfCats; i++) {
      let random = selectRandomFromArray(cats);
      randomCats.push(random)
    }
  }


  async function fetchData() {
    const data = await getData();
    const amountOfCats = generateRandomNumber(0, 3);
    for (let i = 0; i < amountOfCats; i++) {
      let random = selectRandomFromArray(data);
      const x = generateRandomNumber(5, 90);
      const y = generateRandomNumber(15, 75);
      random.x = `${x}vw`;
      random.y = `${y}vh`;
      randomCats.push(random)
    }
  }
  useEffect(() => {
    fetchData();
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setCurrentUser(currentUser);
        console.log(currentUser)
      } else {
        alert("please log in")
        router.push('/login')
      }
    })
    // setInterval(() => {
    // RefreshData();
    // }, 10000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (

    <>
      <Head>
        <title>Your Home - Neko Teikoku</title>
      </Head>

      <main className={`${styles.main} background`}>
        <h1>Neko Teikoku</h1>
        <UserInterface currentUser={currentUser} weatherData={weather} onCatDexClick={() => { setCatDex(!catDex) }} />
        <GameArea>
          <PopUps>
            <CatDex catData={cats} catDex={catDex} onExit={() => { setCatDex(!catDex) }} activeCats={cats} selectCatCard={(id) => { console.log(id); setCatCard(id) }} />
            {cats && cats.map((cat, i) => {
              return (
                <CatDexCard key={i} catData={cat} show={catCard} width={"65%"} onExit={() => { setCatCard(0) }} onCatExit={() => { setCatCard(0); setCatDex(true) }} />
              )
            })}
          </PopUps>

        </GameArea>
        {randomCats && randomCats.map((cat, i) => {
          return <Cat key={i} catData={cat} bottom={cat.y} right={cat.x} image={'/cats/catrest.svg'} alt={"MEOW MEOW"} onClick={() => { console.log(cat.id); setCatCard(cat.id); }} />
        })}
        <h2 className={styles.head} >meowing @ {weather && weather.name.toLowerCase()}</h2>
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