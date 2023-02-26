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
    gap: 1em;
`
const LoginForm = styled.form`
    display:flex;
    flex-direction:column;
    // width:30%;
    // padding: 1em;
    // gap: 1em;
    width: 23.5em;
    align-items: center;
`
const InputInfo = styled.input`
    padding:1em;
    font-size:1rem;
    background-color:var(--white);
    border-radius:1em;
    border: 3px solid var(--border);
    pointer-events:auto;
    width:70%;
    outline:none;
    ::placeholder,
    ::-webkit-input-placeholder {
    color: var(--border);
    font-weight: 500;
    }
    :-ms-input-placeholder {
        color: var(--border);
        font-weight: 500;
    }
    
`
export default function PopupPrompt(
    {
        type,
        oneBtn,
        cooktext,
        treatimg,
        btnText1,
        btnText2
    }
){
    const handleChange = (event) => {
        setLoginInfo({ ...loginInfo, [event.target.name]: event.target.value });
    }; 
    
    

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

            { type === "treats" &&
                <ImgCont>
                    <Image src={treatimg} width={100} height={100} alt="bento" />
                </ImgCont>
            }
            { type === "input" &&
                <LoginForm onChange={handleChange} name="forgot">
                    <InputInfo type="text" name="email" placeholder="enter email" />
                    {/* <Button type="button" text="Forgot Password" onClick={handleForgotPassword} color="var(--border)" colorhover="var(--border-hard)" border="6px solid var(--border-hard)" borderradius={"2.2em"} padding={"1em 3em"} /> */}
                </LoginForm>
            }
            { oneBtn ? 
                <BtnCont>
                    <Button text={btnText1} color={"var(--button-light)"} colorhover={"var(--button-medium)"} border={"4px solid var(--button-medium)"} borderradius={"1.5em"} padding={"0.3em 2em"} textstroke={"1px var(--button-medium)"}/>
                </BtnCont>
                :
                <BtnCont>
                    <Button text={btnText1} color={"var(--button-red)"} colorhover={"var(--border-hard)"} border={"4px solid var(--border-hard)"} borderradius={"1.5em"} padding={"0.3em 2em"} textstroke={"1px var(--border-hard)"} />
                    <Button text={btnText2} color={"var(--button-light)"} colorhover={"var(--button-medium)"} border={"4px solid var(--button-medium)"} borderradius={"1.5em"} padding={"0.3em 2em"} textstroke={"1px var(--button-medium)"}/>
                </BtnCont>
            }

        </PopupCont>
    )
}