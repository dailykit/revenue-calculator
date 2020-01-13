import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { nextSubStage, nextStage } from '../state/actions';

const Right = () => {

    const dispatch = useDispatch();
    const { sub_stage, last_stage, phase } = useSelector(state => state);

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
            <main hidden={ sub_stage !== 1 }>
                <h2> Your earnings: </h2>
                <table cellspacing="0" cellpadding="0">
                    <tbody>
                        <tr>
                            <td>Revenue</td>
                            <td>$150k <i className="fas fa-times-circle" /></td>
                            <td>$450k</td>
                            <td><i className="fas fa-arrow-up" />20%</td>
                        </tr>
                        <tr>
                            <td>Net profit</td>
                            <td>-20% <i className="fas fa-times-circle" /></td>
                            <td>10%</td>
                            <td><i className="fas fa-arrow-up" /> 30%</td>
                        </tr>
                        <tr>
                            <td>Capacity utilization</td>
                            <td>70% <i className="fas fa-times-circle" /></td>
                            <td>80%</td>
                            <td> <i className="fas fa-arrow-up" />10%</td>
                        </tr>
                    </tbody>
                </table>
            </main>
            <main hidden={ sub_stage !== 2 }>
                <div className={ phase === 1 ? 'tile active' : 'tile' }>
                    <div className="tile-left">
                        <span className="tile-small"> Start with </span>
                        <span className="tile-large"> Pilot </span>
                    </div>
                    <div className="tile-right">
                        <span className="tile-small"> target achieved: 10-15% </span>
                        <span className="tile-large"> 100/200 <span className="tile-small">meal kits</span> </span>
                    </div>
                </div>
                <div className={ phase === 2 ? 'tile active' : 'tile' }>
                    <div className="tile-left">
                        <span className="tile-small"> Start with </span>
                        <span className="tile-large"> Pilot </span>
                    </div>
                    <div className="tile-right">
                        <span className="tile-small"> target achieved: 10-15% </span>
                        <span className="tile-large"> 100/200 <span className="tile-small">meal kits</span> </span>
                    </div>
                </div>
                <div className={ phase === 3 ? 'tile active' : 'tile' }>
                    <div className="tile-left">
                        <span className="tile-small"> Start with </span>
                        <span className="tile-large"> Pilot </span>
                    </div>
                    <div className="tile-right">
                        <span className="tile-small"> target achieved: 10-15% </span>
                        <span className="tile-large"> 100/200 <span className="tile-small">meal kits</span> </span>
                    </div>
                </div>
                <div className={ phase === 1 ? 'content active' : 'content' }>
                    <div className="required">
                        <h5>Required: </h5>
                        <ol>
                            <li>Zero Capital</li>
                            <li>No extra space or Hardware</li>
                            <li>DailyKit Software</li>
                        </ol>
                    </div>
                    <div className="outcome">
                        <h5>At the end of Phase 1, you would have: </h5>
                        <ol>
                            <li>Introduced your Meal Kit services to your customers</li>
                            <li>Achieved social media marketing buzz</li>
                            <li>Started a Meal Kit Menu</li>
                            <li>Achieved Word of Mouth Marketing</li>
                            <li>Traffic to your website</li>
                        </ol>
                    </div>
                </div>
                <div className={ phase === 2 ? 'content active' : 'content' }>
                    <div className="required">
                        <h5>Required: </h5>
                        <ol>
                            <li>DailyKit Software</li>
                        </ol>
                    </div>
                    <div className="outcome">
                        <h5>At the end of Phase 2, you would have: </h5>
                        <ol>
                            <li>Introduced your Meal Kit services to your customers</li>
                            <li>Traffic to your website</li>
                        </ol>
                    </div>
                </div>
                <div className={ phase === 3 ? 'content active' : 'content' }>
                    <div className="required">
                        <h5>Required: </h5>
                        <ol>
                            <li>Zero Capital</li>
                            <li>DailyKit Software</li>
                        </ol>
                    </div>
                    <div className="outcome">
                        <h5>At the end of Phase 3, you would have: </h5>
                        <ol>
                            <li>Introduced your Meal Kit services to your customers</li>
                        </ol>
                    </div>
                </div>
            </main>
            <footer>
                <button hidden={ sub_stage === last_stage } onClick={ () => dispatch(nextSubStage()) }>Next</button>
                <button hidden={ sub_stage !== last_stage } onClick={ () => dispatch(nextStage()) }>Email me Report</button>
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
        flex: 1;

        h1 {
            font-size: 48px;
            margin-bottom: 20px;
            font-weight: normal;
        }

        h2 {
            font-size: 24px;
            font-weight: 500;
        }

        p {
            font-weight: 500;
        }

        table {
            width: 100%;
            border: none;

            tr {

                td {
                    padding: 10px;
                
                    &:nth-child(1) {
                        color: #1d2b44;
                        font-weight: 500;
                    }
                    
                    &:nth-child(2) {
                        font-size: 20px;
                        color: #1d2b44;
                        font-weight: 500;
                        
                        i {
                            font-size: 16px;
                            color: #ce2828;
                        }
                    }

                    &:nth-child(3) {
                        font-size: 20px;
                        color: #8ac03b;
                        font-weight: 500;
                    }

                    &:nth-child(4) {
                        font-size: 12px;
                        color: #0090e1;
                        font-weight: 500;
                    }
                }

                &:nth-child(2n) {
                    background: #ebebeb;
                }
            }
        }

        .tile {
            padding: 20px 0;
            display: none;
            justify-content: space-between;
            margin-top: 10px;
            color: #1d2b44;

            .tile-left, .tile-right {
                display: flex;
                flex-direction: column;

                .tile-small {
                    font-size: 14px;
                    margin-bottom: 10px;
                }

                .tile-large {
                    font-weight: 500;
                    font-size: 24px;
                }
            }

            &.active {
                display: flex;
            }
        }

        .content {
            display: none;
            color: 1d2b44;

            h5 {
                font-size: 20px;
                font-weight: normal;
                margin-bottom: 5px;
            }

            ol {
                padding-left: 20px;
                margin-bottom: 20px;

                li {
                    font-size: 18px;
                }
            }

            &.active {
                display: block;
            }
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