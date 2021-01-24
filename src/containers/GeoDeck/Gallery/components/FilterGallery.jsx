import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import Gallery from './Gallery';
import Items from './imgs';

const tags = [
  { tag: 'img', title: 'Images' },
  { tag: 'video', title: 'Videos' },
  // { tag: 'chart', title: 'Charts' }
];

const FilterGallery = () => (
  <Col md={12} lg={12}>
      <Gallery tags={tags} />
  </Col>
);

export default FilterGallery;
