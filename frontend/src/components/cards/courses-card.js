import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';


const CourseCard = ({ course_name, course_code, major, Rating, Difficulty ,Interest, Usefulness, Organization, Workload }) => {
  const navigate = useNavigate();
  const handleCourseClick = () => {
    navigate(`/coursesPage/${course_code}`);
  };

  return (
    <Card className='card'>
      <CardContent className='cardcontent'>
        <Grid container>
          <Grid item xs={6}>
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
          </Grid>
          <Grid item xs={1}>
            <Divider orientation="vertical" flexItem />
          </Grid>
          <Grid item xs={5}>
            <Typography className='text' variant="subtitle1" color="textPrimary">Rating {Rating}</Typography>
            <Typography className='text' variant="subtitle1" color="textPrimary">Difficulty {Difficulty}</Typography>
            <Typography className='text' variant="subtitle1" color="textPrimary">Interest {Interest}</Typography>
            <Typography className='text' variant="subtitle1" color="textPrimary">Usefulness {Usefulness}</Typography>
            <Typography className='text' variant="subtitle1" color="textPrimary">Organization {Organization}</Typography>
            <Typography className='text' variant="subtitle1" color="textPrimary">Workload {Workload}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
