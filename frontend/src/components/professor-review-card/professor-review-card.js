import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import '../../styles/components/review-card.css'


const ProfessorReviewCard = ({professor, reviewText, communication, organization, availability, grading, competency}) => {
  return (
    <Card className='card' sx={{ minWidth: 200, mt: 2, mb: 2 }}>
        <CardContent className='card-content'>
            <Grid container>
                <Grid item xs={12} md={3}>
                    <Box className='rating-box'>
                        <Box className='rating'>
                            <Typography className='text' variant="h6">Rating</Typography>
                        </Box>
                        <Typography className='text' variant="subtitle1">Communication: {communication}</Typography>
                        <Typography className='text' variant="subtitle1">Organization: {organization}</Typography>
                        <Typography className='text' variant="subtitle1">Availability: {availability}</Typography>
                        <Typography className='text' variant="subtitle1">Grading: {grading}</Typography>
                        <Typography className='text' variant="subtitle1">Competency: {competency}</Typography>
                    </Box>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs={12} md={2}>
                    <Box className='info-box' ml={1}>
                        <Typography className='text' variant="subtitle1">Professor: {professor}</Typography>
                    <Box className='review-box' mt={1}>
                        <Typography className='text'>{reviewText}</Typography>
                    </Box>
                    </Box>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
  );
};

export default ProfessorReviewCard;