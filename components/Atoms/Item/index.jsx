import { motion } from "framer-motion";
import styled from "styled-components";
import Image from "next/image";

const ItemArea = styled.div`
position:absolute;
// width:100vw;
// height:100vh;
pointer-events:none;
`
const ItemImgArea = styled(motion.div)`
pointer-events:auto;
position:relative;
`
const ItemImage = styled(Image)`
pointer-events:none;

`
export default function Item({
    image
}) {

    return (
        <>
            <ItemArea>
                <ItemImgArea
                        drag
                        dragMomentum={false}
                    transition={{ duration: .2 }}
                    whileHover={{
                        scale: 1.2,
                        transition: { duration: .15 },
                    }}>
                    <ItemImage src={image} height={150} width={150} />
                </ItemImgArea>
            </ItemArea>
        </>
    )
}