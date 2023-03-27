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
transition: ${props => props.textHover ? "all .18s ease-in-out" : "none"};
   &:hover {
      color:${props => props.textHover};
   }
`

/**
 * @desc reusuable text component
 * @param {*} text expects a string for the text.
 * @param {*} size expects a string for the text's size. *optional*
 * @param {*} weight expects a string for the text's weight. *optional* 
 * @param {*} color expects a string for the text's color. *optional* 
 * @param {*} align expects a string for the text's alignment. *optional* 
 * @param {*} onClick expects to be connected to a function. *optional* 
 * @returns a paragraph component
 */
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
   textHover,
   onClick = () => {},
   id
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
         onClick={onClick}
         id={id}
      >
         {text}
      </Text>
   )
}

// If need stroked text, import {strokedText} from 'stroked-text'