import React, { useEffect, useRef, useState } from "react";
import { useDisclosure } from "@mantine/hooks";

import {
  Drawer,
  Button,
  Container,
  Tabs,
  rem,
  ActionIcon,
} from "@mantine/core";
import {
  IconBackground,
  IconPalette,
  IconMenu2,
  IconSquareArrowDownFilled,
} from "@tabler/icons-react";
import { saveAs } from "file-saver";
import * as htmlToImage from "html-to-image";

import styles from "./Editor.module.scss";
import Navbar from "../containers/generic/Navbar";
import ColorPalette from "../components/colorPalette/ColorPalette";
import { backgroundImages, colorPalette } from "../data/editorData";
import ContributionComponent from "../containers/editor/ContributionComponent";
import BackgroundImageChoice from "../components/backgroundImageChoice/BackgroundImageChoice";

const Editor = () => {
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
  const [activeImage, setActiveImage] = useState(null);
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
  };

  const handleImageSelected = (image) => {
    console.log("function running", image);
    setActiveImage(image.image);
  };

  const downloadImage = () => {
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
        <ActionIcon
          variant="filled"
          aria-label="IconSquareArrowDownFilled"
          ml={20}
          mt={20}
          onClick={downloadImage}
          pos={"absolute"}
          right={20}
        >
          <IconSquareArrowDownFilled
            style={{ width: "70%", height: "70%" }}
            stroke={1.5}
          />
        </ActionIcon>

        <div className={styles.editorPageContent}>
          {!isMobileView ? (
            <div className={styles.sidePanel}>
              <Tabs
                defaultValue="pallet"
                className={styles.tab}
                variant="pills"
              >
                <Tabs.List>
                  <Tabs.Tab
                    value="pallet"
                    leftSection={<IconPalette style={iconStyle} />}
                  ></Tabs.Tab>
                  <Tabs.Tab
                    value="background"
                    leftSection={<IconBackground style={iconStyle} />}
                  >
                    Background
                  </Tabs.Tab>
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
                      defaultValue="pallet"
                      className={styles.tab}
                      variant="pills"
                    >
                      <Tabs.List>
                        <Tabs.Tab
                          value="pallet"
                          leftSection={<IconPalette style={iconStyle} />}
                        ></Tabs.Tab>
                        <Tabs.Tab
                          value="background"
                          leftSection={<IconBackground style={iconStyle} />}
                        >
                          Background
                        </Tabs.Tab>
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
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default Editor;
