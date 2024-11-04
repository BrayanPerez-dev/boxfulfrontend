"use client";
import React from "react";
import styles from "@/styles/Hero.module.css";
import localFont from "next/font/local";
const bold = localFont({
  src: "../pages/fonts/AlbertSans-Bold.ttf",
  variable: "--albert-sans-bold",
});
const semiBold = localFont({
  src: "../pages/fonts/AlbertSans-SemiBold.ttf",
  variable: "--albert-sans-semi-bold",
});

const Hero = () => {
  return (
    <div className={styles.main}>
      <p className={`${styles.title} ${bold.variable}`}>Crea una orden</p>
      <span className={`${styles.description} ${semiBold.variable} `}>
        Dale una ventaja competitiva a tu negocio con entregas{" "}
        <span className={`${styles.boldText} ${bold.variable}`}> el mismo día </span> (Área
        Metropolitana) y{" "}
        <span className={`${styles.boldText} ${bold.variable}`}> el día siguiente </span> a nivel
        nacional.
      </span>
      
    </div>
  );
};

export default Hero;
