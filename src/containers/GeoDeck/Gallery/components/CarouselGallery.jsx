import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";
import { baseUrl } from "../../../../baseUrl";
import { renderMedia } from "../../../../shared/helpers";

const CarouselGallery = (props) => {
  const [animating, setAnimating] = useState(false);

  const { items, onChange, activeIndex } = props;

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    onChange(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    onChange(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    onChange(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        className="custom-tag carousel-item--custom"
        tag="div"
        key={item.id}
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
      >
        {renderMedia(item.source, item.title, `${baseUrl}/gallery`)}
        <CarouselCaption
          // className="text-danger"
          captionText={item.title}
          captionHeader={item.description}
          className="carousel-caption--custom"
        />
      </CarouselItem>
    );
  });

  return (
    <React.Fragment>
      <div style={{ width: "100%" }} className="d-flex">
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
        />

        <Carousel
          interval={false}
          activeIndex={activeIndex}
          next={next}
          previous={previous}
          className="carousel-slide"
        >
          {slides}
        </Carousel>

        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      </div>

      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
    </React.Fragment>
  );
};

export default CarouselGallery;
