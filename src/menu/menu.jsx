import React, { useEffect, useState } from 'react';
import {
  Card, Button, Container, Pagination, Col, Row, Dropdown
} from 'react-bootstrap'
function MenuDisplay() {
  const [menu, setMenu] = useState([]);
  //paginación ayuda chatGPT
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = menu.slice(indexOfFirstItem, indexOfLastItem);
  const [sortBy, setSortBy] = useState('name'); // column to use to sort products
  const [order, setOrder] = useState(1);

  const totalPages = Math.ceil(menu.length / itemsPerPage);
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
    fetch("https://tarea-1.2023-1.tallerdeintegracion.cl/trays")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setMenu(json.items);
      });
  };

  useEffect(() => {
    apiGet();
  }, []);

    const handleSortByAttr = async () => {
      const sortedList = menu.slice(0);
      sortedList.sort((a, b) => (a[sortBy] > b[sortBy] ? order : -order));
      setMenu(sortedList);
    };

    const handleNewSort = async (column) => {
      setSortBy(column);
      setOrder(-order);
      handleSortByAttr();
    };

    return (
      <div>
      <Container className="title-text">Menú</Container>
      <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Ordenar
      </Dropdown.Toggle>

      <Dropdown.Menu>
      <Dropdown.Item> <Button onClick={() => handleNewSort('name')}>Ordenar Por Nombre</Button></Dropdown.Item>
      <Dropdown.Item> <Button onClick={() => handleNewSort('price')}>Ordenar Por Precio</Button></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
      
      <Row xs={1} md={2} lg={4} className="g-4">
        {currentItems.map((ingredient) => (
          <Col key={ingredient.id}>
            <Card >
              <Card.Body>
                <Card.Title>{ingredient.name}</Card.Title>
                <Card.Text>{ingredient.price}</Card.Text>
                <Button href={`/menu/${ingredient.id}`} variant="primary">Detalle</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination>{pages}</Pagination>
    </div>
    );
    

}

export default MenuDisplay;
