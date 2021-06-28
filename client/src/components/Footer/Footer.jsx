import React from 'react';
import './Footer.css'

const Footer = () => {
    return (
        <div className="footer-hero">
            <img src="https://cdn-prod.mortalkombat.com/ultimate/global/vectors/tiny-horizontal-rule.svg" alt=""></img>
            <div className="footer-container">
                <div className="footer__devs">
                    <img className="footer__devs__img" src="https://cdn-prod.mortalkombat.com/static/netherrealm.svg" alt="some text here"/>
                    <img className="footer__devs__img" src="https://cdn-prod.mortalkombat.com/static/wb-games-logo.svg" alt="some text here"/>
                </div>
                <div className="footer__platforms">
                    <img className="footer__platforms__img"alt="some text here" src="https://cdn-prod.mortalkombat.com/static/ps4_tm.svg" />
                    <img className="footer__platforms__img"alt="some text here" src="https://cdn-prod.mortalkombat.com/static/ps5_tm.svg" />
                    <img className="footer__platforms__img"alt="some text here" src="https://cdn-prod.mortalkombat.com/static/xbox-one.svg" />
                    <img className="footer__platforms__img"alt="some text here" src="https://cdn-prod.mortalkombat.com/static/xbox-series-x.svg" />
                    <img className="footer__platforms__img"alt="some text here" src="https://cdn-prod.mortalkombat.com/static/nintendo-switch.svg" />
                    <img className="footer__platforms__img"alt="some text here" src="https://cdn-prod.mortalkombat.com/static/pc-digital-download-logo.svg" />
                    <img className="footer__platforms__img"alt="some text here" src="https://cdn-prod.mortalkombat.com/static/stadia.svg" />
                </div>
                <div className="footer__info">
                    <div>MORTAL KOMBAT 11 Ultimate software © 2020 Warner Bros. Entertainment Inc. Developed by NetherRealm Studios. ©2020 Skydance Productions, LLC. Terminator® Dark Fate™ is a trademark of StudioCanal S.A. Spawn, its logo and its symbol are registered trademarks ©2020 Todd McFarlane Productions, Inc. All other related characters are TM and ©2020 Todd McFarlane Productions, Inc. All rights reserved. RoboCop and RoboCop 2 © Orion. "RoboCop" character and all related trademarks, logos, and materials TM Orion & © 2020 MGM. FIRST BLOOD ™ & © 1982 Studiocanal S.A. RAMBO: FIRST BLOOD PART II ™ & © 1985 Studiocanal S.A S. RAMBO III ™ & © 1988 Studiocanal S.A.S. All rights reserved. RAMBO ® is a Registered Trademark owned by Studiocanal S.A.S. JOKER and all related characters and elements © & ™ DC Comics. All rights reserved.</div>
                    <div>ЛОГОТИП WB GAMES, ЛОГОТИП WBIE, ИЗОБРАЖЕНИЕ ЩИТА WB, ЛОГОТИП NETHERREALM STUDIOS, MORTAL KOMBAT, ЛОГОТИП THE DRAGON, а также все связанные с ними персонажи и элементы являются торговыми марками и защищены авторским правом © Warner Bros. Entertainment Inc. (s20)</div>
                </div>
            </div>
        </div>
    );
};

export default Footer;