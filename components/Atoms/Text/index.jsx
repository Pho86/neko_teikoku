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
cursor: ${props => props.textHover ? "pointer" : "auto"};
transition: ${props => props.textHover ? "all .15s ease-in-out" : "none"};
   &:hover {
      color:${props => props.textHover};
   }
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
   textHover
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
         textHover={textHover}
      >
         {text}
      </Text>
   )
}