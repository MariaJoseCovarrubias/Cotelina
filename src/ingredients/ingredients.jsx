import React, { useEffect, useState } from 'react';
import {
  Card, Button, Container, Pagination, Col, Row, Dropdown
} from 'react-bootstrap'
function IngredientsDisplay() {
  const [ingredients, setIngredients] = useState([]);
  //paginación ayuda chatGPT
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = ingredients.slice(indexOfFirstItem, indexOfLastItem);
  const [sortBy, setSortBy] = useState('name'); // column to use to sort products
  const [order, setOrder] = useState(1);

  const totalPages = Math.ceil(ingredients.length / itemsPerPage);
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
    fetch("https://tarea-1.2023-1.tallerdeintegracion.cl/ingredients")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setIngredients(json.items);
      });
  };

  useEffect(() => {
      apiGet();
    }, []);
    const handleSortByAttr = async () => {
      const sortedList = ingredients.slice(0);
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
      <Container className="title-text">Ingredientes</Container>
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
            <Card style={{ width: '200px', height: '350px' }}>
              <Card.Img variant="top" style={{ width: '180px', height: '180px' }} src={ingredient.img_url} />
              <Card.Body>
                <Card.Title>{ingredient.name}</Card.Title>
                <Card.Text>{ingredient.price}</Card.Text>
                <Button href={`/ingredients/${ingredient.id}`} variant="primary">Detalle</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination>{pages}</Pagination>
    </div>
    );

      
      // <div>
      //   <Container className="title-text">Ingredientes</Container>
      //   <CardGroup>
      //   {ingredients.map((ingredient) => (
      //         <Card>
      //         <Card.Img stylevariant="top" src={ingredient.img_url} />
      //         <Card.Body>
      //           <Card.Title>{ingredient.name}</Card.Title>
      //           <Card.Text>
      //           {ingredient.price}
      //           </Card.Text>
      //         </Card.Body>
              
      //       </Card>
      //       ))}

      //   </CardGroup>
      // </div>

      
    

}

export default IngredientsDisplay;
