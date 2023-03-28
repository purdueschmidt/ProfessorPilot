import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const CourseReviewCard = ({ courseName, courseCode, term, year, reviewText, workload, organization, usefulness, interest, difficulty }) => {
  return (
    <Card sx={{ minWidth: 275, mt: 2, mb: 2 }}>
      <CardContent>
        <Grid container>
          <Grid item xs={12} md={4}>
            <Box>
              <Typography variant="h6">Rating</Typography>
              <Typography variant="subtitle1">Workload: {workload}</Typography>
              <Typography variant="subtitle1">Organization: {organization}</Typography>
              <Typography variant="subtitle1">Usefulness: {usefulness}</Typography>
              <Typography variant="subtitle1">Interest: {interest}</Typography>
              <Typography variant="subtitle1">Difficulty: {difficulty}</Typography>
            </Box>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs={12} md={7}>
            <Box ml={2}>
              <Typography variant="h6">{courseName}</Typography>
              <Typography variant="subtitle1">{courseCode} - {term}, {year}</Typography>
              <Box mt={1}>
                <Typography variant="body1">{reviewText}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CourseReviewCard;
