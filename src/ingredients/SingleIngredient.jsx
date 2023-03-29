import React, { useEffect, useState } from 'react';
import {
  Card, Container, Col, Row, Button
} from 'react-bootstrap'
import { useParams } from 'react-router-dom'; 

function SingleIngredient() {
  const [ingredients, setIngredients] = useState([]);
  const { id } = useParams();

  // Waiting for endpoint to be ready
  const apiGet = () => {
      fetch(`https://tarea-1.2023-1.tallerdeintegracion.cl/ingredients/${id}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setIngredients(json);
      });
  };

  useEffect(() => {
      apiGet();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

    return (
      <div>
      <Container className="title-text">Información de {ingredients.name}</Container>
      <Row xs={1} md={2} lg={4} className="g-4">
          <Col key={ingredients.id}>
            <Card>
              <Card.Img variant="top"  src={ingredients.img_url} />
              <Card.Body>
                <Card.Title>Nombre: {ingredients.name}</Card.Title>
                <Card.Title>Precio: {ingredients.price}</Card.Title>
                <Card.Title>Descripción:</Card.Title>
                <Card.Text>{ingredients.description}</Card.Text>
                <Card.Text>Tamaño: {ingredients.size}</Card.Text>
                <Card.Text>Expiración: {ingredients.expiration}</Card.Text>
                <Button href={`/reviews/${ingredients.id}`} variant="primary">Reseñas</Button>
              </Card.Body>
            </Card>
          </Col>
      </Row>
    </div>
    );
 }
export default SingleIngredient;
