import React, { useEffect, useRef, useState } from "react";
import { useDisclosure } from "@mantine/hooks";

import {
  Drawer,
  Button,
  Container,
  Tabs,
  rem,
  ActionIcon,
  ColorPicker,
  Select,
} from "@mantine/core";
import {
  IconBackground,
  IconPalette,
  IconMenu2,
  IconSquareArrowDownFilled,
  IconTypography,
  IconDownload,
} from "@tabler/icons-react";
import blueSky from "../assets/images/bluesky-bg.webp";
import { saveAs } from "file-saver";
import * as htmlToImage from "html-to-image";

// import ColorPicker from "@rc-component/color-picker";
import "@rc-component/color-picker/assets/index.css";

import styles from "./Editor.module.scss";
import Navbar from "../containers/generic/Navbar";
import ColorPalette from "../components/colorPalette/ColorPalette";
import { backgroundImages, colorPalette } from "../data/editorData";
import ContributionComponent from "../containers/editor/ContributionComponent";
import BackgroundImageChoice from "../components/backgroundImageChoice/BackgroundImageChoice";

const Editor = () => {
  const [userNameColorPicked, colorChange] = useState("rgba(0, 0, 0, 0.7)");
  const [userNameFontWeight, fontWeightChange] = useState(400);
  const [userNameFontStyle, fontStyleChange] = useState("normal");
  const [isMobileView, setIsMobileView] = useState(false);
  const [activePallet, setActivePallet] = useState({
    id: 1,
    name: "classic",
    noContribution: "hsl(208, 23%, 11%)",
    lowContribution: "hsl(148, 66%, 16%)",
    mediumContribution: "hsl(148, 100%, 21%)",
    mediumHighContribution: "hsl(132, 62%, 40%)",
    highContribution: "hsl(130, 64%, 52%)",
  });
  const [activeImage, setActiveImage] = useState(blueSky);
  const [opened, { open, close }] = useDisclosure(false);
  const iconStyle = { width: rem(12), height: rem(12) };
  const gitComponentRef = useRef();

  useEffect(() => {
    if (window.innerWidth < 1200) {
      setIsMobileView(true);
    } else {
      setIsMobileView(false);
    }
    const handleResize = () => {
      console.log("ran on inital load");
      if (window.innerWidth < 1200) {
        setIsMobileView(true);
      } else {
        setIsMobileView(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePaletteSelected = (pallet) => {
    setActivePallet(pallet);
    close();
  };

  const handleImageSelected = (image) => {
    console.log("function running", image);
    setActiveImage(image.image);
    close();
  };

  const downloadImage = () => {
    console.log("download image", gitComponentRef.current);
    if (gitComponentRef.current) {
      // Capture the image without adjusting the size or scale
      htmlToImage
        .toPng(gitComponentRef.current)
        .then((dataUrl) => {
          // Trigger download
          saveAs(dataUrl, "contribution-graph.png");
        })
        .catch((error) => {
          console.error("Could not convert to image", error);
        });
    }
  };

  return (
    <>
      <Container fluid className={styles.editorPageWrapper}>
        <Navbar />
        <div className={styles.downloadButtonContainer}>
          <Button
            rightSection={
              <IconDownload size={14} pos={"absolute"} right={20} />
            }
            onClick={downloadImage}
          >
            Download
          </Button>
        </div>

        <div className={styles.editorPageContent}>
          {!isMobileView ? (
            <div className={styles.sidePanel}>
              <Tabs
                defaultValue="pallet"
                className={styles.tab}
                variant="pills"
              >
                <Tabs.List className={styles.tabList}>
                  <Tabs.Tab
                    value="pallet"
                    leftSection={<IconPalette style={iconStyle} />}
                  ></Tabs.Tab>
                  <Tabs.Tab
                    value="background"
                    leftSection={<IconBackground style={iconStyle} />}
                  ></Tabs.Tab>
                  <Tabs.Tab
                    value="typography"
                    leftSection={<IconTypography style={iconStyle} />}
                  ></Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="pallet" className={styles.tabContent}>
                  {colorPalette.map((palette) => (
                    <div
                      key={palette.id}
                      onClick={() => handlePaletteSelected(palette)}
                    >
                      <ColorPalette
                        colorName={palette.name}
                        shade1={palette.noContribution}
                        shade2={palette.lowContribution}
                        shade3={palette.mediumContribution}
                        shade4={palette.mediumHighContribution}
                        shade5={palette.highContribution}
                      />
                    </div>
                  ))}
                </Tabs.Panel>

                <Tabs.Panel value="background" className={styles.tabContent}>
                  {backgroundImages.map((image) => (
                    <div
                      key={image.id}
                      onClick={() => handleImageSelected(image)}
                    >
                      <BackgroundImageChoice
                        image={image.image}
                        alt={image.alt}
                        id={image.id}
                      />
                    </div>
                  ))}
                </Tabs.Panel>
                <Tabs.Panel value="typography" className={styles.tabContent}>
                  <div className={styles.typographyWrapper}>
                    <div className={styles.optionContainer}>
                      <label>Username color: </label>
                      <ColorPicker
                        format="rgba"
                        value={userNameColorPicked}
                        onChange={colorChange}
                      />
                    </div>
                    <div
                      className={`${styles.optionContainer} ${styles.flexOption}`}
                    >
                      <label>Font weight: </label>
                      <Select
                        placeholder="Pick a font weight"
                        data={[
                          "100",
                          "200",
                          "300",
                          "400",
                          "500",
                          "600",
                          "700",
                          "800",
                          "900",
                        ]}
                        defaultValue="400"
                        allowDeselect={false}
                        withCheckIcon={true}
                        checkIconPosition="right"
                        onChange={fontWeightChange}
                      />
                    </div>
                    <div
                      className={`${styles.optionContainer} ${styles.flexOption}`}
                    >
                      <label>Font style: </label>
                      <Select
                        placeholder="Pick a font style"
                        data={["italic", "normal", "oblique"]}
                        defaultValue="normal"
                        allowDeselect={false}
                        withCheckIcon={true}
                        checkIconPosition="right"
                        onChange={fontStyleChange}
                      />
                    </div>
                  </div>
                </Tabs.Panel>
              </Tabs>
            </div>
          ) : (
            <>
              <div>
                <Drawer
                  opened={opened}
                  onClose={close}
                  className={styles.drawer}
                >
                  <div className={styles.sidePanel}>
                    <Tabs
                      defaultValue="Palette"
                      className={styles.tab}
                      variant="pills"
                    >
                      <Tabs.List>
                        <Tabs.Tab
                          value="Palette"
                          leftSection={<IconPalette style={iconStyle} />}
                        ></Tabs.Tab>
                        <Tabs.Tab
                          value="background"
                          leftSection={<IconBackground style={iconStyle} />}
                        ></Tabs.Tab>
                        <Tabs.Tab
                          value="typography"
                          leftSection={<IconTypography style={iconStyle} />}
                        ></Tabs.Tab>
                      </Tabs.List>

                      <Tabs.Panel value="Palette" className={styles.tabContent}>
                        {colorPalette.map((palette) => (
                          <div
                            key={palette.id}
                            onClick={() => handlePaletteSelected(palette)}
                          >
                            <ColorPalette
                              colorName={palette.name}
                              shade1={palette.noContribution}
                              shade2={palette.lowContribution}
                              shade3={palette.mediumContribution}
                              shade4={palette.mediumHighContribution}
                              shade5={palette.highContribution}
                            />
                          </div>
                        ))}
                      </Tabs.Panel>

                      <Tabs.Panel value="background">
                        {backgroundImages.map((image) => (
                          <div
                            key={image.id}
                            onClick={() => handleImageSelected(image)}
                          >
                            <BackgroundImageChoice
                              image={image.image}
                              alt={image.alt}
                              id={image.id}
                            />
                          </div>
                        ))}
                      </Tabs.Panel>
                      <Tabs.Panel
                        value="typography"
                        className={styles.tabContent}
                      >
                        <div className={styles.typographyWrapper}>
                          <div className={styles.optionContainer}>
                            <label>Username color: </label>
                            <ColorPicker
                              format="rgba"
                              value={userNameColorPicked}
                              onChange={colorChange}
                            />
                          </div>
                          <div
                            className={`${styles.optionContainer} ${styles.flexOption}`}
                          >
                            <label>Font weight: </label>
                            <Select
                              placeholder="Pick a font weight"
                              data={[
                                "100",
                                "200",
                                "300",
                                "400",
                                "500",
                                "600",
                                "700",
                                "800",
                                "900",
                              ]}
                              defaultValue="400"
                              allowDeselect={false}
                              withCheckIcon={true}
                              checkIconPosition="right"
                              onChange={fontWeightChange}
                            />
                          </div>
                          <div
                            className={`${styles.optionContainer} ${styles.flexOption}`}
                          >
                            <label>Font style: </label>
                            <Select
                              placeholder="Pick a font style"
                              data={["italic", "normal", "oblique"]}
                              defaultValue="normal"
                              allowDeselect={false}
                              withCheckIcon={true}
                              checkIconPosition="right"
                              onChange={fontStyleChange}
                            />
                          </div>
                        </div>
                      </Tabs.Panel>
                    </Tabs>
                  </div>
                </Drawer>
              </div>

              <ActionIcon
                variant="filled"
                aria-label="hamburger"
                ml={20}
                mt={20}
                onClick={open}
                pos={"absolute"}
              >
                <IconMenu2
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
            </>
          )}

          <div className={styles.editorSection}>
            <ContributionComponent
              currentColorPalette={activePallet}
              gitComponentRef={gitComponentRef}
              currentBackgroundImage={activeImage}
              colorPickedForUsername={userNameColorPicked}
              fontWeightForUsername={userNameFontWeight}
              fontStyleForUsername={userNameFontStyle}
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default Editor;
