import React, { useEffect, useState } from 'react';
import {
  Card, Button, Container, Pagination, Col, Row, Dropdown
} from 'react-bootstrap'
import { useParams } from 'react-router-dom'; 

function SingleMenu() {
  const [ingredients, setIngredients] = useState([]);
  const [plates, setPlates] = useState([]);
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = plates.slice(indexOfFirstItem, indexOfLastItem);
  const [sortBy, setSortBy] = useState('name'); // column to use to sort products
  const [order, setOrder] = useState(1);

  const totalPages = Math.ceil( plates.length / itemsPerPage);
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <Pagination.Item key={i} active={i === currentPage} onClick={() => setCurrentPage(i)}>
        {i}
      </Pagination.Item>
    );
  }

  // Waiting for endpoint to be ready
  const apiGet = () => {
      fetch(`https://tarea-1.2023-1.tallerdeintegracion.cl/trays/${id}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setIngredients(json);
        setPlates(json.courses)
        
      });
  };

  useEffect(() => {
      apiGet();
    }, []);

    const handleSortByAttr = async () => {
        const sortedList = plates.slice(0);
        sortedList.sort((a, b) => (a[sortBy] > b[sortBy] ? order : -order));
        setIngredients(sortedList);
      };
  
      const handleNewSort = async (column) => {
        setSortBy(column);
        setOrder(-order);
        handleSortByAttr();
      };

    return (
      <div>
      <Container className="title-text">Información de {ingredients.name}</Container>
      <Row xs={1} md={2} lg={4} className="g-4">
          <Col key={ingredients.id}>
            <Card>
                <Card.Header as="h5">Featured</Card.Header>
              <Card.Body>
                <Card.Title>Nombre: {ingredients.name}</Card.Title>
                <Card.Title>Precio: {ingredients.price}</Card.Title>
                <Card.Title>Descripción:</Card.Title>
                <Card.Text>{ingredients.description}</Card.Text>
                <Card.Text>Tamaño: {ingredients.size}</Card.Text>
                <Card.Text>Expiración: {ingredients.expiration}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
      </Row>

      <Container className="title-text">Platos</Container>
      {/* <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Ordenar
      </Dropdown.Toggle>

      <Dropdown.Menu>
      <Dropdown.Item> <Button onClick={() => handleNewSort('category')}>Ordenar Por Categoria</Button></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown> */}
      
      <Row xs={1} md={2} lg={4} className="g-4">
        {currentItems.map((ingredient) => (
          <Col key={ingredient.id}>
            <Card style={{ width: '200px', height: '350px' }}>
              <Card.Img variant="top" style={{ width: '180px', height: '180px' }} src={ingredient.img_url} />
              <Card.Body>
                <Card.Title>{ingredient.name}</Card.Title>
                <Card.Text>Categoría: {ingredient.category}</Card.Text>
                <Button href={`/courses/${ingredient.id}`} variant="primary">Detalle</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination>{pages}</Pagination>
    </div>
    );
 }
export default SingleMenu;
