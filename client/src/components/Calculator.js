import React from 'react';
import styled from 'styled-components';

import { Left, Right, Logo } from '.';

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
    position: relative;

    @media (max-width: 768px) {
        flex-direction: column-reverse;
    }

    .left, .right {
        flex: 1;
        position: relative;
    }
`