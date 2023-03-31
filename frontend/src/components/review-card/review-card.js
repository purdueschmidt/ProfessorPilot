import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import '../../styles/components/review-card.css'


const CourseReviewCard = ({term, year, courseCode, reviewText, workload, organization, usefulness, interest, difficulty }) => {

  return (
    <Card className='card' sx={{ minWidth: 200, mt: 2, mb: 2 }}>
        <CardContent className='card-content'>
            <Grid container>
                <Grid item xs={12} md={3}>
                    <Box className='rating-box'>
                        <Box className='rating'>
                            <Typography className='text' variant="h6">Rating</Typography>
                        </Box>
                        <Typography className='text' variant="subtitle1">Workload: {workload}</Typography>
                        <Typography className='text' variant="subtitle1">Organization: {organization}</Typography>
                        <Typography className='text' variant="subtitle1">Usefulness: {usefulness}</Typography>
                        <Typography className='text' variant="subtitle1">Interest: {interest}</Typography>
                        <Typography className='text' variant="subtitle1">Difficulty: {difficulty}</Typography>
                    </Box>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs={12} md={2}>
                    <Box className='info-box' ml={1}>
                        {/* <Typography className='text' variant="h6">{courseName}</Typography> */}
                        <Divider orientation="vertical" flexItem />
                        <Typography className='text' variant="subtitle1">{term}, {year}</Typography>
                        <Typography className='text' variant="subtitle1">Course Code: {courseCode}</Typography>
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

export default CourseReviewCard;
