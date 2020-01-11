import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { nextSubStage } from '../state/actions';

const Right = () => {

    const dispatch = useDispatch();
    const { sub_stage, last_stage } = useSelector(state => state);

    return (
        <Style sub_stage={ sub_stage + 1 }>
            <header>
                <span> Input </span>
                <span> Your Earnings </span>
                <span> Key to start </span>
            </header>
            <main hidden={ sub_stage !== 0 }>
                <h1> Revenue Calculator </h1>
                <p> Find out how much you can grow your reveue by adding meal kits </p>
            </main>
            <footer>
                <button hidden={ sub_stage === last_stage } onClick={ () => dispatch(nextSubStage()) }>Next</button>
            </footer>
        </Style>
    );
}

export default Right;

const Style = styled.div(
    ({ sub_stage }) => `
    background: #fff;
    min-height: 100vh;
    padding: 20px 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    header {
        display: flex;
        justify-content: space-between;

        span {
            font-size: 14px;
            color: #1d2b44;
            padding: 5px 0;
        
            &:nth-child(${ sub_stage }) {
                font-weight: bold;
                border-bottom: 2px solid #1d2b44;
            }
        }
    }

    main {
        color: #1d2b44;
        
        h1 {
            font-size: 48px;
            margin-bottom: 20px;
            font-weight: normal;
        }

        p {
            font-weight: 500;
        }
    }

    footer {
        align-self: flex-end;

        button {
            padding: 13px 50px;
            background: #8ac03b;
            color: #fff;
            text-transform: uppercase;
            border: none;

            &:hover {
                cursor: pointer;
            }
        }
    }


    `
)