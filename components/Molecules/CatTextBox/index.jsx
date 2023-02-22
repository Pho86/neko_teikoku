import { useEffect } from "react";
import styled from "styled-components";
import Typography from "@/components/Atoms/Text";
import { StrokedText } from "stroked-text";
import phrases from '@/data/phrases.json'

const CatTextBoxContent = styled.div`
    background-color: rgba(254,249,237,0.8);
    padding: 0.5em;
    border: 3px solid var(--secondary-accent);
    border-radius: 1em;
    position: relative;
    color: var(--secondary-accent);
    font-size: 1em;
    max-width: 12.5rem;
`

const CatTextBoxDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: fit-content;
`

export default function CatTextBox(){
    // useEffect(() => {
    //     console.log(phrases);
    // }, [])

    return(
        <div style={{display: "flex", justifyContent: "center"}}>
        <CatTextBoxDiv>
            <div style={{display: "flex", justifyContent: "start", width: "100%"}}>
            <StrokedText fill='var(--white)' stroke='var(--secondary-accent)' strokeWidth={4} style={{
                fontSize: '1.5rem',
            }}>Goma
                {/* {} */}
            </StrokedText>
            </div>
            <CatTextBoxContent>
                meow! feline purrty good this meowment
            </CatTextBoxContent>
        </CatTextBoxDiv>
        </div>
    )
    
}