import FoodCard from "@/components/Molecules/FoodCard";
import CookPrompt from "@/components/Molecules/CookPrompt";

export default function Testing() {
    return (
        <>
            <FoodCard treatname={"bento"} treatimg={"/treats/bento.svg"} aing={"x1"} bing={"x1"} aimg={"/treats/bento.svg"} bimg={"/treats/bento.svg"} />
            <CookPrompt cooktext={`cook a bento?`} treatimg={'/treats/bento.svg'} />
        </>
    )
}