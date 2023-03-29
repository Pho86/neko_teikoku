import Typography from "@/components/Atoms/Text";
import Image from "next/image";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { StrokedText } from "stroked-text";
const Container = styled(m.div)`
position:fixed;
left:0;
top:0;
background-color:rgba(255, 255, 255, .8);
display:flex;
justify-content:center;
align-items:center;
width:100vw;
height:100vh;
z-index:1000;
flex-direction:column;
`
export default function Loader({
    active
}) {

    return <AnimatePresence>
        {active && <Container animate={{ opacity: 1 }} transition={{ duration: 1, ease: "easeInOut" }} exit={{ opacity: 0 }}>
            <Image src="/cats/advisor/sleep.gif" width={500} height={500} alt="goma sleeping..." />
            <StrokedText
                fill='var(--white)' stroke={'var(--secondary-accent)'} strokeWidth={5} style={{
                    fontSize: '1.5rem', fontWeight: "600"
                }}
            >
                please wait a meowment...
            </StrokedText>
        </Container>
        }
    </AnimatePresence>
}
