import React from 'react';
import styled from 'styled-components';

const Left = () => {

    const [capacity, setCapacity] = React.useState(300);
    const [utilization, setUtilization] = React.useState(300);
    const [revenue, setRevenue] = React.useState('150');
    const [revenueOptions] = React.useState(['100', '150', '200', '250', '500', '750', '1 M']);
    const [profit, setProfit] = React.useState(-10);
    const [profitOptions] = React.useState([-20, -10, 0, 10, 20, 30, 40]);

    const handleIncrement = (name) => {
        switch(name) {
            case 'revenue': {
                const index = revenueOptions.indexOf(revenue);
                if (index != revenueOptions.length - 1) {
                    setRevenue(revenueOptions[index + 1]);
                }
                break;
            }
            case 'profit': {
                const index = profitOptions.indexOf(profit);
                if (index != profitOptions.length - 1) {
                    setProfit(profitOptions[index + 1]);
                }
                break;
            }
            default: return;
        }
    }

    const handleDecrement = (name) => {
        switch(name) {
            case 'revenue': {
                const index = revenueOptions.indexOf(revenue);
                if (index != 0) {
                    setRevenue(revenueOptions[index - 1]);
                }
                break;
            }
            case 'profit': {
                const index = profitOptions.indexOf(profit);
                if (index != 0) {
                    setProfit(profitOptions[index - 1]);
                }
                break;
            }
            default: return;
        }
    }

    return (
        <Style>
            <header>
                <button> <i class="fas fa-circle-notch"></i> Start again </button>
            </header>
            <div className="sub-stage">
                <div className="row">
                    <div className="upper"> 
                        <div className="question">What's your available capacity?</div>
                        <div className="selector">
                            <i class="fas fa-minus" onClick={ () => { capacity < 50 ? setCapacity(0) : setCapacity(capacity - 50) } } />
                            <span >
                                { capacity } servings
                            </span> 
                            <i class="fas fa-plus" onClick={ () => { capacity > 450 ? setCapacity(500) : setCapacity(capacity + 50) } } />
                        </div>
                    </div>
                    <div className="lower">
                        <input type="range" min="0" step="10" max="500" value="300" class="slider" value={ capacity } onChange={ e => setCapacity(parseInt(e.target.value))}/>
                    </div>
                </div>
                <div className="row">
                    <div className="upper"> 
                        <div className="question">Available capacity utilization?</div>
                        <div className="selector">
                            <i class="fas fa-minus" onClick={ () => { utilization < 50 ? setUtilization(0) : setUtilization(utilization - 50) } } />
                            <span >
                                { utilization } servings
                            </span> 
                            <i class="fas fa-plus" onClick={ () => { utilization > 450 ? setUtilization(500) : setUtilization(utilization + 50) } } />
                        </div>
                    </div>
                    <div className="lower">
                        <input type="range" min="0" step="10" max="500" value="300" class="slider red-green" value={ utilization } onChange={ e => setUtilization(parseInt(e.target.value))}/>
                        <span className="utilization"> 70% utilization </span>
                    </div>
                </div>
                <div className="row">
                    <div className="upper"> 
                        <div className="question">Revenue:</div>
                        <div className="selector">
                            <i class="fas fa-minus" onClick={ () => handleDecrement('revenue') } />
                            <span >
                                ${ revenue } <span hidden={ revenue === '1 M' }>k</span>
                            </span> 
                            <i class="fas fa-plus" onClick={ () => handleIncrement('revenue') } />
                        </div>
                    </div>
                    <div className="lower">
                        <div className="radio-group">
                            {
                                revenueOptions.map(op => <span className={ op == revenue ? 'active' : '' } onClick={ () => setRevenue(op) }>{ op }</span>)
                            }
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="upper"> 
                        <div className="question">Net Profit:</div>
                        <div className="selector">
                            <i class="fas fa-minus" onClick={ () => handleDecrement('profit') } />
                            <span >
                                { profit }%
                            </span> 
                            <i class="fas fa-plus" onClick={ () => handleIncrement('profit') } />
                        </div>
                    </div>
                    <div className="lower">
                        <div className="radio-group red-green">
                            {
                                profitOptions.map(op => <span className={ op == profit ? 'active' : '' } onClick={ () => setProfit(op) }>{ op }</span>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Style>
    );
}

export default Left;

const Style = styled.div`
    background: #121E33;
    min-height: 100vh;
    padding: 20px 50px;

    header {
        text-align: right;
        color: #f2ede8;

        button {

            i {
                margin-right: 15px;
            }

            border: none;
            background: none;
            color: #f2ede8;
            font-size: 16px;

            &:hover {
                cursor: pointer;
            }

        }
    }

    .row {
        margin-top: 70px;
        color: #fff;

        .upper {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            align-items: baseline;

            .selector {
                background-color: #1d2b44;
                min-width: 220px;
                display: flex;
                justify-content: space-between;
                align-items: baseline;
                padding: 12px 0;
                -webkit-touch-callout: none; /* iOS Safari */
                -webkit-user-select: none; /* Safari */
                -khtml-user-select: none; /* Konqueror HTML */
                -moz-user-select: none; /* Old versions of Firefox */
                -ms-user-select: none; /* Internet Explorer/Edge */
                user-select: none;
                
                i {
                    margin: 0 25px;
                    opacity: 0.7;

                    &:hover {
                        opacity: 1;
                        cursor: pointer;
                    }
                }
            }
        }

        .lower {
            display: flex;
            flex-direction: column;

            .slider {
                -webkit-appearance: none; 
                background: #8ac03b; 
                width: 100%; 
                height: 5px;
                border-radius: 10px;
                outline: none;

                &::-webkit-slider-thumb { 
                    -webkit-appearance: none; 
                    cursor: pointer; 
                    background: #8ac03b; 
                    width: 25px; 
                    height: 25px;
                    border-radius: 50%; 
                } 

                &.red-green {
                    background: linear-gradient(to right, #9d3d3d 43%, #53c03b 98%);
                }
            }
            
            span.utilization {
                align-self: flex-end;
                font-size: 14px;
                font-weight: 300;
                color: #8ac03b;
                margin-top: 10px;
            }


            .radio-group {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: #1d2b44;
                height: 25px;

                span {
                    padding: 12px 5px;
                    flex: 1;
                    text-align: center;
                    transition: .2s ease;
                    opacity: 0.5;

                    &:hover {
                        cursor: pointer;
                    }

                    &.active {
                        background: #8AC03B;
                        opacity: 1;
                    }
                }

                &.red-green {
                    background: linear-gradient(to right, #9d3d3d 43%, #53c03b 98%);
                }
            }
        }
    }
`