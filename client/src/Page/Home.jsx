import React from 'react'
import { NavBar, Feedback, Footer, Working, Hero, Zk } from '../components/Landing';
import styles from '../style';
import Vcheck from '../components/Landing/vcheck';
import '../App.css'
import { BrowserRouter as Router, Routes, Route, NavLink, BrowserRouter } from 'react-router-dom';
const Home = () => {
  return (
    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <NavBar />
        <Hero />
        <Working />

        <Zk />
        <Vcheck />
        <Footer />
      </div>
    </div>
  );
};

export default Home