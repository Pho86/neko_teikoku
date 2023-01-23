import styled from 'styled-components';

function getHeight({axis, size}) {
    return axis === 'horizontal' ? 1 : size;
}

function getWidth({axis, size}) {
    return axis === 'vertical' ? 1 : size;
}

export const EmptySpace = styled.span`
  display: block;
  width: ${getWidth}px;
  min-width: ${getWidth}px;
  height: ${getHeight}px;
  min-height: ${getHeight}px;
  border-left: ${props => props.borderLeft};
`;

//0 x 30 wide span     <Spacer axis='horizontal' size={30}/>
//30 x 0 high span     <Spacer axis='vertical' size={30}/>
//30 x 30 blank span   <Spacer size={30}/> 