import React from 'react';
import Header from '../shared/header/header';
import Footer from '../shared/footer/footer';
import {GameColor} from '../../const';

const NotFoundScreen = () => {
  return (
    <>
      <Header />

      <main className="main">
        <h1 className="visually-hidden">Страница не найдена. Ошибка 404.</h1>
        <section className="not-found-screen">
          <div className="not-found-screen__container container">
            <h2 className="not-found-screen__title title">
              <span className="title_letter" style={{color: GameColor.DEFAULT_COLORS[0]}}>4</span>
              <span className="title_letter" style={{color: GameColor.DEFAULT_COLORS[1]}}>0</span>
              <span className="title_letter" style={{color: GameColor.DEFAULT_COLORS[2]}}>4</span>
            </h2>
            <p className="not-found-screen__description">Страница не найдена</p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};


export default NotFoundScreen;
