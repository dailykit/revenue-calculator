import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { reset } from '../state/actions';

const Left = () => {

    const dispatch = useDispatch();
    const { sub_stage } = useSelector(state => state);

    // Screen 1
    const [capacity, setCapacity] = React.useState(300);
    const [utilization, setUtilization] = React.useState(300);
    const [revenue, setRevenue] = React.useState('150');
    const [revenueOptions] = React.useState(['100', '150', '200', '250', '500', '750', '1 M']);
    const [profit, setProfit] = React.useState(-10);
    const [profitOptions] = React.useState([-20, -10, 0, 10, 20, 30, 40]);

    // Screen 2
    const [decide, setDecide] = React.useState(false);
    const [price, setPrice] = React.useState(200);
    const [priceOptions] = React.useState([20, 50, 70, 90, 74, 78, 200]);
    const [mealKitsPerDay, setMealKitsPerDay] = React.useState(200);
    const [mealKitsPerDayOptions] = React.useState([20, 50, 70, 90, 74, 78, 200]);
    const [recommendedPrice, setRecommendedPrice] = React.useState(2);
    const [recommendedPriceOptions] = React.useState([2, 6, 10, 12, 15, 20, 30]);

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
            case 'price': {
                const index = priceOptions.indexOf(price);
                if (index != priceOptions.length - 1 && decide) {
                    setPrice(priceOptions[index + 1]);
                }
                break;
            }
            case 'meal_kits_per_day': {
                const index = mealKitsPerDayOptions.indexOf(mealKitsPerDay);
                if (index != mealKitsPerDayOptions.length - 1 && decide) {
                    setMealKitsPerDay(mealKitsPerDayOptions[index + 1]);
                }
                break;
            }
            case 'recommended_price': {
                const index = recommendedPriceOptions.indexOf(recommendedPrice);
                if (index != recommendedPriceOptions.length - 1 && decide) {
                    setRecommendedPrice(recommendedPriceOptions[index + 1]);
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
            case 'price': {
                const index = priceOptions.indexOf(price);
                if (index != 0 && decide) {
                    setPrice(priceOptions[index - 1]);
                }
                break;
            }
            case 'meal_kits_per_day': {
                const index = mealKitsPerDayOptions.indexOf(mealKitsPerDay);
                if (index != 0 && decide) {
                    setMealKitsPerDay(mealKitsPerDayOptions[index - 1]);
                }
                break;
            }
            case 'recommended_price': {
                const index = recommendedPriceOptions.indexOf(recommendedPrice);
                if (index != 0 && decide) {
                    setRecommendedPrice(recommendedPriceOptions[index - 1]);
                }
                break;
            }
            default: return;
        }
    }

    return (
        <Style>
            <header>
                <button onClick={ () => dispatch(reset()) }> <i class="fas fa-circle-notch"></i> Start again </button>
            </header>

            {/* Screen 1 */}
            <div className="sub-stage" hidden={ sub_stage !== 0 }>
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

            {/* Screen 2 */}
            <div className="sub-stage" hidden={ sub_stage !== 1 }>
                <div className="row">
                    <div className="upper"> 
                        <div className="question">Your estimated price of ready to eat per serving:</div>
                        <div className="selector">
                            <i className={ sub_stage === 1 && !decide ? 'fas fa-minus hide' : 'fas fa-minus' } onClick={ () => handleDecrement('price') } />
                            <span >
                                ${ price }
                            </span> 
                            <i className={ sub_stage === 1 && !decide ? 'fas fa-plus hide' : 'fas fa-plus' } onClick={ () => handleIncrement('price') } />
                        </div>
                    </div>
                    <div className={ sub_stage === 1 && !decide ? 'lower disabled' : 'lower' }>
                        <div className="radio-group">
                            {
                                priceOptions.map(op => <span className={ op == price ? 'active' : '' } onClick={ () => setPrice(op) }>{ op }</span>)
                            }
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="upper"> 
                        <div className="question">Number of meal kits per day:</div>
                        <div className="selector">
                            <i className={ sub_stage === 1 && !decide ? 'fas fa-minus hide' : 'fas fa-minus' } onClick={ () => handleDecrement('meal_kits_per_day') } />
                            <span >
                                { mealKitsPerDay }
                            </span> 
                            <i className={ sub_stage === 1 && !decide ? 'fas fa-plus hide' : 'fas fa-plus' } onClick={ () => handleIncrement('meal_kits_per_day') } />
                        </div>
                    </div>
                    <div className={ sub_stage === 1 && !decide ? 'lower disabled' : 'lower' }>
                        <div className="radio-group">
                            {
                                mealKitsPerDayOptions.map(op => <span className={ op == mealKitsPerDay ? 'active' : '' } onClick={ () => setMealKitsPerDay(op) }>{ op }</span>)
                            }
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="upper"> 
                        <div className="question">Recommended Price of meal kit per serving:</div>
                        <div className="selector">
                            <i className={ sub_stage === 1 && !decide ? 'fas fa-minus hide' : 'fas fa-minus' } onClick={ () => handleDecrement('recommended_price') } />
                            <span >
                                ${ recommendedPrice }
                            </span> 
                            <i className={ sub_stage === 1 && !decide ? 'fas fa-plus hide' : 'fas fa-plus' } onClick={ () => handleIncrement('recommended_price') } />
                        </div>
                    </div>
                    <div className={ sub_stage === 1 && !decide ? 'lower disabled' : 'lower' }>
                        <div className="radio-group">
                            {
                                recommendedPriceOptions.map(op => <span className={ op == recommendedPrice ? 'active' : '' } onClick={ () => setRecommendedPrice(op) }>{ op }</span>)
                            }
                        </div>
                        <div className="help-text">
                            The price of meal kit will depend on several factors, including the food cost, brand premium, delivery service etc.
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="toggle">
                            <span> Decide Yourself </span>
                            <span className="toggle-bg">
                                <span className={ decide ? 'toggle-btn active' : 'toggle-btn' } onClick={ () => setDecide(!decide) }></span>
                            </span>
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

                    &.hide {
                        &:hover {
                            cursor: default;
                            opacity: 0.7;
                        }
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

            &.disabled {
                opacity: 0.5;
                pointer-events: none;
            }

            .help-text {
                font-size: 12px;
                font-weight: 300;
                font-style: italic;
                color: #ebebeb;
                margin-top: 10px;
            }
        }

        .toggle {
            position: relative;
            color: #8ac03b;
            text-transform: uppercase;
            text-align: center;

            .toggle-bg {
                position: absolute;
                height: 3px;
                width: 30px;
                background: #8ac03b;
                top: 50%;
                transform: translateY(-50%);
                margin-left: 20px;

                .toggle-btn {
                    transition: .2s ease;
                    position: absolute;
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: #c3c3c3;
                    transform: translateY(-40%);
                    left: -20%;

                    &:hover {
                        cursor: pointer;
                    }

                    &.active {
                        left: 60%;
                    }
                }
            }
        }
    }
`