import React from "react";
import "./CompareBlock.css";
import AOS from "aos";
import "aos/dist/aos.css";
import firstCardImg from "../../assets/default-ultimate.jpg";

const CompareBlock = () => {
  AOS.init();
  return (
    <div className="compare-block-body__hero">
      <div className="compare-block-body__title">
        <h1>ВЫ НОВИЧОК В MORTAL KOMBAT 11?</h1>
      </div>
      <div className="compare-block-body__wrapper">
        <div data-aos="zoom-in" className="compare-block__card">
          <div className="compare-block__card__inner">
            <img
              className="compare-block__cardImg"
              src={firstCardImg}
              alt="firstCardImg"
            />
            <div className="compare-block__meta">
              <h3>MORTAL KOMBAT 11 ULTIMATE</h3>
              <img src="https://cdn-prod.mortalkombat.com/ultimate/global/vectors/tiny-horizontal-rule.svg" alt="some text here" />
              <ul>
                Включает:
                <li>Базовая игра Mortal Kombat 11</li>
                <li>Боевой набор 2</li>
                <li>Mortal Kombat 11: Aftermath</li>
                <li>Боевой набор</li>
              </ul>
            </div>
          </div>
        </div>
        <div data-aos="zoom-in" className="compare-block__card">
          <div className="compare-block__card__inner">
            <img
              className="compare-block__cardImg"
              src="https://cdn-prod.mortalkombat.com/ultimate/purchase/packs/default-kombat-pack-2.jpg"
              alt="firstCardImg"
            />
            <div className="compare-block__meta">
              <h3>БОЕВОЙ НАБОР 2</h3>
              <img src="https://cdn-prod.mortalkombat.com/ultimate/global/vectors/tiny-horizontal-rule.svg" alt="some text here"/>
              <ul>
                Включает:
                <li>
                  <ul>
                    3 новых бойца
                    <li>Милина</li>
                    <li>Рейн</li>
                    <li>Рэмбо</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div data-aos="zoom-in" className="compare-block__card">
          <div className="compare-block__card__inner">
            <img
              className="compare-block__cardImg"
              src="https://cdn-prod.mortalkombat.com/ultimate/purchase/packs/default-aftermath.jpg"
              alt="firstCardImg"
            />
            <div className="compare-block__meta">
              <h3>MORTAL KOMBAT 11 ULTIMATE</h3>
              <img src="https://cdn-prod.mortalkombat.com/ultimate/global/vectors/tiny-horizontal-rule.svg" alt="some text here"/>
              <ul>
                Включает:
                <li>
                  <ul>
                    Mortal Kombat 11: Aftermath
                    <li>Новейшая киноистория</li>
                    <li>
                      <ul>
                        3 новых персонажа
                        <li>Шива, Фудзин и Робокоп</li>
                      </ul>
                    </li>
                    <li>3 новых набора</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div data-aos="zoom-in" className="compare-block__card">
          <div className="compare-block__card__inner">
            <img
              className="compare-block__cardImg"
              src="https://cdn-prod.mortalkombat.com/ultimate/purchase/packs/default-kombat-pack-1.jpg"
              alt="firstCardImg"
            />
            <div className="compare-block__meta">
              <h3>БОЕВОЙ НАБОР</h3>
              <img src="https://cdn-prod.mortalkombat.com/ultimate/global/vectors/tiny-horizontal-rule.svg" alt="some text here"/>
              <ul>
                Включает:
                <li>
                  <ul>
                    Боевой набор
                    <li>
                      Шан Цзун, Ночной Волк, Терминатор, Синдел, Джокер и Спаун
                    </li>
                    <li>6 наборов костюмов и 7 эксклюзивных костюмов</li>
                  </ul>
                </li>
                <li>Боевой набор 2</li>
                <li>Mortal Kombat 11: Aftermath</li>
                <li>Боевой набор</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareBlock;
