import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { nextStage } from '../state/actions';

const Report = () => {

    const dispatch = useDispatch();

    const [sending, setSending] = React.useState(false);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');

    const submit = async () => {
        try {
            setSending(true);
            const response = await fetch('/mail', {
                method : 'POST',
                headers : {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({ name, email })
            });
            const res = await response.json();
            setSending(false);
            if (res.success) {
                dispatch(nextStage());
            } else {
                throw Error(res.message);
            }
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <Style>
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

    h2 {
        font-size: 48px;
        margin-bottom: 16px;
    }

    p {
        line-height: 28px;
        margin-bottom: 65px;
    }

    .form {
        max-width: 300px;
        text-align: left;

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
`