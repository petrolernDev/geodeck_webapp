import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import _ from "lodash";
import moment from "moment";
import { Modal } from "reactstrap";
// import Carousel, { Dots } from "@brainhubeu/react-carousel";
// import ChevronLeftIcon from "mdi-react/ChevronLeftIcon";
// import ChevronRightIcon from "mdi-react/ChevronRightIcon";
// import "@brainhubeu/react-carousel/lib/style.css";
// import "@brainhubeu/react-carousel/lib/style.css";
import CardGallery from "./CardGallery";
import { DownloadOutlined } from "@ant-design/icons";
import { fetchGalleryItems } from "../../../../redux/actions/galleryAction";
import { sourceToTag } from "../../../../shared/helpers";
// import { CardMedia } from "@material-ui/core";
import CarouselGallery from "./CarouselGallery";
import { baseUrl, defaultImage } from "../../../../baseUrl";
import GalleryFilterButton from "./GalleryFilterButton";

class Gallery extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string,
        type: PropTypes.string,
        alt: PropTypes.string,
      })
    ).isRequired,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        tag: PropTypes.string,
        title: PropTypes.string,
      })
    ).isRequired,
  };

  state = {
    firstRender: true,
    items: [],
    currentTag: "all",
    tags: this.props.tags,
    lightboxIsOpen: false,
    currentItem: 0,
    carouselItems: [],
    sortFlag: false,
  };

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     // items: props.items,
  //     currentTag: "all",
  //     tags: props.tags,
  //     lightboxIsOpen: false,
  //     currentItem: 0,
  //     carouselItems: [],
  //   };
  // }

  componentDidMount() {
    this.props.fetchGalleryItems();
  }

  componentDidUpdate() {
    if (this.state.firstRender) {
      this.setState({ items: this.props.items, firstRender: false });
    }
  }

  onFilter = (tag) => {
    const { items } = this.props;
    if (tag === "all") {
      this.setState({
        items: items,
        currentTag: "all",
        sortFlag: !this.state.sortFlag,
      });
    } else {
      this.setState({
        items: items.filter((item) => {
          const itemTag = sourceToTag(item.source);
          return itemTag === tag;
        }),
        currentTag: tag,
        sortFlag: !this.state.sortFlag,
      });
    }
  };

  openLightbox = (index, event) => {
    event.preventDefault();
    this.carouselItems();
    this.setState({
      currentItem: index,
      lightboxIsOpen: true,
    });
  };

  closeLightbox = () => {
    this.setState({
      currentItem: 0,
      lightboxIsOpen: false,
    });
  };

  onChange = (value) => {
    this.setState({ currentItem: value });
  };

  carouselItems = () => {
    const { items } = this.state;
    this.setState({
      carouselItems: items.map((item) => item),
    });
  };

  handleRequestSort = (event, property) => {
    const { items } = this.state;
    let newItems = [];
    switch (property) {
      case "title":
        newItems = _.sortBy(items, function (o) {
          return o.title;
        });
        break;
      case "date":
        newItems = _.sortBy(items, function (o) {
          return new moment(o.time);
        }).reverse();
        break;
      default:
        newItems = _.sortBy(items, function (o) {
          return o.id;
        });
        break;
    }
    this.setState({ items: newItems });
  };

  renderFilters = () => {
    const { tags, currentTag } = this.state;
    return (
      <div className="gallery__btns d-flex">
        <button
          type="button"
          className={`gallery__btn${
            currentTag === "all" ? " gallery__btn--active" : ""
          }`}
          onClick={(e) => this.onFilter("all", e)}
        >
          all
        </button>
        {tags.map((btn, index) => (
          <button
            type="button"
            className={`gallery__btn${
              btn.tag === currentTag ? " gallery__btn--active" : ""
            }`}
            key={index}
            onClick={(e) => this.onFilter(btn.tag, e)}
          >
            {btn.title}
          </button>
        ))}
        <div className="gallery__btn">
          <GalleryFilterButton
            onRequestSort={this.handleRequestSort}
            sortFlag={this.state.sortFlag}
          />
        </div>
      </div>
    );
  };

  // renderThumbnail = (source, title) => {
  //   const defaultImage = `${process.env.PUBLIC_URL}/img/co2.png`;
  //   const imageUrl = `${process.env.PUBLIC_URL}/img/gallery/`;
  //   const sourceTag = sourceToTag(source);

  //   if (sourceTag === "img" || !source) {
  //     return (
  //       <CardMedia
  //         component="img"
  //         src={source ? `${imageUrl}${source}` : defaultImage}
  //         style={{ width: "50px", height: "35px" }}
  //         title={title}
  //       />
  //     );
  //   } else if (sourceTag === "video") {
  //     return (
  //       <CardMedia
  //         src={`${imageUrl}${source}`}
  //         autoPlay={true}
  //         loop={true}
  //         style={{ width: "50px", height: "50px" }}
  //         component="video"
  //         title={title}
  //       />
  //     );
  //   } else {
  //     return <div>NO IMAGE OR VIDEO!!!!</div>;
  //   }
  // };

  // renderCarousel = () => {
  //   return (
  //     <Carousel
  //       addArrowClickHandler
  //       arrowLeft={
  //         <div className="modal__btn">
  //           <ChevronLeftIcon className="modal__btn_left" />
  //         </div>
  //       }
  //       arrowRight={
  //         <div className="modal__btn">
  //           <ChevronRightIcon className="modal__btn_right" />
  //         </div>
  //       }
  //       value={this.state.currentItem}
  //       onChange={this.onChange}
  //     >
  //       {this.state.carouselItems.map(({ source, title }) => {
  //         return (
  //           <div className="card-header">{renderMedia(source, title)}</div>
  //         );
  //       })}
  //     </Carousel>
  //   );
  // };

  // renderDots = () => {
  //   return (
  //     <div
  //       style={{
  //         marginTop: "24px",
  //         // width: "300px",
  //         height: "60px",
  //         overflow: "hidden",
  //       }}
  //       className="d-flex justify-content-between"
  //     >
  //       <div
  //         style={{
  //           height: "90px",
  //           whiteSpace: "nowrap",
  //           overflowX: "scroll",
  //           overflowY: "hidden",
  //           "-webkit-overflow-scrolling": "touch",
  //         }}
  //       >
  //         <Dots
  //           value={this.state.currentItem}
  //           number={this.state.carouselItems.length}
  //           thumbnails={this.state.carouselItems.map(({ source, title }) =>
  //             this.renderThumbnail(source, title)
  //           )}
  //           value={this.state.currentItem}
  //           onChange={this.onChange}
  //         />
  //       </div>

  //       <p
  //         className="modal__footer"
  //         style={{ margin: "0 24px", alignItems: "center", flex: "1 0 auto" }}
  //       >
  //         {this.state.currentItem + 1} of {_.size(this.state.carouselItems)}
  //       </p>
  //     </div>
  //   );
  // };

  renderModal = () => {
    const { currentItem, lightboxIsOpen, carouselItems } = this.state;
    const item = carouselItems[currentItem];
    const itemSource = item?.source;

    return (
      <Modal
        isOpen={lightboxIsOpen}
        toggle={this.closeLightbox}
        className="modal-dialog--primary modal-dialog--carousel"
        style={{ margin: 0 }}
      >
        <div className="modal__body">
          <div className="modal__header">
            <button
              className="lnr lnr-cross modal__close-btn"
              type="button"
              onClick={this.closeLightbox}
            />
          </div>
          {/* {this.renderCarousel()}
          {this.renderDots()} */}

          <CarouselGallery
            items={carouselItems}
            activeIndex={currentItem}
            onChange={this.onChange}
          />

          <div className="modal__footer gallery-modal-footer">
            <a
              // target="_blank"
              href={
                itemSource ? `${baseUrl}/gallery/${itemSource}` : defaultImage
              }
              download
            >
              <DownloadOutlined className="gallery-download" />
            </a>
            <p>
              {currentItem + 1} of {_.size(carouselItems)}
            </p>
          </div>
        </div>
      </Modal>
    );
  };

  render() {
    const { items, firstRender } = this.state;

    if (!this.props.items) {
      return null;
    }

    // if (!_.isEmpty(this.props.items) && _.isEmpty(items)) {
    //   console.log("fill items-------------------");
    //   this.setState({ items: this.props.items });
    // }

    const iterateItems = firstRender ? this.props.items : items;

    return (
      <React.Fragment>
        {this.renderFilters()}

        <div className="gallery">
          {iterateItems?.map((item, index) => (
            <button
              className="gallery__img-wrap"
              key={`gallery-item-${index} `}
              onClick={(event) => this.openLightbox(index, event)}
            >
              <CardGallery item={item} />
            </button>
          ))}
          {this.renderModal()}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return { items: Object.values(state.galleries) };
};

export default connect(mapStateToProps, { fetchGalleryItems })(Gallery);
