import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CourseCard from "../cards/courses-card";

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

const CoursesList = () => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${apiServerUrl}/reviews/coursesPage`);
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
                Rating={course.Rating}
                Difficulty={course.Difficulty}
                Interest={course.Interest}
                Usefulness={course.Usefulness}
                Organization={course.Organization}
                Workload={course.Workload}
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