'use client';

import { useRouter } from 'next/navigation';
import { Button, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const Background = styled('div')({
  position: 'fixed',
  width: '100%',
  height: '100%',
  background: 'url(/pantry2.jpg) no-repeat top center fixed',
  backgroundSize: '100%',
  zIndex: -1,
});

const CenteredBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  height: '100vh',
  textAlign: 'center',
  color: '#black',
  paddingTop: '15rem',
  textEmphasisStyle: 'bold',
});

export default function Landing() {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/signin'); // Navigate to the sign-in page
  };

  const handleSignUp = () => {
    router.push('/signup'); // Navigate to the sign-up page
  };

  return (
    <Background>
      <CenteredBox>
        <Typography variant="h1" component="h1" gutterBottom>
          Welcome to PantryBud
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            onClick={handleSignIn}
            sx={{ backgroundColor: 'white', color: 'black' }}
          >
            Sign In
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSignUp}
            sx={{ backgroundColor: 'white', color: 'black' }}
          >
            Sign Up
          </Button>
        </Box>
      </CenteredBox>
    </Background>
  );
}