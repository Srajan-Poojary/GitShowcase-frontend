import React, { useState, useEffect, useRef } from "react";
import styles from "./ContributionComponent.module.scss";
import { saveAs } from "file-saver";
import * as htmlToImage from "html-to-image";

import axios from "axios";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import { config } from "../../../config";

const ContributionComponent = ({
  currentColorPalette,
  currentBackgroundImage,
  gitComponentRef,
}) => {
  const [contributionData, setContributionData] = useState([]);
  const [boxElements, setBoxElements] = useState([]);
  const [contributionDataArray, setContributionDataArray] = useState([]);
  const [startingMonth, setStartingMonth] = useState();
  const [userAvatar, setUserAvatar] = useState();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [username, setUsername] = useState("");

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const username = urlParams.get("username");

    console.log("username", username);

    if (username) {
      getUserData(username);
      getUserProfile(username);
      setUsername(username);
    }
  }, []);

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

  const getUserData = async (username) => {
    try {
      const data = {
        username: username,
      };

      const response = await axios.post(
        `${config.backendUrl}/api/github/contributions`,
        data
      );

      let contributionCountArray = [];
      response.data.contributionCountArray.forEach((week) => {
        week.contributionDays.map((day) =>
          contributionCountArray.push(day.contributionCount)
        );
      });

      setContributionDataArray(contributionCountArray);
      setContributionData(response.data.contributionCountArray);
      setStartingMonth(response.data.startingMonth);
    } catch (error) {
      console.log("error", error);
      notifications.show({
        id: "failed-to-fetch",
        withCloseButton: true,
        autoClose: 5000,
        title: "Failed to fetch your data",
        message: "Please try again after some time",
        color: "red",
        icon: <IconX />,
        className: "my-notification-class",
        style: { backgroundColor: "red" },
        loading: false,
      });
    }
  };

  const getUserProfile = async (username) => {
    try {
      const response = await axios.get(
        `${config.backendUrl}/api/github/avatar/${username}`
      );

      // https://git-showcase-backend.vercel.app/api/github/avatar/

      setUserAvatar(response.data.avatarUrl);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const elements = contributionData.map((week, weekIndex) => {
      // Check if the week's data is available
      if (week.contributionDays) {
        // Calculate percentiles from all contribution counts
        const percentiles = calculatePercentiles(contributionDataArray);

        const thresholds = calculateRangeThresholds(contributionDataArray);

        // Calculate how many days to pad at the start of the week
        const paddingDaysCount = 7 - week.contributionDays.length;
        const paddedDays = Array.from({ length: paddingDaysCount }, () => ({
          contributionCount: 0, // Assuming '0' as the default value for empty days
          date: null, // No date for the padded days
        }));

        // Concatenate the padded days with the actual days to ensure 7 days per week
        const allDays = [...paddedDays, ...week.contributionDays];

        // Render each day in the week, including the padded days
        const daysElements = allDays.map((day, dayIndex) => (
          <div
            key={`${weekIndex}-${dayIndex}`}
            className={`${styles.box}`}
            style={{
              backgroundColor: getBoxClass(day.contributionCount, thresholds),
            }}
          ></div>
        ));

        // Wrap the days in a container to represent the week row
        return (
          <div key={weekIndex} className={styles.weekRow}>
            {daysElements}
          </div>
        );
      }
      return null; // In case there's a week without any days (shouldn't happen, but just for safety)
    });

    setBoxElements(elements.filter((element) => element !== null)); // Filter out any null elements
  }, [contributionData, currentColorPalette]);

  const calculatePercentiles = (contributions) => {
    const sortedContributions = [...contributions].sort((a, b) => a - b);
    const percentiles = [25, 50, 75, 90].map((pct) => {
      const index = (sortedContributions.length * pct) / 100 - 1;
      return sortedContributions[Math.round(index)];
    });
    return percentiles;
  };

  const calculateRangeThresholds = (contributions) => {
    const maxContribution = Math.max(...contributions);
    const minContribution = Math.min(...contributions);
    const range = maxContribution - minContribution;
    const segment = range / 4; // Divide the range into four parts for five categories

    // Calculate thresholds that separate the color categories
    const thresholds = [
      minContribution + segment, // separates noContribution from lowContribution
      minContribution + 2 * segment, // separates lowContribution from mediumContribution
      minContribution + 3 * segment, // separates mediumContribution from mediumHighContribution
      maxContribution, // ensures anything above the last segment is highContribution
    ];

    return thresholds;
  };

  const getBoxClass = (count, thresholds) => {
    if (count === 0) {
      return currentColorPalette.noContribution;
    } else if (count <= thresholds[0]) {
      return currentColorPalette.lowContribution;
    } else if (count <= thresholds[1]) {
      return currentColorPalette.mediumContribution;
    } else if (count <= thresholds[2]) {
      return currentColorPalette.mediumHighContribution;
    } else {
      return currentColorPalette.highContribution;
    }
  };

  const generateMonthLabels = (startingMonth) => {
    const startIdx = parseInt(startingMonth, 10) - 1; // Convert to zero-based index
    let labels = [];

    for (let i = 0; i < 13; i++) {
      // 13 to include the starting month again at the end
      const monthIdx = (startIdx + i) % 12; // Wrap around using modulo
      labels.push(monthNames[monthIdx]);
    }

    return labels;
  };

  const monthLabels = startingMonth ? generateMonthLabels(startingMonth) : [];

  return (
    <div className={styles.wrapper}>
      {/* <button onClick={downloadImage}>Download</button> */}

      <div className={styles.componentWrapper} ref={gitComponentRef}>
        {currentBackgroundImage && (
          <img
            src={currentBackgroundImage}
            alt="background image"
            className={styles.backgroundImage}
          />
        )}

        <div className={styles.userNameAndGraphWrapper}>
          <div className={styles.userInfoWrapper}>
            <img src={userAvatar} alt="avatarUrl" />
            <p className={styles.userName}>@{username}</p>
          </div>

          <div className={styles.gitComponentWrapper}>
            <div className={styles.horizontalMonths}>
              {monthLabels.map((month, index) => (
                <p key={index} className={styles.username}>
                  {month}
                </p>
              ))}
            </div>
            <div className={styles.boxWrapper}>{boxElements}</div>

            <div className={styles.listOfWeek}>
              <p>Mon</p>
              <p>Wed</p>
              <p>Fri</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributionComponent;
