import React from 'react';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
// ReactIcons
import Edit from 'react-icons/lib/fa/pencil';
import Show from 'react-icons/lib/fa/eye';
import Delete from 'react-icons/lib/md/delete-forever';
import IsDone from 'react-icons/lib/md/done-all';
import Prog from 'react-icons/lib/go/tools';
// Components
import ErrorMessage from '../ErrorMessage';
import ListLoader from '../loader/ListLoader';
import EditTask from '../EditTask';

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
  CardFooter,
  CardHeader
} from 'reactstrap';

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

class Task extends React.Component {
  render() {
    const { item } = this.props;

    const options = {
      month: 'short',
      day: 'numeric'
    };

    const DateTimeFormatCreated = daytime => {
      return (
        'Creado el ' +
        daytime.toLocaleDateString('es-MX', options) +
        ' ' +
        daytime.toLocaleTimeString()
      );
    };

    const DateTimeFormatUpdated = daytime => {
      return (
        'Editado el ' +
        daytime.toLocaleDateString('es-MX', options) +
        ' ' +
        daytime.toLocaleTimeString()
      );
    };

    let task_update;
    if (item.node.updated === null) {
      task_update = <small />;
    } else {
      task_update = (
        <small className="text-muted">
          {DateTimeFormatUpdated(new Date(item.node.updated))}
        </small>
      );
    }

    const InProgressOrFinished = in_progress => {
      if (in_progress === true) {
        in_progress = (
          <Button color="info" size="sm">
            En curso <Prog />
          </Button>
        );
      } else {
        in_progress = (
          <Button color="danger" size="sm">
            Finalizada <IsDone />
          </Button>
        );
      }
      return in_progress;
    };

    return (
      <Col key={item.node.id} sm="3" className="text-center">
        <Card
          body
          inverse
          style={{ backgroundColor: '#202028', borderColor: '#60D5FF' }}
        >
          <small> {item.node.task_id} </small>
          <CardHeader>
            <CardTitle>{item.node.title}</CardTitle>
          </CardHeader>
          <CardBody>
            <CardText>{item.node.description}</CardText>
            <CardText>Tiempo restante {item.node.timer}</CardText>
            <CardText>
              <Button color="success" size="sm">
                <Edit />
              </Button>
              <Button color="" size="sm">
                <Show />
              </Button>
              <Button color="danger" size="sm">
                <Delete />
              </Button>
            </CardText>
          </CardBody>
          <CardFooter>
            {InProgressOrFinished(item.node.status)}
            <CardText>
              <small className="text-muted">
                {DateTimeFormatCreated(new Date(item.node.created))}
              </small>
              <br />
              {task_update}
            </CardText>
          </CardFooter>
        </Card>
        <br />
      </Col>
    );
  }
}

class Tasks extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;
    const { loading, tasks, error } = data;
    // console.log('T A S K S...', tasks);

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
            {tasks.edges.map((item, index) => <Task item={item} key={index} />)}
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
