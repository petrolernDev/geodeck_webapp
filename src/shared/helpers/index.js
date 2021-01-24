import { CardMedia } from "@material-ui/core";
import React from "react";
import { defaultImage } from "../../baseUrl";

const ligthTheme = {
  backgroundColor: "white",
  color: "#646777",
};

const darkTheme = {
  backgroundColor: "#2e2c34",
  color: "#dddddd",
};

export const themes = {
  ligthTheme,
  darkTheme,
};

export const toPercent = (decimal, fixed = 0) => `${decimal.toFixed(fixed)}%`;

export const toExtension = (source) =>
  source ? source.split(".").pop() : null;

export const sourceToTag = (source) => {
  const images = ["jpg", "gif", "png"];
  const videos = ["mp4", "3gp", "ogg", "webm"];
  const extension = toExtension(source);

  if (videos.includes(extension)) {
    return "video";
  } else if (images.includes(extension)) {
    return "img";
  }
  return "all";
};

export const renderMedia = (source, title, baseUrl) => {
  const sourceTag = sourceToTag(source);

  if (sourceTag === "img" || !source) {
    return (
      <CardMedia
        component="img"
        src={source ? `${baseUrl}/${source}` : defaultImage}
        style={{ minHeight: "auto" }}
        className={
          source
            ? "project-card__thumbnail project-card__thumbnail--valid"
            : " project-card__thumbnail project-card__thumbnail--default"
        }
        title={title}
      />
    );
  } else if (sourceTag === "video") {
    return (
      <CardMedia
        src={`${baseUrl}/${source}`}
        autoPlay={true}
        loop={true}
        // style={{ height: "150px" }}
        component="video"
        style={{ minHeight: "auto" }}
        className={"project-card__thumbnail project-card__thumbnail--valid"}
        title={title}
      />
    );
  } else {
    return <div>NO IMAGE OR VIDEO!!!!</div>;
  }
};

function getTooltipStyles(themeName, type) {
  switch (themeName) {
    case "theme-dark": {
      const { backgroundColor, color } = darkTheme;
      return {
        contentStyle: { backgroundColor },
        itemStyle: type === "defaultItems" ? null : { color },
      };
    }
    case "theme-light": {
      return ligthTheme;
    }
    default:
      return ligthTheme;
  }
}

export default getTooltipStyles;
