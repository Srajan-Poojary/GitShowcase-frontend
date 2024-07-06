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
import { IconX, IconCheck } from "@tabler/icons-react";
import { Notification, rem } from "@mantine/core";

const HeroSection = () => {
  const navigate = useNavigate();
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;

  const [isInputFormShown, setIsInputFormShown] = useState(false);
  const [doesUserExist, setDoesUserExist] = useState(true);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
    },
  });

  const formRef = useRef();

  const handleSubmit = (data) => {
    const username = data.username;
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => {
        if (response.ok) {
          console.log("User exists:", username);
          return response.json();
        } else if (response.status === 404) {
          console.log("User not found:", username);
          setDoesUserExist(false);
        } else {
          console.log("Some error occurred:", response.status);
        }
      })
      .then((data) => {
        if (data) {
          console.log(data); // Display user data
          setDoesUserExist(true);
          navigate(`/editor?username=${username}`);
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
      });
  };

  function checkGitHubUser(username) {}

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
            onSubmit={form.onSubmit((values) => handleSubmit(values))}
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
              <Button type="submit">Transform🪄</Button>
            </Group>
          </form>
          {!doesUserExist && (
            <Notification
              icon={xIcon}
              color="red"
              title="User doesnot exist!"
              className={styles.notification}
            >
              Please check your username
            </Notification>
          )}
        </div>
      )}
    </Container>
  );
};

export default HeroSection;
