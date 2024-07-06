import cityLights from "../assets/images/cityLight-bg.webp";
import blueSky from "../assets/images/bluesky-bg.webp";
import clouds from "../assets/images/clouds-bg.webp";

export const colorPalette = [
  {
    id: 1,
    name: "classic",
    noContribution: "hsl(208, 23%, 11%)",
    lowContribution: "hsl(148, 66%, 16%)",
    mediumContribution: "hsl(148, 100%, 21%)",
    mediumHighContribution: "hsl(132, 62%, 40%)",
    highContribution: "hsl(130, 64%, 52%)",
  },
  {
    id: 2,
    name: "aqua",
    noContribution: "hsl(208, 23%, 11%)",
    lowContribution: "hsl(203, 100%, 37%)",
    mediumContribution: "hsl(195, 99%, 39%)",
    mediumHighContribution: "hsl(190, 100%, 42%)",
    highContribution: "hsl(190, 74%, 59%)",
  },
  {
    id: 3,
    name: "emerald",
    noContribution: "hsl(208, 23%, 11%)",
    lowContribution: "hsl(120, 100%, 20%)",
    mediumContribution: "hsl(120, 100%, 30%)",
    mediumHighContribution: "hsl(120, 100%, 40%)",
    highContribution: "hsl(120, 100%, 60%)",
  },
  {
    id: 4,
    name: "turquoise",
    noContribution: "hsl(208, 23%, 11%)",
    lowContribution: "hsl(180, 100%, 20%)",
    mediumContribution: "hsl(180, 100%, 30%)",
    mediumHighContribution: "hsl(180, 100%, 40%)",
    highContribution: "hsl(180, 100%, 60%)",
  },
];

export const backgroundImages = [
  {
    id: 1,
    alt: "Blue Sky",
    image: blueSky,
  },
  {
    id: 2,
    alt: "City Light",
    image: cityLights,
  },
  {
    id: 3,
    alt: "Clouds",
    image: clouds,
  },
];
