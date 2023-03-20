import FoodCard from "@/components/Molecules/FoodCard";
import PopupPrompt from "@/components/Molecules/PopupPrompt";
import SettingsPopup from "@/components/Molecules/SettingsPopup";
import { useContext, useEffect } from "react";

export default function Testing() {
    // const handleForgotPassword = async () => {
    //     try {
    //         await ForgotPassword(loginInfo)
    //         setErrorMessage("an email has been sent")
    //     }
    //     catch (error) {
    //         setErrorMessage("ERROR OCCURED, TRY AGAIN")
    //     }
    // }
    // const data = useContext(weatherContext)
    // useEffect(() => {
    //     console.log(data)
    // }, [])

    return (
        <>
            {/* <FoodCard treatname={"bento"} treatimg={"/treats/bento.svg"} aing={"x1"} bing={"x1"} aimg={"/treats/bento.svg"} bimg={"/treats/bento.svg"} />
            <PopupPrompt type={"treats"} cooktext={`cook a bento?`} treatimg={'/treats/bento.svg'} btnText1={"NAH"} btnText2={"YAH"}/>
            <SettingsPopup/> */}
            {/* <PopupPrompt type={"input"}
                cooktext={"password reset"}
                oneBtn={false}
                btnText1={"EXIT"}
                btnText2={"SUBMIT"}
                onClick={handleForgotPassword}
            /> */}
            {/* <Offerings btnText={'ACKNOWLEDGE ALL'}/> */}
        </>
    )
}
