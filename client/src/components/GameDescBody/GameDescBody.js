import React from 'react';
import './GameDescBody.css'
import firstInfoCardImage from '../../assets/mid-char-1.png'
import secondInfoCardImage from '../../assets/mid-char-2.png'
import thirdInfoCardImage from '../../assets/mid-char-3.png'
import fourthInfoCardImage from '../../assets/mid-char-4.png'
import fifthInfoCardImage from '../../assets/mid-char-5.png'
import tinyHorizontalLine from '../../assets/tiny-horizontal-rule.svg'
import AOS from 'aos'
import 'aos/dist/aos.css'

import CompareBlock from '../CompareBlock/CompareBlock';
import LearnMoreBlock from '../LearnMoreBlock/LearnMoreBlock';

const GameDescBody = () => {
    AOS.init()
    return (
        <div className="game-desc-body__hero">
        <div className="game-desc-body__wrapper">
        <img src="https://cdn-prod.mortalkombat.com/ultimate/global/vectors/tiny-horizontal-rule.svg" alt="some text here"/>
            <div className="game-desc-body__title">
                <h1>
                    САМОЕ ПОЛНОЕ ИЗДАНИЕ MORTAL KOMBAT 11
                </h1>
                <p>
                    В составе издания MK11 Ultimate: базовая игра MK11, Боевой набор 1, дополнение Aftermath и новейший Боевой набор 2.
                </p>
            </div>
            <div data-aos="zoom-in-left" className="info-box" style={{alignSelf: "flex-start"}}>
                <div className="outer">
                    <div className="inner">
                        <div className="meta">
                            <h2>Две сюжетные истории</h2>
                            <img src={tinyHorizontalLine} alt="some text here"/>
                            <p>
                                Исполните роль защитников Земного царства в ДВУХ грандиозных сюжетных кампаниях, чтобы помешать Кронике повернуть время вспять и переписать историю. В битве за будущее всего сущего подвергнется испытанию дружба, и возникнут новые альянсы.
                            </p>
                        </div>
                        <div className="info-box__images">
                            <img className='secondInfoCardImage' src={secondInfoCardImage} alt="firstInfoCardImage" alt="some text here"/>
                            <img className='firstInfoCardImage' src={firstInfoCardImage} alt="firstInfoCardImage" alt="some text here"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="info-box" style={{alignSelf: "flex-end"}}>
                <div className="outer">
                    <div className="inner">
                        <div data-aos="fade-right" className="info-box__images">
                            <img className='thirdInfoCardImage' src={thirdInfoCardImage} alt="thirdInfoCardImage"/>
                        </div>
                        <div className="meta">
                            <h2>ВСЕ 37 БОЙЦОВ</h2>
                            <img src={tinyHorizontalLine} alt="some text here"/>
                            <p>
                                13 дополнительных персонажей: Шао Кан, Шан Цзун, Ночной Волк, Терминатор, Синдел, Джокер, Спаун, Фуджин, Шива, Робокоп, а также Милина, Рейн и Рэмбо.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="info-box" style={{alignSelf: "flex-start"}}>
                <div className="outer">
                    <div className="inner">
                        <div className="meta">
                            <h2>ВСЕ ВОЗМОЖНОСТИ И РЕЖИМЫ</h2>
                            <img src={tinyHorizontalLine} alt="some text here"/>
                            <p>
                                Все арены, добивания на аренах, бруталити, знаменитые фаталити и дружеские добивания Friendship.
                            </p>
                        </div>
                        <div data-aos="fade-left" className="info-box__images">
                            {/* <img className='secondInfoCardImage' src={secondInfoCardImage} alt="firstInfoCardImage"/> */}
                            <img className='fourthInfoCardImage' src={fourthInfoCardImage} alt="fourthInfoCardImage"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="info-box" style={{alignSelf: "flex-end"}}>
                <div className="outer">
                    <div className="inner">
                        <div data-aos="fade-left" className="info-box__images">
                            <img className='fifthInfoCardImage' src={fifthInfoCardImage} alt="fifthInfoCardImage"/>
                        </div>
                        <div className="meta">
                            <h2>БЕСПЛАТНЫЕ ОБНОВЛЕНИЯ ДЛЯ PS5 И XBOX SERIES X</h2>
                            <img src={tinyHorizontalLine} alt="some text here"/>
                            <ul>
                                <li>Динамическое разрешение до 4К</li>
                                <li>Улучшенные визуальные эффекты</li>
                                <li>Значительно сокращенное время загрузок</li>
                                <li>Совместимость с другими платформами и другими поколениями</li>
                            </ul>
                            {/* <Link>Узнать больше!</Link> */}
                            <div>Узнать больше!</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <CompareBlock />
        <LearnMoreBlock />
        </div>
    );
};

export default GameDescBody;