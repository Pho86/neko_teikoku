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
width:20.5em;
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
const OfferCardContent = styled.div`
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
    food,
}) {
    const [text, setText] = useState("");
    useEffect(() => {
        let randomText = selectRandomFromArray(CatPhrases[0]);
        setText(randomText);
    }, [])
    return (
        <OfferCardDiv onClick={onClick}>
            <OfferCardContent>
                {catData.catImg ? <Image src={catData.catImg} width={50} height={50} alt="cat image" style={{ borderRadius: 50, alignSelf: "flex-end", marginRight: "0.2em" }} /> :
                <Image src={'/cats/caticon.svg'} width={50} height={50} alt="cat image" style={{ borderRadius: 15, alignSelf: "flex-end", marginRight: "0.2em" }} />
                }
                <OfferTextDiv>
                    <Typography
                        text={catData.cat}
                        weight={"500"}
                        size={"1.2rem"}
                    />
                    <Typography
                        text={text}
                        color={"var(--secondary-accent)"}
                        weight={"400"}
                        width={"11em"}
                        height={"40px"}
                        size={"1rem"}
                    />
                </OfferTextDiv>
                <Image src={`/ingredients/${food}.png`} width={50} height={50} alt="cat" style={{ borderRadius: 50, alignSelf: "flex-end", backgroundColor: "#FFE5D2" }} />
            </OfferCardContent>
            <OfferCardHighlight />
        </OfferCardDiv>
    )
}