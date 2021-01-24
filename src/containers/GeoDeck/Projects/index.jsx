import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import CardProject from "./components/CardProject";
import CardNew from "./components/CardNew";
import { fetchProjects } from "../../../redux/actions/projectAction";

const ProjectCards = (props) => {
  const [projectList, setProjectList] = useState([]);
  const { projects, fetchProjects } = props;

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    setProjectList(projects);
  }, [projects]);

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Projects</h3>
          {/* <h3 className="page-subhead subhead">
            Load your project or create a new one
          </h3> */}
        </Col>
      </Row>
      <Row dir="ltr">
        {projectList.map((project, index) => {
          return (
            <Col
              md={4}
              xl={3}
              sm={12}
              className="d-flex project-card"
              key={`project-card-${index}`}
            >
              <CardProject item={project} />
            </Col>
          );
        })}
        <CardNew />
      </Row>
    </Container>
  );
  // }
};

const mapStateToProps = (state) => {
  // console.log(state);
  return { projects: Object.values(state.projects) };
};

export default connect(mapStateToProps, { fetchProjects })(ProjectCards);
