import React from "react";
import styles from "./Landing.module.scss";
import { Container } from "@mantine/core";
import HeroSection from "../containers/landing/HeroSection";
import Navbar from "../containers/generic/Navbar";

const Landing = () => {
  return (
    <Container fluid className={styles.landingPageWrapper} padding={0}>
      <Navbar />
      <HeroSection />
    </Container>
  );
};

export default Landing;
