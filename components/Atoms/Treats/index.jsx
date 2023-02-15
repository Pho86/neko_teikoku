import { motion } from "framer-motion";
import styled from "styled-components";
import Image from "next/image";

const TreatArea = styled.div`
position:absolute;
// width:100vw;
// height:100vh;
pointer-events:none;
`
const ItemImgArea = styled(motion.div)`
pointer-events:auto;
position:relative;
cursor:pointer;
`
const TreatImage = styled(Image)`
pointer-events:none;
transform:translate(10vw, 8vh);

`
export default function Treats({
    image,
    alt
}) {

    return (
        <>
            <TreatArea>
                {/* <ItemImgArea
                    drag
                    dragMomentum={false}
                    transition={{ duration: .2 }}
                    whileHover={{
                        scale: 1.15,
                        transition: { duration: .15 },
                    }}> */}
                <TreatImage src={image} height={150} width={150} alt={alt} />
                {/* </ItemImgArea> */}
            </TreatArea >
        </>
    )
}