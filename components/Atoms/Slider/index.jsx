import styled from "styled-components";
import Typography from "../Text";
import { motion } from "framer-motion";
import Button from "../Button";

export const Slider = styled(motion.div)`
width:100vw;
padding:3em;
background-color:var(--primary);
border-top: 6px solid var(--border);
z-index:51;
display:flex; 
justify-content:space-between;
align-items:center;
pointer-events:auto;
`

export const SliderTabCont = styled(motion.div)`
position:fixed;
bottom:0;
left:0;
width:100vw;
display:flex;
flex-direction:column;
`

const SliderTabBut = styled.div`
width:150px;
height:40px;
border-radius: 1.2em 1.2em 0 0;
background-color:${props => props.tabcolor ? "var(--border)" : "var(--button-light)"};
display:flex;
justify-content:center;
align-items:center;
pointer-events:auto;
cursor:pointer;
`
const SliderTabsCont = styled.div`
display:flex;
justify-content:space-between;
`
const TopDiv = styled.div`
pointer-events:auto;
display:flex;
transform:translateX(calc(10vw + 3em));
gap:2em;
align-items:end;
`
const ButtonDiv = styled.div`
pointer-events:auto;
margin: 0 1% 1% 0;
`
export function SliderTab({
    tab,
    secondtab,
    content,
    initial,
    animate,
    transition,
    exit,
    tabcolor,
    onTab = () => {},
    onSecondTab = () => {},
    onExit = () => { },
}) {
    return (
        <SliderTabCont initial={initial}
            animate={animate}
            transition={transition}
            exit={exit}>
            <SliderTabsCont>
                <TopDiv>
                    <SliderTabBut onClick={onTab} tabcolor={tabcolor}>
                        <Typography text={tab} size={"1.2em"} color={tabcolor ? "var(--white)" : "var(--border)"} weight={"500"}
                        />
                    </SliderTabBut>
                    <SliderTabBut onClick={onSecondTab} tabcolor={!tabcolor}>
                        <Typography text={secondtab} size={"1.2em"} color={!tabcolor ? "var(--white)" : "var(--border)"} weight={"500"}
                        />
                    </SliderTabBut>
                </TopDiv>
                <ButtonDiv>
                    <Button onClick={onExit} image="/icons/exit.svg" color="var(--border-light)" alt="exit button" colorhover="var(--border-hard)" />
                </ButtonDiv>
            </SliderTabsCont>
            <Slider>
                {content}
            </Slider>

        </SliderTabCont>
    )
}