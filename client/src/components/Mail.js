import React from 'react';
import styled from 'styled-components';

const Mail = () => {
    return (
        <Style>
            <StyledLogo className="logo" onClick={ () => window.open('https://dailykit.org', '_blank') }>
                <img src={require("../assets/logo.png")} width="150"/>
            </StyledLogo>
            <i class="far fa-paper-plane"></i>
            <h2>Mail Sent!</h2>
            <p className="help-text">Please check your spam incase you don't find it.</p>
            <p>Thank you for your time! <br /> We look forward to help you with your queries.</p>
            <a href="https://www.dailykit.org/meetings/dailykit/15-minute-introduction-call">
                Schedule a call
            </a>
        </Style>
    );
}

export default Mail;

const Style = styled.div`
    background: #121e33;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #cecece;

    @media (max-width: 768px) {
        padding: 50px 10px;
    }

    i {
        font-size: 3rem;

        @media (max-width: 768px) {
            font-size: 2rem;
        }
    }

    h2 {
        font-size: 48px;

        @media (max-width: 768px) {
            font-size: 32px;
        }
    }

    p {
        line-height: 1.75;
        text-align: center;
        margin-bottom: 20px;
    }

    p.help-text {
        opacity: 0.7;
        margin-bottom: 128px;
    }

    a {
        padding: 15px 40px;
        text-transform: uppercase;
        background: none;
        color: #8ac03b;
        border: 1px solid #8ac03b;
        transition: .2s ease;

        &:hover {
            padding: 15px 45px;
            cursor: pointer;
        }
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