import React from 'react'
import { NavBar, Feedback, Footer, Working, Hero, Zk } from '../components/Home';
import styles from '../style';
import Vcheck from '../components/Home/vcheck';
import { BrowserRouter as Router, Routes, Route, NavLink, BrowserRouter } from 'react-router-dom';
const Home = () => {
  return (
    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <NavBar />
        <Hero />
        <Working />
        {/* <Feedback /> */}
        <Zk />
        <Vcheck />
        <Footer />
      </div>
    </div>
  );
};

export default Home