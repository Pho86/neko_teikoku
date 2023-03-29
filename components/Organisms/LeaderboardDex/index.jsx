import { OpacityBackgroundFade, PopUpWithTab } from "@/components/Atoms/Popup";
import { AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useContext } from "react";
import { userContext } from "@/pages";
import useSound from "use-sound";
import { GameContext } from "@/pages/_app";
import { StrokedText } from "stroked-text";
import Typography from "@/components/Atoms/Text";
import Image from "next/image";
const PopUpGrid = styled.div`
display:flex;
flex-direction:column;
justify-items:center;
gap:3em;
height:550px;
overflow-y:scroll;
padding-right:1em;
`

const LeaderboardRow = styled.tr`
border: ${props => props.border || ""};
filter: drop-shadow(0px 4px 0px rgba(${props => props.dropShadow || "180, 176, 227,"} 1));
`

const Table = styled.table`
border-spacing: 0em 1em;
`
const TableHeader = styled.thead`
position:sticky;
top:0;
background-color:#B4B0E3;
z-index:500;
padding:em;

`
const TableRow = styled.tr`
border-radius: 10px;

`
const TableHead = styled.th`
padding: 0.5em 2em;
`
const TableData = styled.td`
padding: 0.5em 2em;
background-color: ${props => props.bg || "#FFFFFF"};
border-bottom: ${props => props.border ? "4px var(--secondary-accent) solid" : "" };
border-top: ${props => props.border ? "4px var(--secondary-accent) solid" : "" };
&:nth-child(1) {
   border-radius:1em 0em 0em 1em;
   border-left: ${props => props.border ? "4px var(--secondary-accent) solid" : "" };
};
&:nth-child(6) {
   border-radius:0em 1em 1em 0em;
   border-right: ${props => props.border ? "4px var(--secondary-accent) solid" : "" };
};
`
const TableBody = styled.tbody`
`
export default function LeaderboardDex({
   onExit = () => { },
   active,
   
}) {
   const { currentLeaderboard, cats, currentUser } = useContext(userContext);
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
                     animate={{ y: "0" }}
                     pos="relative"
                     exit={{ y: "-100vh" }}
                     transition={{ delay: .05, duration: .5, ease: "easeInOut" }}
                     exitTab
                     content={<>
                        <PopUpGrid>
                           <Table>
                              <TableHeader>
                                 <TableRow>
                                    <TableHead><StrokedText fill='var(--white)' stroke={'var(--secondary-accent)'} strokeWidth={4} style={{
                                       fontSize: '1.2rem', fontWeight: "600"
                                    }}>#</StrokedText></TableHead>
                                    <TableHead></TableHead>
                                    <TableHead><StrokedText fill='var(--white)' stroke={'var(--secondary-accent)'} strokeWidth={4} style={{
                                       fontSize: '1.2rem', fontWeight: "600"
                                    }}>emperor</StrokedText></TableHead>
                                    <TableHead><StrokedText fill='var(--white)' stroke={'var(--secondary-accent)'} strokeWidth={4} style={{
                                       fontSize: '1.2rem', fontWeight: "600"
                                    }}>meals</StrokedText></TableHead>
                                    <TableHead><StrokedText fill='var(--white)' stroke={'var(--secondary-accent)'} strokeWidth={4} style={{
                                       fontSize: '1.2rem', fontWeight: "600"
                                    }}>catdex</StrokedText></TableHead>
                                    <TableHead><StrokedText fill='var(--white)' stroke={'var(--secondary-accent)'} strokeWidth={4} style={{
                                       fontSize: '1.2rem', fontWeight: "600"
                                    }}>visits</StrokedText></TableHead>
                                 </TableRow>
                              </TableHeader>
                              <TableBody>
                                 {currentLeaderboard?.map((user, i) => {
                                    if (user.id === currentUser.uid) {
                                       if( i === 0) {
                                          return <LeaderboardRow key={user.id} dropShadow="0" border>
                                          <TableData bg="#D2CFF4" border><StrokedText fill='var(--white)' stroke={'var(--secondary-accent)'} strokeWidth={4} style={{
                                             fontSize: '1.2rem', fontWeight: "600" 
                                          }}>{i + 1}</StrokedText></TableData>
                                          <TableData bg="#D2CFF4" border><Image width={50} height={50} src={user.avatar ? user.avatar : "/user/pfp.svg"} alt={`${user.username} image profile icon`} /></TableData>
                                          <TableData bg="#D2CFF4" border><Typography text={user.username} weight="600" color="var(--secondary-accent)"></Typography></TableData>
                                          <TableData bg="#D2CFF4" border><Typography text={user.cooked} weight="600" color="var(--secondary-accent)" align="center"></Typography></TableData>
                                          <TableData bg="#D2CFF4" border><Typography text={`${user.catsCompletion}/${cats.length}`} weight="600" color="var(--secondary-accent)" align="center"></Typography></TableData>
                                          <TableData bg="#D2CFF4" border><Typography text={user.catsVisited} weight="600" color="var(--secondary-accent)" align="center"></Typography></TableData>
                                       </LeaderboardRow>
                                       } 
                                       else if (i === 1) {
                                          return <LeaderboardRow key={user.id} dropShadow="0">
                                          <TableData bg="#EAE9F9" border><StrokedText fill='var(--white)' stroke={'var(--secondary-accent)'} strokeWidth={4} style={{
                                             fontSize: '1.2rem', fontWeight: "600" 
                                          }}>{i + 1}</StrokedText></TableData>
                                          <TableData bg="#EAE9F9" border><Image width={50} height={50} src={user.avatar ? user.avatar : "/user/pfp.svg"} alt={`${user.username} image profile icon`} /></TableData>
                                          <TableData bg="#EAE9F9" border><Typography text={user.username} weight="600" color="var(--secondary-accent)"></Typography></TableData>
                                          <TableData bg="#EAE9F9" border><Typography text={user.cooked} weight="600" color="var(--secondary-accent)" align="center"></Typography></TableData>
                                          <TableData bg="#EAE9F9" border><Typography text={`${user.catsCompletion}/${cats.length}`} weight="600" color="var(--secondary-accent)" align="center"></Typography></TableData>
                                          <TableData bg="#EAE9F9" border><Typography text={user.catsVisited} weight="600" color="var(--secondary-accent)" align="center"></Typography></TableData>
                                       </LeaderboardRow>
                                       }
                                       else if (i === 2) {
                                          return <LeaderboardRow key={user.id} >
                                          <TableData bg="#F6F5FF" border><StrokedText fill='var(--white)' stroke={'var(--secondary-accent)'} strokeWidth={4} style={{
                                             fontSize: '1.2rem', fontWeight: "600" 
                                          }}>{i + 1}</StrokedText></TableData>
                                          <TableData bg="#F6F5FF" border><Image width={50} height={50} src={user.avatar ? user.avatar : "/user/pfp.svg"} alt={`${user.username} image profile icon`} /></TableData>
                                          <TableData bg="#F6F5FF" border><Typography text={user.username} weight="600" color="var(--secondary-accent)"></Typography></TableData>
                                          <TableData bg="#F6F5FF" border><Typography text={user.cooked} weight="600" color="var(--secondary-accent)" align="center"></Typography></TableData>
                                          <TableData bg="#F6F5FF" border><Typography text={`${user.catsCompletion}/${cats.length}`} weight="600" color="var(--secondary-accent)" align="center"></Typography></TableData>
                                          <TableData bg="#F6F5FF" border><Typography text={user.catsVisited} weight="600" color="var(--secondary-accent)" align="center"></Typography></TableData>
                                       </LeaderboardRow>
                                       }
                                       else {
                                          return <LeaderboardRow key={user.id}>
                                          <TableData border><StrokedText fill='var(--white)' stroke={'var(--secondary-accent)'} strokeWidth={4} style={{
                                             fontSize: '1.2rem', fontWeight: "600" 
                                          }}>{i + 1}</StrokedText></TableData>
                                          <TableData border><Image width={50} height={50} src={user.avatar ? user.avatar : "/user/pfp.svg"} alt={`${user.username} image profile icon`} /></TableData>
                                          <TableData border><Typography text={user.username} weight="600" color="var(--secondary-accent)"></Typography></TableData>
                                          <TableData border><Typography text={user.cooked} weight="600" color="var(--secondary-accent)" align="center"></Typography></TableData>
                                          <TableData border><Typography text={`${user.catsCompletion}/${cats.length}`} weight="600" color="var(--secondary-accent)" align="center"></Typography></TableData>
                                          <TableData border><Typography text={user.catsVisited} weight="600" color="var(--secondary-accent)" align="center"></Typography></TableData>
                                       </LeaderboardRow>
                                       }
                                    }
                                    else {
                                       if( i === 0) {
                                          return <LeaderboardRow key={user.id} dropShadow="77, 70, 153,">
                                          <TableData bg="#D2CFF4"><StrokedText fill='var(--white)' stroke={'var(--secondary-accent)'} strokeWidth={4} style={{
                                             fontSize: '1.2rem', fontWeight: "600" 
                                          }}>{i + 1}</StrokedText></TableData>
                                          <TableData bg="#D2CFF4"><Image width={50} height={50} src={user.avatar ? user.avatar : "/user/pfp.svg"} alt={`${user.username} image profile icon`} /></TableData>
                                          <TableData bg="#D2CFF4"><Typography text={user.username} weight="600" color="var(--secondary-accent)"></Typography></TableData>
                                          <TableData bg="#D2CFF4"><Typography text={user.cooked} weight="600" color="var(--secondary-accent)" align="center"></Typography></TableData>
                                          <TableData bg="#D2CFF4"><Typography text={`${user.catsCompletion}/${cats.length}`} weight="600" color="var(--secondary-accent)" align="center"></Typography></TableData>
                                          <TableData bg="#D2CFF4"><Typography text={user.catsVisited} weight="600" color="var(--secondary-accent)" align="center"></Typography></TableData>
                                       </LeaderboardRow>
                                       } 
                                       else if (i === 1) {
                                          return <LeaderboardRow key={user.id} dropShadow="132, 125, 210,">
                                          <TableData bg="#EAE9F9"><StrokedText fill='var(--white)' stroke={'var(--secondary-accent)'} strokeWidth={4} style={{
                                             fontSize: '1.2rem', fontWeight: "600" 
                                          }}>{i + 1}</StrokedText></TableData>
                                          <TableData bg="#EAE9F9"><Image width={50} height={50} src={user.avatar ? user.avatar : "/user/pfp.svg"} alt={`${user.username} image profile icon`} /></TableData>
                                          <TableData bg="#EAE9F9"><Typography text={user.username} weight="600" color="var(--secondary-accent)"></Typography></TableData>
                                          <TableData bg="#EAE9F9"><Typography text={user.cooked} weight="600" color="var(--secondary-accent)" align="center"></Typography></TableData>
                                          <TableData bg="#EAE9F9"><Typography text={`${user.catsCompletion}/${cats.length}`} weight="600" color="var(--secondary-accent)" align="center"></Typography></TableData>
                                          <TableData bg="#EAE9F9"><Typography text={user.catsVisited} weight="600" color="var(--secondary-accent)" align="center"></Typography></TableData>
                                       </LeaderboardRow>
                                       }
                                       else if (i === 2) {
                                          return <LeaderboardRow key={user.id} >
                                          <TableData bg="#F6F5FF"><StrokedText fill='var(--white)' stroke={'var(--secondary-accent)'} strokeWidth={4} style={{
                                             fontSize: '1.2rem', fontWeight: "600" 
                                          }}>{i + 1}</StrokedText></TableData>
                                          <TableData bg="#F6F5FF"><Image width={50} height={50} src={user.avatar ? user.avatar : "/user/pfp.svg"} alt={`${user.username} image profile icon`} /></TableData>
                                          <TableData bg="#F6F5FF"><Typography text={user.username} weight="600" color="var(--secondary-accent)"></Typography></TableData>
                                          <TableData bg="#F6F5FF"><Typography text={user.cooked} weight="600" color="var(--secondary-accent)" align="center"></Typography></TableData>
                                          <TableData bg="#F6F5FF"><Typography text={`${user.catsCompletion}/${cats.length}`} weight="600" color="var(--secondary-accent)" align="center"></Typography></TableData>
                                          <TableData bg="#F6F5FF"><Typography text={user.catsVisited} weight="600" color="var(--secondary-accent)" align="center"></Typography></TableData>
                                       </LeaderboardRow>
                                       }
                                       else {
                                          return <LeaderboardRow key={user.id}>
                                          <TableData><StrokedText fill='var(--white)' stroke={'var(--secondary-accent)'} strokeWidth={4} style={{
                                             fontSize: '1.2rem', fontWeight: "600" 
                                          }}>{i + 1}</StrokedText></TableData>
                                          <TableData><Image width={50} height={50} src={user.avatar ? user.avatar : "/user/pfp.svg"} alt={`${user.username} image profile icon`} /></TableData>
                                          <TableData><Typography text={user.username} weight="600" color="var(--secondary-accent)"></Typography></TableData>
                                          <TableData><Typography text={user.cooked} weight="600" color="var(--secondary-accent)" align="center"></Typography></TableData>
                                          <TableData><Typography text={`${user.catsCompletion}/${cats.length}`} weight="600" color="var(--secondary-accent)" align="center"></Typography></TableData>
                                          <TableData><Typography text={user.catsVisited} weight="600" color="var(--secondary-accent)" align="center"></Typography></TableData>
                                       </LeaderboardRow>
                                       }
                                    }
                                 }
                                 )}

                              </TableBody>
                           </Table>
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