import React, { useRef, useState } from "react";
import {
  Container,
  Grid,
  Title,
  TextInput,
  Button,
  Image,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import heroImage from "../../assets/images/heroImage.webp";
import styles from "./HeroSection.module.scss";
import { useNavigate } from "react-router";

const HeroSection = () => {
  const navigate = useNavigate();
  const [isInputFormShown, setIsInputFormShown] = useState(false);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
    },
  });

  const formRef = useRef();

  const handleSubmit = () => {
    navigate("/editor");
  };

  return (
    <Container className={styles.heroSectionWrapper}>
      <Grid gutter={{ base: 20, xs: "md", md: "xl", xl: 50 }}>
        <Grid.Col
          span={{ base: 12, md: 6, sm: 6, xs: 12 }}
          className={styles.textSection}
        >
          <Title order={1} className={styles.title}>
            <span>Bring your GitHub stats to life with</span> personalized
            banners
          </Title>

          <Button
            variant="filled"
            size="lg"
            onClick={() => setIsInputFormShown(true)}
          >
            Create yours now
          </Button>
        </Grid.Col>
        <Grid.Col
          span={{ base: 12, md: 6, sm: 6, xs: 0 }}
          className={styles.imageSection}
        >
          <Image src={heroImage} alt="Hero Image" />
        </Grid.Col>
      </Grid>
      {isInputFormShown && (
        <div
          className={styles.inputFormContainer}
          onClick={(e) => {
            if (formRef && !formRef.current.contains(e.target)) {
              setIsInputFormShown(false);
            }
          }}
        >
          <form
            onSubmit={form.onSubmit((values) => console.log("values", values))}
            className={styles.userNameInputForm}
            ref={formRef}
          >
            <TextInput
              withAsterisk
              label="username"
              key={form.key("username")}
              {...form.getInputProps("username")}
              className={styles.textInput}
            />
            <Group justify="flex-end" mt="md">
              <Button type="submit" onClick={handleSubmit}>
                Transform🪄
              </Button>
            </Group>
          </form>
        </div>
      )}
    </Container>
  );
};

export default HeroSection;
