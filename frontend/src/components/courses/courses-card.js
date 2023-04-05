import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';


const CourseCard = ({ course_name, course_code, major }) => {
  const navigate = useNavigate();
  const handleCourseClick = () => {
    navigate(`/coursesPage/${course_code}`);
  };

  return (
    <Card className='card'>
      <CardContent className='cardcontent'>
        <Typography className='typography' variant="h5" component="h2">
          {course_name}
        </Typography>
        <Typography className='typography' color="textSecondary">
          {course_code}
        </Typography>
        <Typography className='typography' variant="body2" component="p">
          {major}
        </Typography>
        <Link className='link' component="button" onClick={handleCourseClick}>
          View Reviews
        </Link>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
