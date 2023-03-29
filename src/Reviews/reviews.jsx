import React, { useEffect, useState } from 'react';
import {
  Card, Button, Container, Pagination, Col, Row, Dropdown
} from 'react-bootstrap'
import { useParams } from 'react-router-dom'; 

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reviews.slice(indexOfFirstItem, indexOfLastItem);
  const [sortBy, setSortBy] = useState('name'); // column to use to sort products
  const [order, setOrder] = useState(1);

  const totalPages = Math.ceil( reviews.length / itemsPerPage);
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
      fetch(`https://tarea-1.2023-1.tallerdeintegracion.cl/reviews/${id}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setReviews(json);
        
      });
  };

  useEffect(() => {
      apiGet();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSortByAttr = async () => {
        const sortedList = reviews.slice(0);
        sortedList.sort((a, b) => (a[sortBy] > b[sortBy] ? order : -order));
        setReviews(sortedList);
      };
  
      const handleNewSort = async (column) => {
        setSortBy(column);
        setOrder(-order);
        handleSortByAttr();
      };

    return (
      <div>
      <Container className="title-text">Reseñas</Container>
      <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Ordenar
      </Dropdown.Toggle>

      <Dropdown.Menu>
      <Dropdown.Item> <Button onClick={() => handleNewSort('rating')}>Ordenar Por Puntuación</Button></Dropdown.Item>
      <Dropdown.Item> <Button onClick={() => handleNewSort('date')}>Ordenar Por Fecha</Button></Dropdown.Item>

      </Dropdown.Menu>
    </Dropdown>
      
      <Row xs={1} md={2} lg={4} className="g-4">
        {currentItems.map((review) => (
          <Col key={review.date}>
            <Card>
              <Card.Body>
                <Card.Title>Nombre: {review.username}</Card.Title>
                <Card.Text>{review.content}</Card.Text>
                <Card.Text>Puntuación: {review.rating}</Card.Text>
                <Card.Text>Fecha: {review.date}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination>{pages}</Pagination>
    </div>
    );
 }
export default Reviews;
