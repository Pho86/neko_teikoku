import styled from 'styled-components';

const Text = styled.p`
font-size: ${props => props.size};
font-weight: ${props => props.weight};
color: ${props => props.color};
text-align: ${props => props.align};
display: ${props => props.display};
margin: ${props => props.margin};
padding: ${props => props.padding};
width: ${props => props.width};
-webkit-text-stroke: ${props => props.textstroke};
paint-order: stroke fill;
`

export default function Typography({
   text,
   size,
   weight,
   color,
   align,
   display,
   margin,
   padding,
   width,
   textstroke
}) {
   return (
      <Text
         size={size}
         color={color}
         weight={weight}
         align={align}
         display={display}
         margin={margin}
         padding={padding}
         width={width}
         textstroke={textstroke}
      >
         {text}
      </Text>
   )
}