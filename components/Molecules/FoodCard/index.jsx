import styled from "styled-components";
import Typography from "@/components/Atoms/Text";
import Image from "next/image";
import { StrokedText } from "stroked-text";

const FoodCardDiv = styled.div`
    background-color:var(--white);
    padding:1em 1.5em 1em 1.5em;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius:1.2em;
    width:290px;
    cursor:pointer;
    transition:all .1s ease-in-out;
    border: 3px solid var(--border-hard);
    border-bottom: 8px solid var(--border-hard);
    &:hover {
        background-color:var(--primary);
     }
`

const FoodCardHead = styled.div`
    position: relative;
    width: 115%;
    height: 65px;
    border-radius: 1.2em 1.2em 0px 0px;
    background-color: var(--accent);
    transform: translate(-0px,-10.5px);
    display: flex;
    justify-content: center;
    align-items: center;
    // margin-bottom: 20px;
`

const FoodTextDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`


const IngCont = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
`

const IngItem = styled.div`
    margin: 1em;
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 0.5em;
`

export default function FoodCard(
    {
        treatname,
        aing,
        bing,
        treatimg,
        aimg,
        bimg,
        onClick = () => { }
    }
) {
    return (
        <FoodCardDiv onClick={onClick}>
            <FoodCardHead>
                <FoodTextDiv>
                    <StrokedText fill='var(--white)' stroke='var(--secondary-accent)' strokeWidth={4} style={{
                        fontSize: '1.5rem',
                    }}>
                        {treatname}
                    </StrokedText>
                </FoodTextDiv>
            </FoodCardHead>

            <Image src={treatimg} width={200} height={200} alt={`${treatname} image`} />

            <IngCont>
                <IngItem>
                    <Typography text={aing} weight={"400"} size={"1em"} />
                    <Image src={aimg} width={45} height={45} alt={`${aing} image`} />
                </IngItem>

                <IngItem>
                    <Typography text={bing} weight={"400"} size={"1em"} />
                    <Image src={bimg} width={45} height={45} alt={`${bing} image`} />
                </IngItem>
            </IngCont>

        </FoodCardDiv>
    )
}