import FoodCard from "@/components/Molecules/FoodCard";
import { OpacityBackgroundFade, PopUpWithTab } from "@/components/Atoms/Popup";
import { AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useState, useContext } from "react";
import Treats from "@/data/treats.json"
import Ingredients from "@/data/ingredients.json";
import { userContext } from "@/pages";
import PopupPrompt from "@/components/Molecules/PopupPrompt";
import { makeTreat } from "@/server";
import useSound from "use-sound";
import { GameContext } from "@/pages/_app";
import { useEffect } from "react";
const PopUpGrid = styled.div`
display:grid;
grid-template-columns: repeat(2, 1fr);
justify-items:center;
gap:3em;
overflow-y:scroll;
`

const LeaderboardRow = styled.div`
display:flex;
`

export default function LeaderboardDex({
   onExit = () => { },
   active,

}) {
   const [pageLimit, setPageLimit] = useState(2)
   const [pageMin, setPageMin] = useState(0)
   const [currentPage, setCurrentPage] = useState(1);
   const { currentLeaderboard, cats } = useContext(userContext);
   const { Volume } = useContext(GameContext);
   const [sound] = useSound('/sound/bamboohit.mp3', { volume: Volume, });
   
   return (
      <>
         <AnimatePresence>
            {active === true &&
               <>
                  <OpacityBackgroundFade key={"Leaderdex Fade"} onClick={onExit} />
                  <PopUpWithTab
                     title={"leaderboard"}
                     onExit={onExit}
                     size={"1.2em"}
                     direction="row"
                     initial={{ y: "-100vh" }}
                     animate={{ y: "20vh" }}
                     exit={{ y: "-100vh" }}
                     transition={{ delay: .05, duration: .5, ease: "easeInOut" }}
                     exitTab
                     //  arrows
                     //  onPrevious={() => {
                     //      if (currentPage > 1) {
                     //          setCurrentPage(currentPage - 1);
                     //          setPageMin(pageMin - 2);
                     //          setPageLimit(pageLimit - 2);
                     //      }
                     //  }}
                     //  onNext={() => {
                     //      if (currentPage < 2) {
                     //          setCurrentPage(currentPage + 1);
                     //          setPageMin(pageMin + 2);
                     //          setPageLimit(pageLimit + 2);
                     //      }
                     //  }}
                     content={<>
                        <PopUpGrid>
                           {currentLeaderboard?.map((user) => (
                              <LeaderboardRow key={user.id}>
                                 <p>{user.username}</p>
                                 <p>{user.location}</p>
                                 <p>Cooked: {user.cooked}</p>
                                 <p>{user.catsCompletion}/{cats.length}</p>
                                 <p>Visited: {user.catsVisited}</p>
                              </LeaderboardRow>
                           ))}
                        </PopUpGrid>
                     </>
                     }
                  >

                  </PopUpWithTab>
               </>
            }


         </AnimatePresence>

      </>
   )
}