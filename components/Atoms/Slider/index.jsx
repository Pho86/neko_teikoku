import styled from "styled-components";
import Typography from "../Text";
import { m } from "framer-motion";
import Button from "../Button";
import IconButton from "../IconButton";

export const Slider = styled(m.div)`
width:100vw;
padding:2em 4em;
background-color:var(--primary);
border-top: 6px solid var(--border);
z-index:51;
display:flex; 
justify-content:space-between;
align-items:center;
pointer-events:auto;
`

export const SliderTabCont = styled(m.div)`
position:fixed;
bottom:0;
left:0;
width:100vw;
display:flex;
flex-direction:column;
z-index:20;
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
&:hover {
    filter: brightness(95%);
    
}
`
const SliderTabsCont = styled.div`
display:flex;
justify-content:space-between;
`
const TopDiv = styled.div`
pointer-events:auto;
display:flex;
transform:translateX(calc(12vw + 5em));
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
    onTab = () => { },
    onSecondTab = () => { },
    onExit = () => { },
    onNext = () => { },
    onPrevious = () => { },
}) {
    return (
        <SliderTabCont initial={initial}
            animate={animate}
            transition={transition}
            exit={exit}>
            <SliderTabsCont>
                <TopDiv>
                    <SliderTabBut onClick={onTab} tabcolor={tabcolor}>
                        <Typography text={tab} size={"1.2rem"} color={tabcolor ? "var(--white)" : "var(--border)"} weight={"500"}
                        />
                    </SliderTabBut>
                    {secondtab && <SliderTabBut onClick={onSecondTab} tabcolor={!tabcolor}>
                        <Typography text={secondtab} size={"1.2rem"} color={!tabcolor ? "var(--white)" : "var(--border)"} weight={"500"}
                        />
                    </SliderTabBut>}
                </TopDiv>
                <ButtonDiv>
                    <Button onClick={onExit} image="/icons/exit.svg" color="var(--border-light)" alt="exit button" colorhover="var(--border-hard)" />
                </ButtonDiv>
            </SliderTabsCont>
            <Slider>
                <IconButton
                    image="/icons/leftarrowlight.svg"
                    hover
                    secondImage="/icons/leftarrow.svg"
                    alt="Go backwards" width={75} height={75} onClick={onPrevious} />
                {content}
                <IconButton
                    image="/icons/rightarrowlight.svg"
                    hover
                    secondImage="/icons/rightarrow.svg"
                    alt="Go forward" width={75} height={75}
                    onClick={onNext}
                />
            </Slider>

        </SliderTabCont>
    )
}