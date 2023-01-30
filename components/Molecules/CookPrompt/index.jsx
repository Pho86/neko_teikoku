import styled from "styled-components";
import Typography from "@/components/Atoms/Text";
import Image from "next/image";
import Button from "@/components/Atoms/Button";

const PopupCont = styled.div`
    background-color: var(--primary);
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 1.2em;
    border: 3px solid var(--border);
    border-bottom: 8px solid var(--border);
    width: 300px;
    min-height: 245px;
    justify-content: space-around;
`

const PopupText = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.5em;
`

const ImgCont = styled.div`
    background-color: var(--yellow);
    border-radius: 1.2em;
    width: 125px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const BtnCont = styled.div`
    margin: 1em;
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 2.5em;
`

export default function CookPrompt(
    {
        cooktext,
        treatimg,
    }
){
    return(
        <PopupCont>
            <PopupText>
                <Typography
                    text={cooktext}
                    weight={"400"}
                    size={"1.5em"}
                    color={"var(--black)"}
                />
            </PopupText>

            <ImgCont>
                <Image src={treatimg} width={100} height={100} alt="bento" />
            </ImgCont>

            <BtnCont>
                <Button text={`NAH`} color={"var(--button-red)"} colorhover={"var(--border-hard)"} border={"4px solid var(--border-hard)"} borderradius={"1.5em"} padding={"0.5em 2em"} textstroke={"1px var(--border-hard)"} />
                <Button text={`YAH`} color={"var(--button-light)"} colorhover={"var(--button-medium)"} border={"4px solid var(--button-medium)"} borderradius={"1.5em"} padding={"0.5em 2em"} textstroke={"1px var(--button-medium)"}/>
            </BtnCont>

        </PopupCont>
    )
}