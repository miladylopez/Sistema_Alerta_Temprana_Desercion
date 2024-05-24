import React, { useState } from 'react';
import { Button, Card, Dropdown } from 'react-bootstrap';
import './Entrevista.css'; // Importar estilos CSS

const criterios = {
    "Información básica": {
        peso: 25,
        subcriterios: {
            "Estrato": 3,
            "Estado civil": 2,
            "Departamento": 2,
            "Grupo especial de protección constitucional": 3,
            "Necesidad educativa": 2,
            "Validó bachillerato": 2,
            "Discapacidad": 3,
            "N personas a cargo": 3,
            "EPS": 2,
            "Trabaja en ese periodo - Tipo trabajo": 3
        }
    },
    "Motivación, personalidad y autovaloración": {
        peso: 15,
        subcriterios: {
            "Impresión de sí mismo": 3,
            "Valores, opiniones y preferencias": 6,
            "Personalidad": 6
        }
    },
    "Habilidades de relaciones personales y contexto educativo": {
        peso: 15,
        subcriterios: {
            "Tacto-Asertividad": 3,
            "Actividades e intereses": 6,
            "Contexto Educativo": 6
        }
    },
    "Metas personales y visión": {
        peso: 40,
        subcriterios: {
            "Metas/objetivos": 15,
            "Planes profesionales": 15,
            "Congruencia entre Metas y Objetivos": 10
        }
    },
    "Presentación personal y habilidades de comunicación": {
        peso: 5,
        subcriterios: {
            "Presentación personal": 1,
            "Comunicación": 4
        }
    }
};

const calcularProbabilidadDesercion = (notas) => {
    let totalPeso = 0;
    let totalNotaPonderada = 0;
    
    for (let criterio in criterios) {
        const { peso, subcriterios } = criterios[criterio];
        totalPeso += peso;
        
        for (let subcriterio in subcriterios) {
            const pesoSubcriterio = subcriterios[subcriterio];
            const nota = notas[criterio]?.[subcriterio] || 0;
            totalNotaPonderada += (5 - nota) * pesoSubcriterio; // Invertir el valor de la nota del dropdown
        }
    }
    
    const notaMaxima = totalPeso * 5; // El valor máximo del dropdown es 5
    const probabilidad = (totalNotaPonderada / notaMaxima) * 100;
    return probabilidad;
};

const Entrevista1 = () => {
    const [notas, setNotas] = useState({});

    const calcularProbabilidad = () => {
        const probabilidad = calcularProbabilidadDesercion(notas);
        alert(`La probabilidad de deserción es: ${probabilidad.toFixed(2)}%`);
    };

    const handleNotaChange = (criterio, subcriterio, valor) => {
        setNotas({
            ...notas,
            [criterio]: {
                ...notas[criterio],
                [subcriterio]: valor
            }
        });
    };

    return (
        <div className="centrar-contenido">
            <Card className="card-personalizado">
                <Card.Header>Entrevista</Card.Header>
                <Card.Body>
                    <p>
                    Este es el formato final que se utilizará.<br></br>
                    Aunque actualmente no está asociado a ningún aspirante debido a que se están realizando<br></br>
                    ajustes en las bases de datos, esta es la estructura definitiva. Aunque aún no contiene estilos visuales,<br></br>
                    sí tiene la funcionalidad de calcular la probabilidad de deserción para cada subcriterio, según el rango asignado.
                    </p>
                    {Object.keys(criterios).map((criterio, index) => (
                        <div key={index}>
                            <h5>{criterio}</h5>
                            {Object.keys(criterios[criterio].subcriterios).map((subcriterio, subIndex) => (
                                <div key={subIndex} className="Botones-añadir">
                                    <span>{subcriterio}:</span>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id={`dropdown-${criterio}-${subcriterio}`}>
                                            {notas[criterio]?.[subcriterio] || 'Seleccionar'}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            {[...Array(6).keys()].map((valor) => (
                                                <Dropdown.Item key={valor} onClick={() => handleNotaChange(criterio, subcriterio, valor)}>
                                                    {valor}
                                                </Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            ))}
                        </div>
                    ))}
                </Card.Body>
                <Card.Footer>
                    <Button onClick={calcularProbabilidad}>Calcular Probabilidad</Button>
                </Card.Footer>
            </Card>
        </div>
    );
};

export default Entrevista1;
