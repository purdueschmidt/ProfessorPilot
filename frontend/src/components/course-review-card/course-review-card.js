import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

import '../../styles/components/review-card.css'
import { useAuth0 } from '@auth0/auth0-react';


export const CourseReviewCard = ({ _id, term, year, rating, reviewer, course_code, reviewText, workload, organization, usefulness, interest, difficulty, UpVotes, DownVotes, onVote }) => {
    const [upVotes, setUpVotes] = useState(UpVotes);
    const [downVotes, setDownVotes] = useState(DownVotes);
    const { user } = useAuth0
    const { isAuthenticated } = useAuth0()
  
    useEffect(() => {
        setUpVotes(UpVotes);
        setDownVotes(DownVotes);
      }, [UpVotes, DownVotes]);

      const handleUpvote = () => {
        onVote(_id, 'upvote');
      };
      
      const handleDownvote = () => {
        onVote(_id, 'downvote');
      };
      
    
    return (
    <div>
        {!isAuthenticated && (
        <>
            <Card className='card' sx={{ minWidth: 200, mt: 2, mb: 2 }}>
                <CardContent className='card-content'>
                <Typography variant="h4" align="center" className="review-form-title" gutterBottom>Reviewer: {reviewer}</Typography>
                    <Grid container>
                        <Grid item xs={12} md={3}>
                            <Box className='rating-box'>
                                <Box className='rating'>
                                    <Typography className='text' variant="h6">Rating {rating}</Typography>
                                </Box>
                                <Typography className='text' variant="subtitle1">Workload {workload}</Typography>
                                <Typography className='text' variant="subtitle1">Organization {organization}</Typography>
                                <Typography className='text' variant="subtitle1">Usefulness {usefulness}</Typography>
                                <Typography className='text' variant="subtitle1">Interest {interest}</Typography>
                                <Typography className='text' variant="subtitle1">Difficulty {difficulty}</Typography>
                            </Box>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs={12} md={2}>
                            <Box className='info-box' ml={1}>
                                {/* <Typography className='text' variant="h6">{courseName}</Typography> */}
                                <Divider orientation="vertical" flexItem />
                                <Typography className='text' variant="subtitle1">{term}, {year}</Typography>
                                <Typography className='text' variant="subtitle1">Course Code: {course_code}</Typography>
                                <Box className='review-box' mt={1}>
                                    <Typography className='text'>{reviewText}</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
        )}
        {isAuthenticated && (
        <>
            <Card className='card' sx={{ minWidth: 200, mt: 2, mb: 2 }}>
                <CardContent className='card-content'>
                <Typography variant="h4" align="center" className="review-form-title" gutterBottom>Reviewer: {reviewer}</Typography>
                    <Grid container>
                        
                        <Grid item xs={12} md={1}>
                            <Box className='rating-box'>
                                
                                <IconButton className='upvote-button' onClick={handleUpvote}>
                                    <ThumbUpIcon />
                                </IconButton>
                                <Typography className='text' variant="subtitle1">{upVotes}</Typography>
                                <IconButton className='downvote-button' onClick={handleDownvote}>
                                    <ThumbDownIcon />
                                </IconButton>
                                <Typography className='text' variant="subtitle1">{downVotes}</Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <Box className='rating-box'>
                                <Box className='rating'>
                                    <Typography className='text' variant="h6">Rating {rating}</Typography>
                                </Box>
                                <Typography className='text' variant="subtitle1">Workload {workload}</Typography>
                                <Typography className='text' variant="subtitle1">Organization {organization}</Typography>
                                <Typography className='text' variant="subtitle1">Usefulness {usefulness}</Typography>
                                <Typography className='text' variant="subtitle1">Interest {interest}</Typography>
                                <Typography className='text' variant="subtitle1">Difficulty {difficulty}</Typography>
                            </Box>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs={12} md={2}>
                            <Box className='info-box' ml={1}>
                                {/* <Typography className='text' variant="h6">{courseName}</Typography> */}
                                <Divider orientation="vertical" flexItem />
                                <Typography className='text' variant="subtitle1">{term}, {year}</Typography>
                                <Typography className='text' variant="subtitle1">Course Code: {course_code}</Typography>
                                <Box className='review-box' mt={1}>
                                    <Typography className='text'>{reviewText}</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
        )}
    </div>

    // <Card className='card' sx={{ minWidth: 200, mt: 2, mb: 2 }}>
    //     <CardContent className='card-content'>
    //     <Typography variant="h4" align="center" className="review-form-title" gutterBottom>Reviewer: {reviewer}</Typography>
    //         <Grid container>
                
    //             <Grid item xs={12} md={1}>
    //                 <Box className='rating-box'>
                        
    //                     <IconButton className='upvote-button' onClick={handleUpvote}>
    //                         <ThumbUpIcon />
    //                     </IconButton>
    //                     <Typography className='text' variant="subtitle1">{upVotes}</Typography>
    //                     <IconButton className='downvote-button' onClick={handleDownvote}>
    //                         <ThumbDownIcon />
    //                     </IconButton>
    //                     <Typography className='text' variant="subtitle1">{downVotes}</Typography>
    //                 </Box>
    //             </Grid>

    //             <Grid item xs={12} md={3}>
    //                 <Box className='rating-box'>
    //                     <Box className='rating'>
    //                         <Typography className='text' variant="h6">Rating {rating}</Typography>
    //                     </Box>
    //                     <Typography className='text' variant="subtitle1">Workload {workload}</Typography>
    //                     <Typography className='text' variant="subtitle1">Organization {organization}</Typography>
    //                     <Typography className='text' variant="subtitle1">Usefulness {usefulness}</Typography>
    //                     <Typography className='text' variant="subtitle1">Interest {interest}</Typography>
    //                     <Typography className='text' variant="subtitle1">Difficulty {difficulty}</Typography>
    //                 </Box>
    //             </Grid>
    //             <Divider orientation="vertical" flexItem />
    //             <Grid item xs={12} md={2}>
    //                 <Box className='info-box' ml={1}>
    //                     {/* <Typography className='text' variant="h6">{courseName}</Typography> */}
    //                     <Divider orientation="vertical" flexItem />
    //                     <Typography className='text' variant="subtitle1">{term}, {year}</Typography>
    //                     <Typography className='text' variant="subtitle1">Course Code: {course_code}</Typography>
    //                     <Box className='review-box' mt={1}>
    //                         <Typography className='text'>{reviewText}</Typography>
    //                     </Box>
    //                 </Box>
    //             </Grid>
    //         </Grid>
    //     </CardContent>
    // </Card>
  );
};

    // <Card className='card' sx={{ minWidth: 200, mt: 2, mb: 2 }}>
    //     <CardContent className='card-content'>
    //     <Typography variant="h4" align="center" className="review-form-title" gutterBottom>Reviewer: {reviewer}</Typography>
    //         <Grid container>
    //             <Divider />
    //             <Grid item xs={12} md={1}>
    //                 <Box className='rating-box'>
                         
    //                     <IconButton className='upvote-button' onClick={handleUpvote}>
    //                         <ThumbUpIcon />
    //                     </IconButton>
    //                     <Typography className='text' variant="subtitle1">{upVotes}</Typography>
    //                     <IconButton className='downvote-button' onClick={handleDownvote}>
    //                         <ThumbDownIcon />
    //                     </IconButton>
    //                     <Typography className='text' variant="subtitle1">{downVotes}</Typography>
    //                 </Box>
    //             </Grid>

    //             <Grid item xs={12} md={3}>
    //                 <Box className='rating-box'>
    //                     <Box className='rating'>
    //                         <Typography className='text' variant="h6">Rating</Typography>
    //                     </Box>
    //                     <Typography className='text' variant="subtitle1">Workload: {workload}</Typography>
    //                     <Typography className='text' variant="subtitle1">Organization: {organization}</Typography>
    //                     <Typography className='text' variant="subtitle1">Usefulness: {usefulness}</Typography>
    //                     <Typography className='text' variant="subtitle1">Interest: {interest}</Typography>
    //                     <Typography className='text' variant="subtitle1">Difficulty: {difficulty}</Typography>
    //                 </Box>
    //             </Grid>
    //             <Divider orientation="vertical" flexItem />
    //             <Grid item xs={12} md={2}>
    //                 <Box className='info-box' ml={1}>
    //                     {/* <Typography className='text' variant="h6">{courseName}</Typography> */}
    //                     <Divider orientation="vertical" flexItem />
    //                     <Typography className='text' variant="subtitle1">{term}, {year}</Typography>
    //                     <Typography className='text' variant="subtitle1">Course Code: {course_code}</Typography>
    //                     <Box className='review-box' mt={1}>
    //                         <Typography className='text'>{reviewText}</Typography>
    //                     </Box>
    //                 </Box>
    //             </Grid>
    //         </Grid>
    //     </CardContent>
    // </Card>
