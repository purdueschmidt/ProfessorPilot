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
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { List, ListItem, ListItemText, TextField, Button } from '@mui/material';
import '../../styles/components/review-card.css'
import { useAuth0 } from '@auth0/auth0-react';


export const ProfessorReviewCard = ({_id, rating, professor, reviewText, communication, organization, availability, grading, competency, UpVotes, DownVotes, onVote, onCommentSubmit, Comments = []}) => {

    const [upVotes, setUpVotes] = useState(UpVotes);
    const [downVotes, setDownVotes] = useState(DownVotes);
    const [newComment, setNewComment] = useState('');

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

      const handleCommentSubmit = () => {
        onCommentSubmit(_id, newComment);
        setNewComment('');
      };

    return (
        <div>
        {isAuthenticated && (
        <>
            <Accordion sx={{ padding: 1, border:1, margin:1, minWidth: 200, mt: 2, mb: 2, backgroundColor: (theme) => theme.palette.background.paper }}>
                <AccordionSummary expandIcon={<ExpandMore />} aria-controls="review-content" id="review-header">

                            <Grid container>
                                <Grid item xs={2}>
                                    <Box sx={{ minWidth: 200, mt: 2, mb: 2 }}>
                                        
                                        <IconButton onClick={handleUpvote}>
                                            <ThumbUpIcon />
                                        </IconButton>
                                        <Typography variant="subtitle1">{upVotes}</Typography>
                                        <IconButton onClick={handleDownvote}>
                                            <ThumbDownIcon />
                                        </IconButton>
                                        <Typography variant="subtitle1">{downVotes}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={5} sm={5} md={5}>
                                    <Box sx={{ minWidth: 300, mt: 2, mb: 2 }}>
                                        <Box >
                                            <Typography color="primary" variant="h5">Rating {rating}</Typography>
                                        </Box>
                                        <Box> 
                                            <Typography variant="subtitle1">Communication: {communication}</Typography>
                                            <Typography variant="subtitle1">Organization: {organization}</Typography>
                                            <Typography variant="subtitle1">Availability: {availability}</Typography>
                                            <Typography variant="subtitle1">Grading: {grading}</Typography>
                                            <Typography variant="subtitle1">Competency: {competency}</Typography>
                                        </Box>
                                    </Box>
                                </Grid>
            
                                
                                <Grid item xs={5} sm={5} md={5}>
                                    <Box ml={1}>
                                        <Typography color="secondary.light" variant="subtitle1">Professor: {professor}</Typography>
                                        <Box padding={1} mt={1}>
                                            <Typography sx={{ wordBreak: "break-word" }}>{reviewText}</Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>

                </AccordionSummary>
                <AccordionDetails>
                    {/* <Typography className='text'>{comment}</Typography> */}
                    <Box>
                        <Typography variant="h6">Comments:</Typography>
                        <List>
                        {Comments.map((comment) => (
                            <ListItem key={comment._id}>
                            <ListItemText primary={comment.Username} secondary={comment.Comment} />
                            </ListItem>
                        ))}
                        </List>
                        <Box>
                            <TextField sx={{margin:1}} label="Add a comment" multiline rows={4} fullWidth value={newComment} onChange={(e) => setNewComment(e.target.value)}/>
                            <Button sx={{margin:2, padding:2}} onClick={handleCommentSubmit} type="submit" variant="contained" color="primary">Submit</Button>
                        </Box>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </>
        )}
        {!isAuthenticated && (
        <>
            <Card sx={{ backgroundColor: (theme) => theme.palette.background.paper, padding: 1, border:1, margin:1, minWidth: 200, mt: 2, mb: 2}}>
                <CardContent >
                    <Grid container>
                        <Grid item xs={12} md={3}>
                            <Box>
                                <Box>
                                    <Typography color="primary" variant="h5">Rating {rating}</Typography>
                                </Box>
                                <Box> 
                                    <Typography variant="subtitle1">Communication: {communication}</Typography>
                                    <Typography variant="subtitle1">Organization: {organization}</Typography>
                                    <Typography variant="subtitle1">Availability: {availability}</Typography>
                                    <Typography variant="subtitle1">Grading: {grading}</Typography>
                                    <Typography variant="subtitle1">Competency: {competency}</Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs={12} md={2}>
                            <Box  ml={1}>
                                <Typography color="secondary.light" variant="subtitle1">Professor: {professor}</Typography>
                                <Box mt={1}>
                                    <Typography sx={{ wordBreak: "break-word" }}>{reviewText}</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
        )}
    </div>
  );
};

