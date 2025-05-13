'use client';

import { Box, TextField, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useBloomsContext } from "../hooks/useBloomsContext";
import { useAuthContext } from "../hooks/useAuthContext";
export default function BloomForm() {
  const { dispatch } = useBloomsContext();
  const { user} = useAuthContext()
  const [text, setText] = useState('');
  const [error, setError] = useState<boolean | string>(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.value.length <= 300) {
      setText(e.target.value);
      setError(false);
    } else {
      setError(true);
    }
  };
  const handleSubmit = async () => {
    if(!user){
      setError("you must be logged in")
      return
    }
    if (text.trim() === '') {
      alert('Please enter your thoughts before submitting.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
            'Authorization':`Bearer ${user.token}`
        },
        body: JSON.stringify({ username: user.username, text }),
      });

      if (response.ok) {
        const data = await response.json();
       // alert('Your thoughts have been shared successfully!');
        setText('');
        dispatch({ type: 'CREATE_BLOOM', payload: data });
        dispatch({ type: 'CREATE_PBLOOM', payload: data })
      } else {
        alert('Failed to share your thoughts. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting your thoughts:', error);
      alert('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        p: 3,
        maxWidth: 400,
        margin: '0 auto',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h5" textAlign="center" color="white">
        How are you feeling?!
      </Typography>
      {typeof error === 'string' && (
        <Typography color="error" textAlign="center">
          {error}
        </Typography>
      )}
      <TextField
        sx={{
          '& .MuiInputBase-input': {
            color: 'white',
            paddingTop: '20px',
          },
        }}
        multiline
        rows={4}
        fullWidth
        placeholder="Write your thoughts here (max 300 characters)"
        value={text}
        onChange={handleTextChange}
        error={!!error && typeof error !== 'string'} 
        helperText={
          text
            ? error
              ? 'Character limit exceeded (max 300)'
              : `${300 - text.length} characters remaining`
            : null
        }
        FormHelperTextProps={{
          sx: {
            color: 'white',
          },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? 'Submitting...' : 'Bloom'}
      </Button>
    </Box>
  );
}
