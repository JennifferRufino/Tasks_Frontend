import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import { Badge, Button, Table } from 'react-bootstrap';
import api from '../../services/api';
import moment from 'moment';
import './index.css';

// import { Container } from './styles';

interface ITask{
    id: number;
    title: string;
    description: string;
    finished: boolean;
    create_at: Date;
    updated_at: Date;

}

const Tasks: React.FC = () => {

    const [tasks, setTaks] = useState<ITask[]>([]);
    const history = useHistory();
    

    useEffect(() => {
        loadTask();
    }, [])

    async function loadTask() {
        const response = await api.get('/tasks');
        setTaks(response.data);
    }

    async function finishedTask(id: number){
        const response = await api.patch(`/tasks/${id}`)
        console.log(response)
        loadTask()
    }

    async function deletedTask(id: number){
        const response = await api.delete(`/tasks/${id}`)
        console.log(response)
        loadTask()
    }

    function formatData(date: Date) {
        return moment(date).format("DD/MM/YYYY")
    }

    function newTask() {
        history.push('/tarefas_cadastro')
    }

    function editeTask(id: number){
        console.log(id);
        history.push(`/tarefas_cadastro/${id}`)
    }

    function viewTask(id: number){
        console.log(id);
        history.push(`/tarefas/${id}`)
    }
    

    return(
        <div className="container">
            <br />
            <div className="task-header">
                <h1>Tasks Page</h1>
                <Button variant="dark" size="sm" onClick={newTask}>Nova tarefa</Button>
            </div>
        
            <br />
            <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Titúlo</th>
                    <th>Data de Atualização</th>
                    <th>Status</th>
                    <th>Ações</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        tasks.map(task => (
                            <tr key={task.id}>
                                <td>{task.id}</td>
                                <td>{task.title}</td>
                                <td>{formatData(task.updated_at)}</td>
                                <td>
                                    <Badge variant={task.finished ? "success" : "warning"}>
                                        {task.finished ? "FINALIZADO" : "PENDENTE"}
                                    </Badge>
                                </td>
                                <td>
                                    <Button size="sm" disabled={task.finished} onClick={() => editeTask(task.id)}>
                                        Editar
                                    </Button>{ ' ' }
                                    <Button size="sm" disabled={task.finished} variant="success" onClick={() => finishedTask(task.id)}>
                                        Finalizar
                                    </Button>{ ' ' }
                                    <Button size="sm" variant="info" onClick={() => viewTask(task.id)}>
                                        Visualizar
                                    </Button>{ ' ' }
                                    <Button size="sm" variant="danger" onClick={() => deletedTask(task.id)}>
                                        Deletar
                                    </Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Tasks;