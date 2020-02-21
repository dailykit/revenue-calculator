import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { nextStage } from '../state/actions';

const Report = () => {

    const dispatch = useDispatch();
    const { phase, capacity, utilization, revenue, profit, price, mealKitsPerDay, recommendedPrice } = useSelector(state => state);
    const emailPattern = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
    const [sending, setSending] = React.useState(false);
    const [error, setError] = React.useState(undefined);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');

    const submit = async () => {
        try {
            if (name.length && emailPattern.test(email)) {
                setError(undefined);
                setSending(true);
                const response = await fetch('/mail', {
                    method : 'POST',
                    headers : {
                        'Content-Type': 'application/json'
                    },
                    body : JSON.stringify({ name, email, phase, capacity, utilization, revenue, profit, price, mealKitsPerDay, recommendedPrice })
                });
                const res = await response.json();
                setSending(false);
                if (res.success) {
                    dispatch(nextStage());
                } else {
                    setError('Looks like a problem on our end! Please try again later.');
                    throw Error(res.message);
                }
            } else {
                setError('Ugh! Are you high on Pizza? Check your inputs.');
            }
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <Style>
            <StyledLogo className="logo" onClick={ () => window.open('https://dailykit.org', '_blank') }>
                <img src={require("../assets/logo.png")} width="150"/>
            </StyledLogo>
            <h2> Great! Your report is ready... </h2>
            <p>Begin today your journey with our report! <br /> Fill the form and we will email your report to you shortly. </p>
            <div className="form">
                <div className="field">
                    <label> Start now by naming your meal kit </label>
                    <input placeholder="enter" value={ name } onChange={ (e) => setName(e.target.value) }/>
                </div>
                <div className="field">
                    <label> Enter your email address </label>
                    <input placeholder="enter" value={ email } onChange={ (e) => setEmail(e.target.value) }/>
                </div>
                <button onClick={ submit } disabled={ sending }>
                    { sending ? 'Sending...' : 'Email me report' }
                </button>
            </div>
            {
                error && 
                <div className="error">
                   { error }
                </div>
            }
        </Style>
    );
}

export default Report;

const Style = styled.div`
    background: #121e33;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #cecece;
    text-align: center;

    @media (max-width: 768px) {
        padding: 60px 10px;
    }

    h2 {
        font-size: 48px;
        margin-bottom: 16px;

        @media (max-width: 768px) {
            font-size: 32px;
        }
    }

    p {
        line-height: 28px;
        margin-bottom: 65px;
    }

    .form {
        max-width: 300px;
        text-align: left;
        margin-bottom: 10px;

        .field {
            margin-bottom: 25px;

            label {
                margin-bottom: 12px;
            }

            input {
                width: 100%;
                padding: 10px 20px;
                background-color: #1d2b44;
                border: none;
                color: #fff;
            }
        }

        button {
            width: 100%;
            padding: 13px 50px;
            background-color: #8ac03b
            color: #fff;
            text-transform: uppercase;
            border: none;

            &:hover {
                cursor: pointer;
            }
        }
    }

    .error {
        color: #C04169;
    }
`

const StyledLogo = styled.div`
    position: absolute;
    top: 30px;
    left: 10px;
    right: 10px;
    text-align: center;
    z-index: 1;
    cursor: pointer;

    @media (max-width: 768px) {
        top: 10px;
    }
`