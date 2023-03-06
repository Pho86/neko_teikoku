import styled from "styled-components";
import { StrokedText } from "stroked-text";
import { motion } from "framer-motion";
const CatTextBoxContent = styled.div`
    background-color: rgba(254,249,237,0.8);
    padding: 0.5em;
    border: 3px solid var(--secondary-accent);
    border-radius: 1em;
    color: var(--secondary-accent);
    font-size: 1em;
    max-width: 180px;
`

const CatTextBoxDiv = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: fit-content;
`

export default function CatTextBox({
    text
}) {

    return (
        <CatTextBoxDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <div style={{ display: "flex", justifyContent: "start", width: "100%" }}>
                <StrokedText fill='var(--white)' stroke='var(--secondary-accent)' strokeWidth={4} style={{
                    fontSize: '1.5rem', marginLeft: 10
                }}>Goma
                    {/* {} */}
                </StrokedText>
            </div>
            <CatTextBoxContent id="advisor_text">
                {text}
            </CatTextBoxContent>
        </CatTextBoxDiv>
    )

}