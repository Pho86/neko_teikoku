import styled from "styled-components";
import Typography from "@/components/Atoms/Text";
import Image from 'next/image';
import CatPhrases from "@/data/phrases.json"
import { selectRandomFromArray } from "@/util";
import { useEffect, useState } from "react";

const OfferCardDiv = styled.div`
background-color:var(--white);
margin-bottom:1em;
padding: 0.7em 1em 0.3em 1em;
gap:1em;
display:flex;
flex-direction:column;
justify-content:space-around;
border-radius:1.2em;
min-width:18em;
cursor:pointer;
transition:all .1s ease-in-out;
border: 3px solid var(--border-hard);
border-bottom: 9px solid var(--border-hard);
&:hover {
   background-color:var(--primary);
}
`
const OfferTextDiv = styled.div`
display:flex;
flex-direction:column;
gap:.5em;
text-align:left;
`
const OfferCardContent =styled.div`
display:flex;
justify-content:space-between;
`
const OfferCardHighlight = styled.div`
width: 105%;
height: 10px;
align-self:center;
border-radius: 0px 0px 1em 1em;
background-color: var(--light-accent);
`
export default function OfferCard({
   catData,
   onClick = () => { },
}) {
    const [text,setText] = useState("");
    useEffect(()=>{
        let y = selectRandomFromArray(CatPhrases[0]);
        setText(y)
    },[])
    return (
        <OfferCardDiv onClick={onClick}>
            <OfferCardContent>

                <Image src={'/cats/caticon.svg'} width={60} height={60} alt="cat" style={{ borderRadius: 15, alignSelf:"flex-end", marginRight:"0.2em" }} />
                <OfferTextDiv>
                    {/* placholder text */}
                    <Typography
                        text={"meowster"}
                        weight={"500"}
                        size={"1.2rem"}
                    />
                    {/* <Typography
                        text={catData.breedName}
                        weight={"500"}
                        size={"1.2rem"}
                    /> */}
                    <Typography
                        text={text}
                        color={"var(--secondary-accent)"}
                        weight={"400"}
                        width={"110px"}
                        height={"40px"}
                        size={"1rem"}
                    />
                </OfferTextDiv>
                <Image src={'/menuIcons/treats.svg'} width={50} height={50} alt="cat" style={{ borderRadius: 50, alignSelf:"flex-end", backgroundColor:"#FFE5D2" }} />
                {/* <Image src={`${catData.imgThumb}`} width={50} height={50} alt="cat" style={{ borderRadius: 50 }} /> */}
            </OfferCardContent>
         <OfferCardHighlight />
      </OfferCardDiv>
   )
}