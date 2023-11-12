import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareGithub, faLinkedin  } from '@fortawesome/free-brands-svg-icons';

import "./Footer.scss"

import FooterLogo from "../../assets/static/icons/budgetify-v2.svg";

const Footer: React.FC = () => (
	<footer className="footer">
        <div className="footer__logo">
            <div className="footer__logo__wrapper">
                <img src={FooterLogo} alt="" className="footer__logo__wrapper__img" />
            </div>
            <div className="footer__logo__divider"></div>
            <div className="footer__logo__copyright">© Copyright 2023 Budgetify. All Rights Reserved</div>
        </div>
        
        <div className="footer__socials">
            <a href="https://github.com/kmikayilov" target="_blank" rel="noreferrer" className="footer__socials__item">
                <div className="footer__socials__item__logo"><FontAwesomeIcon icon={faSquareGithub} /></div>
            </a>
            <a href="https://www.linkedin.com/in/kananmikayilov/" target="_blank" rel="noreferrer" className="footer__socials__item">
                <div className="footer__socials__item__logo" ><FontAwesomeIcon icon={faLinkedin} /></div>
            </a>
        </div>
    </footer>
)

export default Footer