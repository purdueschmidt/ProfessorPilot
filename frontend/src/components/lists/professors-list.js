import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import ProfessorCard from "../cards/professors-card";

const ProfessorsList = () => {
  const [professors, setProfessors] = useState([]);
  const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

  const fetchProfessors = async () => {
    try {
      const response = await fetch(`${apiServerUrl}/reviews/professorsPage`);
      if (response.ok){
        const professors = await response.json();
        setProfessors(professors)
      }
    } catch (error) {
      console.error('Error fetching professors:', error);
      ;
    }
  };
  
  useEffect(() => {
    fetchProfessors();
  }, []);

  return (
    <div>
      <Container>
        <Grid container direction="column" spacing={3}>
          {professors.map((professor, index) => {
            console.log("Professors JSON: ", JSON.stringify(professor));
            return (
            <Grid item key={index}>
              <ProfessorCard 
                professor={professor.professor}
                Rating={professor.Rating}
                Communication={professor.Communication}
                Organization={professor.Organization}
                Availability={professor.Availability}
                Grading={professor.Grading}
                Competency={professor.Competency}
              />
            </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};


export default ProfessorsList;