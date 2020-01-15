import React from 'react';
import styled from 'styled-components';

import { Left, Right } from '.';

const Calculator = () => {
    return (
        <Style>
            <div className="left">
                <Left />
            </div>
            <div className="right">
                <Right />   
            </div>
        </Style>
    );
}

export default Calculator;

const Style = styled.div`
    display: flex;
    
    .left, .right {
        flex: 1;
    }
`