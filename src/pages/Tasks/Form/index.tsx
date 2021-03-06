import React, {useState, useEffect, ChangeEvent} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import { Button, Form} from 'react-bootstrap';
import api from '../../../services/api';

interface ITask{
    title: string;
    description: string;
}

const Tasks: React.FC = () => {

    const history = useHistory();
    const { id } = useParams<{id: string}>();
    const a = id;
    const b: number = +a;

    const [model, setModel] = useState<ITask>({
        title: '',
        description: ''
    });

    useEffect(() => {
       if(b !== undefined){
           findTask(b)
       }
        
    }, [b])

    function updatedModel(e: ChangeEvent<HTMLInputElement>){
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault();
    
        if(b !== undefined){
            const response = await api.put(`tasks/${b}`, model);
        }else {
            const response = await api.post('/tasks', model);
        }

        back();
    }

    async function findTask(b){
        const response = await api.get(`tasks/${b}`);
        setModel({
            title: response.data.title,
            description: response.data.description,
        })
    }

    function back() {
        history.goBack();
    }
    
    return(
        <div className="container">
            <br />
            <div className="task-header">
                <h1>New Task</h1>
                <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
            </div>
            <div className="container">
                <Form onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Label>Título</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="title" 
                            value = {model.title}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} 
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3}
                            name="description"
                            value={model.description}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                        />
                    </Form.Group>
                    <Button variant="dark" type="submit">
                        Salvar
                    </Button>
                </Form>
            </div>
            <br />
            
        </div>
    )
}

export default Tasks;