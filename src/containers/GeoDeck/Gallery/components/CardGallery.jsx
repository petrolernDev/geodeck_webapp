import React from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import { baseUrl } from "../../../../baseUrl";
import { renderMedia } from "../../../../shared/helpers";

const CardGallery = (props) => {
  const { source, title, time, id } = props.item;

  return (
    <Card className="border-radius-spacing-0">
      <CardBody className="project-card__container">
        <CardHeader>{renderMedia(source, title,`${baseUrl}/gallery`)}</CardHeader>
      </CardBody>
    </Card>
  );
};

export default CardGallery;
