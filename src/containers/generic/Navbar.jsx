import React from "react";
import { Container, Group } from "@mantine/core";
import styles from "./Navbar.module.scss";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate("");
  return (
    <Container fluid className={styles.wrapper}>
      <Container className={styles.navbarContainer}>
        <Group onClick={() => navigate("/")}>
          <p className={styles.logo}>
            Git<span>SHOWCASE</span>
          </p>
        </Group>
      </Container>
    </Container>
  );
};

export default Navbar;
