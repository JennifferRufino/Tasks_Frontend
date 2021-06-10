import React, {useState, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import { Badge, Button, Card } from 'react-bootstrap';
import moment from 'moment';
import api from '../../../services/api';

interface ITask{
    id: number;
    title: string;
    description: string;
    finished: boolean;
    create_at: Date;
    updated_at: Date;
}

const Details: React.FC = () => {

    const history = useHistory();
    const { id } = useParams<{id: string}>();
    const a = id;
    const b: number = +a;

    const [task, setTask] = useState<ITask>();

    useEffect(() => {
        findTask()
    }, [id])

    function back(){
        history.goBack();
    }

    async function findTask(){
        const response = await api.get<ITask>(`/tasks/${id}`);
        console.log(response);
        setTask(response.data);
    }

    function formatData(date: Date) {
        return moment(date).format("DD/MM/YYYY")
    }

  return (
      <div className="container">
          <br />
          <div className="task-header">
            <h1>Tasks Details</h1>
            <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
          </div>
          <br />
          <Card>
            <Card.Body>
                <Card.Title>{task?.title}</Card.Title>
                <Card.Text>
                    {task?.description}
                    <br />
                    <Badge variant={task?.finished ? "success" : "warning"}>
                        {task?.finished ? "FINALIZADO" : "PENDENTE"}
                    </Badge>
                    <br />
                    <strong>
                        Data de cadastro:
                        <Badge variant="info">
                            {formatData(task?.create_at)}
                        </Badge>
                    </strong>
                    <br/>
                    <strong>
                        Data de atualização:
                        <Badge variant="info">
                            {formatData(task?.updated_at)}
                        </Badge>
                    </strong>
                </Card.Text>
                
            </Card.Body>
            </Card>
      </div>
  )
}

export default Details;