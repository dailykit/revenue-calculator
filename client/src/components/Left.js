import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { nextSubStage, nextStage, prevSubStage } from '../state/actions';
import { reset, changeValue } from '../state/actions';

const Left = () => {

    const dispatch = useDispatch();
    const { sub_stage, last_stage, phase, capacity, utilization, utilization_percentage, revenue, profit, price, mealKitsPerDay, recommendedPrice } = useSelector(state => state);

    const [new_revenue, set_new_revenue] = React.useState(0);
    const [new_profit, set_new_profit] = React.useState(0);

    // Scroll to top
    React.useEffect(() => {
        window.scrollTo(0,0); 
    }, [sub_stage]);

    // Screen 1
    React.useEffect(() => {
        dispatch(changeValue({ price : (((revenue * 1000)/365)/utilization).toFixed(2) }));
    }, [revenue, utilization]);

    React.useEffect(() => {
        dispatch(changeValue({ recommendedPrice : profit > 0 ? (utilization_percentage < 70 ? (price - (0.15 * price)).toFixed(2) : price) : (price - (0.15 * price)).toFixed(2) }));
    }, [profit, utilization_percentage, price]);

    React.useEffect(() => {
        dispatch(changeValue({ mealKitsPerDay : utilization_percentage < 70 ? capacity - utilization : capacity + Math.floor(capacity * 0.2) - utilization, utilization_percentage : Math.floor((utilization / capacity) * 100) }))
    }, [capacity, utilization_percentage, utilization]);

    // Screen 2
    React.useEffect(() => {
        set_new_revenue(Math.floor((revenue * 1000 + ( 365 * mealKitsPerDay * recommendedPrice )) / 1000));
    }, [revenue, mealKitsPerDay, recommendedPrice])

    React.useEffect(() => {
        let temp;
        if (profit < 0) temp = 10;
        else if (profit >= 0 && profit < 10) temp = profit + 15;
        else if (profit >= 10 && profit < 20) temp = profit + 10;
        else temp = profit + 5;
        set_new_profit(temp);
    }, [profit]);

    const changeValueHandler = (name, value) => {
        dispatch(changeValue({ [name] : value }));
    }

    // Screen 1
    const [revenueOptions] = React.useState([100, 150, 200, 250, 500, 750, 1000]);
    const [profitOptions] = React.useState([-20, -10, 0, 10, 20, 30, 40]);

    // Screen 2
    const [decide, setDecide] = React.useState(false);
    const [priceOptions] = React.useState([2, 6, 10, 12, 15, 20, 30]);
    const [mealKitsPerDayOptions] = React.useState([20, 50, 70, 85, 100, 150, 200]);    
    const [recommendedPriceOptions] = React.useState([2, 6, 10, 12, 15, 20, 30]);
    
    // Screen 3
    const handleIncrement = (name) => {
        switch(name) {
            case 'revenue': {
                changeValueHandler('revenue', revenue + 10);
                break;
            }
            case 'profit': {
                changeValueHandler('profit', profit + 1);
                break;
            }
            case 'price': {
                if (decide) changeValueHandler('price' , Math.floor(price + 1));
                break;
            }
            case 'meal_kits_per_day': {
                if (decide) changeValueHandler('mealKitsPerDay', mealKitsPerDay + 10);
                break;
            }
            case 'recommended_price': {
                if (decide) changeValueHandler('recommendedPrice' , Math.floor(recommendedPrice + 1));
                break;
            }
            default: return;
        }
    }

    const handleDecrement = (name) => {
        switch(name) {
            case 'revenue': {
                changeValueHandler('revenue', revenue - 10 < 0 ? revenue : revenue - 10);
                break;
            }
            case 'profit': {
                changeValueHandler('profit', profit - 1);
                break;
            }
            case 'price': {
                if (decide) changeValueHandler('price' , Math.floor(price - 1) < 0 ? price : Math.floor(price - 1));
                break;
            }
            case 'meal_kits_per_day': {
                if (decide) changeValueHandler('mealKitsPerDay', mealKitsPerDay - 10 < 0 ? mealKitsPerDay : mealKitsPerDay - 10);
                break;
            }
            case 'recommended_price': {
                if (decide) changeValueHandler('recommendedPrice' , Math.floor(recommendedPrice - 1) < 0 ? recommendedPrice : Math.floor(recommendedPrice - 1));
                break;
            }
            default: return;
        }
    }

    return (
        <>
        <StyledLogo className="logo">
            <img src={require("../assets/logo.png")} width="150"/>
        </StyledLogo>
        <Style sub_stage={ sub_stage }>
            
            <header>
                <button onClick={ () => dispatch(reset()) }> <i className="fas fa-circle-notch"></i> Start again </button>
            </header>

            {/* Screen 1 */}
            <div className="sub-stage" hidden={ sub_stage !== 0 }>
                <div className="row">
                    <div className="upper"> 
                        <div className="question">How many servings can you do per day?</div>
                        <div className="selector">
                            <i className="fas fa-minus" onClick={ () => { capacity < 50 ? changeValueHandler('capacity', 0) : changeValueHandler('capacity', capacity - 50) } } />
                            <span >
                                { capacity } servings
                            </span> 
                            <i className="fas fa-plus" onClick={ () => { capacity > 950 ? changeValueHandler('capacity', 1000) : changeValueHandler('capacity', capacity + 50) } } />
                        </div>
                    </div>
                    <div className="lower">
                        <input type="range" min="0" step="10" max="1000" value="300" className="slider" value={ capacity } onChange={ e => changeValueHandler( 'capacity', parseInt(e.target.value))}/>
                    </div>
                </div>
                <div className="row">
                    <div className="upper"> 
                        <div className="question">How many servings are you doing as of today?</div>
                        <div className="selector">
                            <i className="fas fa-minus" onClick={ () => { utilization < 50 ? changeValueHandler( 'utilization', 0) : changeValueHandler( 'utilization', utilization - 50) } } />
                            <span >
                                { utilization } servings
                            </span> 
                            <i className="fas fa-plus" onClick={ () => { utilization > 950 ? changeValueHandler( 'utilization', 1000) : changeValueHandler( 'utilization', utilization + 50) } } />
                        </div>
                    </div>
                    <div className="lower">
                        <input type="range" min="0" step="10" max={ capacity } value="300" className="slider red-green" value={ utilization } onChange={ e => changeValueHandler( 'utilization', parseInt(e.target.value))}/>
                        {
                            Math.floor((utilization / capacity) * 100) != NaN && 
                            <span className="utilization"> { utilization_percentage }% utilization </span>
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="upper"> 
                        <div className="question">Revenue:</div>
                        <div className="selector">
                            <i className="fas fa-minus" onClick={ () => handleDecrement('revenue') } />
                            <span >
                                ${ revenue >= 1000?  (revenue/1000).toFixed(2) + 'M' : revenue + 'k' } 
                            </span> 
                            <i className="fas fa-plus" onClick={ () => handleIncrement('revenue') } />
                        </div>
                    </div>
                    <div className="lower">
                        <div className="radio-group">
                            {
                                revenueOptions.map((op, i) => <span key={ i } className={ op == revenue ? 'active' : '' } onClick={ () => changeValueHandler( 'revenue', op) }>{ op === 1000 ? '1 M' : op }</span>)
                            }
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="upper"> 
                        <div className="question">Net Profit:</div>
                        <div className="selector">
                            <i className="fas fa-minus" onClick={ () => handleDecrement('profit') } />
                            <span >
                                { profit }%
                            </span> 
                            <i className="fas fa-plus" onClick={ () => handleIncrement('profit') } />
                        </div>
                    </div>
                    <div className="lower">
                        <div className="radio-group red-green">
                            {
                                profitOptions.map((op ,i) => <span key={ i } className={ op == profit ? 'active' : '' } onClick={ () => changeValueHandler( 'profit', op) }>{ op }</span>)
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
                                priceOptions.map((op, i) => <span key={ i } className={ op == price ? 'active' : '' } onClick={ () => changeValueHandler( 'price', op) }>{ op }</span>)
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
                                mealKitsPerDayOptions.map((op, i) => <span key={ i } className={ op == mealKitsPerDay ? 'active' : '' } onClick={ () => changeValueHandler( 'mealKitsPerDay', op) }>{ op }</span>)
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
                                recommendedPriceOptions.map((op, i) => <span key={ i } className={ op == recommendedPrice ? 'active' : '' } onClick={ () => changeValueHandler( 'recommendedPrice', op) }>{ op }</span>)
                            }
                        </div>
                        <div className="help-text">
                            The price of meal kit will depend on several factors, including the food cost, brand premium, delivery service etc.
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="toggle" onClick={ () => setDecide(!decide) }>
                            <span> Decide Yourself </span>
                            <span className={ decide ? 'toggle-bg active' : 'toggle-bg' }>
                                <span className={ decide ? 'toggle-btn active' : 'toggle-btn' }></span>
                            </span>
                    </div>
                </div>
            </div>

            {/* Screen 3 */}
            <div className="sub-stage" hidden={ sub_stage !== last_stage }>
                <div className="row mt-2">
                    <h1>Target: </h1>
                </div>
                <div className="row mt-2">
                    <div className="stat">
                        <div className="title">
                            Number of meal kits to do
                        </div>
                        <div className="line">
                            ---------------------------------
                        </div>
                        <div className="value">
                            { mealKitsPerDay }/day
                        </div>
                    </div>
                    <div className="stat">
                        <div className="title">
                            Revenue
                        </div>
                        <div className="line">
                            ---------------------------------
                        </div>
                        <div className="value">
                            ${ new_revenue >= 1000 ? (new_revenue / 1000).toFixed(1) + 'M' : new_revenue + 'k' }
                        </div>
                    </div>
                    <div className="stat">
                        <div className="title">
                            Net Profit
                        </div>
                        <div className="line">
                            ---------------------------------
                        </div>
                        <div className="value">
                            { new_profit }%
                        </div>
                    </div>
                    <div className="stat">
                        <div className="title">
                            Capacity Utilization
                        </div>
                        <div className="line">
                            ---------------------------------
                        </div>
                        <div className="value">
                            100%
                        </div>
                    </div>
                    <div className="stat">
                        <div className="title">
                            Average Price/serving
                        </div>
                        <div className="line">
                            ---------------------------------
                        </div>
                        <div className="value">
                            ${ recommendedPrice }
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="title">
                        We recommend a phase wise approach:
                    </div>
                    <div className={ phase === 1 ? 'tile active' : 'tile' } onClick={ () => changeValueHandler( 'phase', 1 ) }>
                        <div className="tile-left">
                            <span className="tile-small"> Phase 1 </span>
                            <span className="tile-large"> Walk </span>
                        </div>
                        <div className="tile-right">
                            <span className="tile-small"> target achieved: 10-15% </span>
                            <span className="tile-large"> {(Math.floor( mealKitsPerDay * 0.1 ))} - {(Math.floor( mealKitsPerDay * 0.15 ))} <span className="tile-small">meal kits</span> </span>
                        </div>
                    </div>
                    <div className={ phase === 2 ? 'tile active' : 'tile' } onClick={ () => changeValueHandler( 'phase', 2 ) }>
                        <div className="tile-left">
                            <span className="tile-small"> Phase 2 </span>
                            <span className="tile-large"> Run </span>
                        </div>
                        <div className="tile-right">
                            <span className="tile-small"> target achieved: 15-50% </span>
                            <span className="tile-large"> {(Math.floor( mealKitsPerDay * 0.15 ))} - {(Math.floor( mealKitsPerDay * 0.5 ))} <span className="tile-small">meal kits</span> </span>
                        </div>
                    </div>
                    <div className={ phase === 3 ? 'tile active' : 'tile' } onClick={ () => changeValueHandler( 'phase', 3 ) }>
                        <div className="tile-left">
                            <span className="tile-small"> Phase 3 </span>
                            <span className="tile-large"> Sprint </span>
                        </div>
                        <div className="tile-right">
                            <span className="tile-small"> target achieved: 50-100% </span>
                            <span className="tile-large"> {(Math.floor( mealKitsPerDay * 0.5 ))} - {(Math.floor( mealKitsPerDay * 1 ))} <span className="tile-small">meal kits</span> </span>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <button hidden={ sub_stage === 0 } onClick={ () => dispatch(prevSubStage()) }>Back</button>
                <button hidden={ sub_stage === last_stage } onClick={ () => dispatch(nextSubStage()) }>Next</button>
                <button hidden={ sub_stage !== last_stage } onClick={ () => dispatch(nextStage()) }>Send me Report</button>
            </footer>
        </Style>
        </>
    );
}

export default Left;

const Style = styled.div`
    background: #121E33;
    min-height: 100vh;
    padding: 20px 50px;

    @media (max-width: 768px) {
        padding: 50px 10px;
    }

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

            @media (max-width: 768px) {
                flex-direction: column;

                .selector {
                    margin-top: 10px;
                    font-size: 14px;
                }
            }

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
            cursor: pointer;

            .toggle-bg {
                position: absolute;
                height: 3px;
                width: 30px;
                background: #c3c3c3;
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
                        background: #8ac03b;
                    }
                }

                &.active {
                    background: #8ac03b;
                }
            }
        }

        .stat {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            font-weight: 500;

            .title {
                flex: 1;
            }

            .line {
                flex: 1;
                font-weight: light;
                color: #44496b;
                text-align: center;

                @media (max-width: 768px) {
                  display: none;
                }
            }

            .value {
                min-width: 100px;
            }
        }

        .tile {
            background: #1d2b44;
            padding: 20px 25px;
            display: flex;
            justify-content: space-between;
            margin-top: 10px;

            .tile-left, .tile-right {
                display: flex;
                flex-direction: column;

                .tile-small {
                    font-size: 14px;
                }

                .tile-large {
                    font-size: 28px;

                    @media (max-width: 768px) {
                        font-size: 24px;
                    }
                }
            }

            &.active {
                background: #8ac03b;
            }

            &:hover {
                cursor: pointer;
            }

        }

        &.mt-2 {
            margin-top: 20px!important;
        }
    }

    footer {
        margin-top: 50px;
        width: -webkit-fill-available;
        display: none;
        justify-content: ${ props => props.sub_stage === 0 ? 'flex-end' : 'space-between' };

        @media (max-width: 768px) {
            display: flex;
        }

        button {
            padding: 10px;
            background: #8ac03b;
            color: #fff;
            text-transform: uppercase;
            border: none;

            &:nth-child(2) {
                margin-left: 10px;
            }

            &:hover {
                cursor: pointer;
            }
        }
    }
`

const StyledLogo = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1;
`