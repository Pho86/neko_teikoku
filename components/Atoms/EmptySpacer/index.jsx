import styled from 'styled-components';

function getHeight({axis, size}) {
    return axis === 'horizontal' ? 1 : size;
}

function getWidth({axis, size}) {
    return axis === 'vertical' ? 1 : size;
}

/**
 * @param {*} axis expects either 'horizontal' or 'vertical' to know which direction the space is *optional* if no axis is given, space is given in both directions
 * @param {*} size expects a number, number is then converted to pixels, amount of space
 * @returns an alternative to margin, or take up empty space inside a container
*/
export const EmptySpace = styled.span`
  display: block;
  width: ${getWidth}px;
  min-width: ${getWidth}px;
  height: ${getHeight}px;
  min-height: ${getHeight}px;
  border-left: ${props => props.borderLeft};
`;

//0 x 30 wide span     <EmptySpace axis='horizontal' size={30}/>
//30 x 0 high span     <EmptySpace axis='vertical' size={30}/>
//30 x 30 blank span   <EmptySpace size={30}/> 