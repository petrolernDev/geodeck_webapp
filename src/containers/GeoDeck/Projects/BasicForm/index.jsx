import React from "react";
import { Container, Row } from "reactstrap";
import { withTranslation } from "react-i18next";
import AnimatedLineFormWithLabels from "./components/AnimatedLineFormWithLabels";
import VerticalForm from "./components/VerticalForm";
import showResults from "./Show";

const BasicForm = ({ t, toggle }) => (
  <Container>
    <Row>
      <AnimatedLineFormWithLabels toggle={toggle} />
    </Row>
  </Container>
);

export default withTranslation("common")(BasicForm);

{
  /*
  <VerticalForm onSubmit={showResults} />
  */
}
