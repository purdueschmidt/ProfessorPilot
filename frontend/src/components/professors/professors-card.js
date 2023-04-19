import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

const ProfessorCard = ({ professor, Rating, Communication, Organization, Availability, Grading, Competency }) => {
  const navigate = useNavigate();
  const handleProfessorClick = () => {
    navigate(`/professorsPage/${professor}`);
  };

  return (
    <Card className='card'>
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h5" component="h2">
              {professor}
            </Typography>
            <Link component="button" onClick={handleProfessorClick}>
              View Reviews
            </Link>
          </Grid>
          <Grid item xs={1}>
            <Divider orientation="vertical" flexItem />
          </Grid>
          <Grid item xs={5}>
            <Typography className='text' variant="h5"  color="textPrimary">Rating: {Rating}</Typography>
            <Typography className='text' variant="subtitle1" color="textPrimary">Communication: {Communication}</Typography>
            <Typography className='text' variant="subtitle1" color="textPrimary">Organization: {Organization}</Typography>
            <Typography className='text' variant="subtitle1" color="textPrimary">Availability: {Availability}</Typography>
            <Typography className='text' variant="subtitle1" color="textPrimary">Grading: {Grading}</Typography>
            <Typography className='text' variant="subtitle1" color="textPrimary">Competency: {Competency}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProfessorCard;
