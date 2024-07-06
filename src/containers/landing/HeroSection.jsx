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
import { notifications } from "@mantine/notifications";

import axios from "axios";

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
  const handleSubmit = async (data) => {
    // Most used notification props

    const username = data.username;

    try {
      // Send a POST request to the API
      const response = await axios.get(
        `https://git-showcase-backend.vercel.app/api/github/user-exists/${username}`
      );

      // Assuming the API returns a JSON with a boolean property `exists`
      if (response.data.exists) {
        setDoesUserExist(true);
        navigate(`/editor?username=${username}`);
        // Handle logic for existing user, e.g., navigate to a user profile page
      } else {
        notifications.show({
          id: "invalid-username",
          withCloseButton: true,
          autoClose: 5000,
          title: "Invalid Username",
          message: "Please enter a valid username",
          color: "red",
          icon: <IconX />,
          className: "my-notification-class",
          style: { backgroundColor: "red", color: "white" },
          loading: false,
        });
      }
    } catch (error) {
      notifications.show({
        id: "invalid-username",
        withCloseButton: true,
        autoClose: 5000,
        title: "Something went wrong",
        message: "Please try again after some time",
        color: "red",
        icon: <IconX />,
        className: "my-notification-class",
        style: { backgroundColor: "red" },
        loading: false,
      });
    }
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
