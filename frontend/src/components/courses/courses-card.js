import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';


const CourseCard = ({ major, course_code, course_name, course_id }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/course-reviews/${course_id}`);
    };

  return (
    <Card onClick={handleClick} style={{ cursor: 'pointer' }}>
      <CardContent>
      <Typography variant="h5" component="div">
          {major} - {course_code}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course_name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
