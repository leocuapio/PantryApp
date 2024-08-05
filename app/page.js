'use client';

import { useRouter } from 'next/navigation';
import { Button, Box, Typography } from '@mui/material';
import { styled, keyframes } from '@mui/system';

// Define keyframes for wave effect
const wave = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const WaveText = styled(Typography)(({ theme }) => ({
  display: 'inline-block',
  fontFamily: 'monospace',
  fontSize: '4rem',
  color: 'black', // Text color
  textAlign: 'center',
  animation: `${wave} 1.5s ease-in-out infinite`,
}));

const Background = styled('div')({
  position: 'fixed',
  width: '100%',
  height: '100%',
  background: 'url(/pine.jpg) no-repeat center fixed',
  backgroundSize: 'cover',
  zIndex: -1,
});

const CenteredBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center', // Center vertically
  height: '100vh',
  textAlign: 'center',
  color: 'black',
  padding: '0 2rem', // Add padding to avoid text touching edges
});

const ButtonContainer = styled(Box)({
  display: 'flex',
  gap: '1rem', // Space between buttons
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
        <WaveText variant="h1" component="h1" gutterBottom>
          Welcome to PantryBud
        </WaveText>
        <ButtonContainer>
          <Button
            variant="contained"
            onClick={handleSignIn}
            sx={{
              backgroundColor: 'white',
              color: 'black',
              '&:hover': {
                backgroundColor: '#2b2b2b',
                color: 'white'
              }
            }}
          >
            Sign In
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSignUp}
            sx={{
              backgroundColor: 'white',
              color: 'black',
              '&:hover': {
                backgroundColor: '#2b2b2b',
                color: 'white'
              }
            }}
          >
            Sign Up
          </Button>
        </ButtonContainer>
      </CenteredBox>
    </Background>
  );
}