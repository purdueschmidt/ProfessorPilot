import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CourseCard from "./courses-card";

const CoursesList = () => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:6060/api/courses/coursesPage');
      if (response.ok){
        const courses = await response.json();
        setCourses(courses)
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      ;
    }
  };
  
  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <Container>
        <Grid container direction="column" spacing={3}>
          {courses.map((course, index) => {
            console.log("Course JSON: ", JSON.stringify(course));
            return (
            <Grid item key={index}>
              <CourseCard 
                course_name={course.course_name}
                course_code={course.course_code} 
                major={course.major}  
              />
            </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};


export default CoursesList;