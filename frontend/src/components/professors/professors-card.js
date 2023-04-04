import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

const ProfessorCard = ({ professor }) => {
  const navigate = useNavigate();
  const handleProfessorClick = () => {
    navigate(`/professorsPage/${professor}`);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {professor}
        </Typography>
        <Link component="button" onClick={handleProfessorClick}>
          View Reviews
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProfessorCard;
