import FoodCard from "@/components/Molecules/FoodCard";
import CookPrompt from "@/components/Molecules/CookPrompt";

export default function Testing(){
    return(
        // <FoodCard/>
        <CookPrompt cooktext={`cook a bento?`} treatimg={'/treats/bento.svg'}/>
    )
}