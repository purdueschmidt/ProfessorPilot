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
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {course_name}
        </Typography>
        <Typography color="textSecondary">
          {course_code}
        </Typography>
        <Typography variant="body2" component="p">
          {major}
        </Typography>
        <Link component="button" onClick={handleCourseClick}>
          View Reviews
        </Link>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
