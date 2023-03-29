import React from 'react';
import { Route, Routes } from 'react-router-dom';
import IngredientsDisplay from './ingredients/ingredients';
import Navbar from './Navbar';
import SingleIngredient from './ingredients/SingleIngredient';
import MenuDisplay from './menu/menu';
import SingleMenu from './menu/SingleMenu';
import CoursesDisplay from './Courses/courses';
import SingleCourse from './Courses/Singlecourse';
import Reviews from './Reviews/reviews';

export default function RoutesFunction() {
  return (
    <div>

    <div>
            <Navbar />
          </div>
    <Routes>
      <Route path="/" element={<MenuDisplay />} />
      <Route path="/ingredients" element={<IngredientsDisplay />} />
      <Route path="/ingredients/:id" element={<SingleIngredient />} />
      <Route path="/menu/:id" element={<SingleMenu />} />
      <Route path="/courses" element={<CoursesDisplay />} />
      <Route path="/courses/:id" element={<SingleCourse />} />
      <Route path="/reviews/:id" element={<Reviews />} />
    </Routes>
    </div>

  );
}