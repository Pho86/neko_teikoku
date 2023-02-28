import styled from "styled-components";
import Typography from "@/components/Atoms/Text";
import { motion, AnimatePresence } from 'framer-motion';
import { EmptySpace } from "@/components/Atoms/EmptySpacer";
import Image from "next/image";
import { OpacityBackgroundFade, PopUpWithTab } from "@/components/Atoms/Popup";
import { StrokedText } from "stroked-text";
const CatDexCardTitle = styled.div`
background-color:#B4B0E3;
display:flex;
justify-content:space-between;
padding:1em 2em;
border-radius:1em;
box-shadow: 0px 4px 4px 0px #D9D9D9;
width:95%;
color:white;
align-items:center;
`
const CatDexCardDiv = styled(PopUpWithTab)`
`
const CatDexCardHead = styled.div`
`
const CatDexCardContent = styled.div`
display:grid;
grid-template-columns:45% 55%;
@media (max-width: 1280px) {
   display:grid;
   grid-template-columns:1fr;
}
`
const CatDexImage = styled.div`
display: flex;
align-items: center;
justify-content: center;
`
const CatDexCardText = styled.div`
display:flex;
flex-direction:column;
gap:1em;
`
const CatDexCardContentText = styled.div`
background-color:white;
padding:1em 1.5em;
border-radius:1em;
text-align:center;
border-bottom: 4px solid var(--accent);
`
const CatDexCardContentDescription = styled(CatDexCardContentText)`
text-align:left;
max-width:32em;
`

export default function CatDexCard({
   catData,
   show,
   onExit = () => { },
   onCatExit = () => { }
}) {
   return (
      <AnimatePresence>
         {catData.id === show && <>
            <OpacityBackgroundFade onClick={onExit} />
            <CatDexCardDiv
               id={`${catData.breedName}-card`}
               initial={{ x: "100vw", }}
               animate={{ x: "-0%" }}
               exit={{ x: "100vw" }}
               transition={{ delay: .05, duration: .5, ease: "easeInOut" }}
               title={"cat dex"}
               onExit={onExit}
               exitTab
               catDexTab
               onCatDex={onCatExit}
               content={
                  <>
                     <CatDexCardTitle>
                        <Typography
                           text={`no. ${catData.id.toString().padStart(2, '0')}`}
                           weight={500}
                        />
                        <CatDexCardHead>
                           <StrokedText
                              fill='var(--white)' stroke={'var(--secondary-accent)'} strokeWidth={5} style={{
                                 fontSize: '1.5rem', fontWeight: "600"
                              }}
                           >
                              {catData.breedName}
                           </StrokedText>
                        </CatDexCardHead>
                        <EmptySpace axis={"horizontal"} size={30} />
                     </CatDexCardTitle>
                     <EmptySpace axis={"vertical"} size={15} />
                     <CatDexCardContent>
                        <CatDexImage>
                           <Image src={`${catData.imgThumb}`} width={300} height={300} alt="cat" style={{ borderRadius: "50%", textAlign: "center" }} />
                        </CatDexImage>
                        <CatDexCardText>
                           <div>
                              <Typography
                                 text={"cat breed"}
                                 size={"1.3rem"}
                                 padding={"0 0 0 .5em"}
                                 color={"var(--secondary-accent)"}
                              />
                              <CatDexCardContentText>
                                 <Typography
                                    text={catData.breedName}
                                    size={"1.3rem"}
                                 />
                              </CatDexCardContentText>
                           </div>
                           <div>
                              <Typography
                                 text={"native region"}
                                 size={"1.3rem"}
                                 padding={"0 0 0 .5em"}
                                 color={"var(--secondary-accent)"}
                              />
                              <CatDexCardContentText>
                                 <Typography
                                    text={catData.origin}
                                    size={"1.3rem"}
                                 />
                              </CatDexCardContentText>
                           </div>
                           <div>
                              <Typography
                                 text={"description"}
                                 size={"1.3rem"}
                                 padding={"0 0 0 .5em"}
                                 color={"var(--secondary-accent)"}
                              />
                              <CatDexCardContentDescription>
                                 <Typography
                                    text={catData.breedDescription}
                                    size={"1.1rem"}
                                 />
                              </CatDexCardContentDescription>
                           </div>
                        </CatDexCardText>
                     </CatDexCardContent>
                  </>
               }
            >

            </CatDexCardDiv>
         </>
         }
      </AnimatePresence >
   )
}