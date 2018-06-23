import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import Edit from 'react-icons/lib/fa/pencil';
import Show from 'react-icons/lib/fa/eye';
import Delete from 'react-icons/lib/md/delete-forever';
import ErrorMessage from '../ErrorMessage';
import {
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  CardBody,
  Col,
  CardSubtitle,
  Container,
  ButtonGroup
} from 'reactstrap';
import ListLoader from '../loader/ListLoader';

const TaskQuery = gql`
  query tasks {
    tasks {
      edges {
        node {
          id
          task_id
          title
          description
          timer
          status
          created
          updated
        }
      }
    }
  }
`;

class Tasks extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;
    const { loading, tasks, error } = data;
    // console.log('T A S K S...', tasks);

    let options = {
      month: 'short',
      day: 'numeric'
    };

    const DateTimeFormat = daytime => {
      return (
        daytime.toLocaleDateString('es-MX', options) +
        ' a las ' +
        daytime.toLocaleTimeString()
      );
    };

    if (loading) {
      return (
        <Container>
          <ListLoader />
        </Container>
      );
    }

    if (JSON.stringify(tasks.edges) === '[]') {
      return (
        <Container>
          <Row>
            <Col sm="8">
              <Card body>
                <CardText>
                  <strong>No se han encontrado tareas</strong>
                </CardText>
              </Card>
            </Col>
          </Row>
        </Container>
      );
    } else if (tasks) {
      return (
        <Container>
          <br />
          <Row>
            {tasks.edges.map(task => (
              <Col key={task.node.id} sm="3">
                <Card body>
                  <CardBody>
                    <CardSubtitle>{task.node.title}</CardSubtitle>
                    {/* <CardSubtitle>{task.node.timer}</CardSubtitle> */}
                    {/* <CardText>{task.node.description}</CardText> */}
                    <CardText>
                      <small className="text-muted">
                        {DateTimeFormat(new Date(task.node.created))}
                      </small>
                    </CardText>
                    <Button color="success" size="sm">
                      <Edit />
                    </Button>
                    <Button color="" size="sm">
                      <Show />
                    </Button>
                    <Button color="danger" size="sm">
                      <Delete />
                    </Button>
                  </CardBody>
                </Card>
                <br />
              </Col>
            ))}
          </Row>
        </Container>
      );
    }
    if (error) {
      return (
        <Row>
          <Col>
            <ErrorMessage message="Ha ocurrido un error..." />
          </Col>
        </Row>
      );
    }
  }
}

const tasks = graphql(TaskQuery)(Tasks);

export default tasks;
