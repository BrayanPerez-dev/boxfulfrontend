"use client";
import Image from "next/image";
import React from "react";
import styles from "@/styles/Header.module.css";
import { Divider } from "antd";

const Header = () => {
  return (
    <header className={styles.header}>
      <Image
        src="/boxful.svg"
        alt="boxful logo"
        width={180}
        height={38}
        priority
      />
      <Divider type="vertical" rootClassName={styles.divider}/>
    </header>
  );
};

export default Header;
