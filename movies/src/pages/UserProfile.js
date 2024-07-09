import React, { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Typography, Box, CircularProgress, Alert } from '@mui/material';
import { getUserBooking } from '../api-helpers/api-helpers';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUserBooking()
      .then((res) => {
        const { name, email, bookings } = res;
        setUserInfo({ name, email });
        setBookings(bookings || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch user data');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box width="100%" display="flex" flexDirection="column" alignItems="center" p={3}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="30%"
        mb={4}
        boxShadow={3}
        p={3}
        borderRadius="8px"
      >
        <AccountCircleIcon sx={{ fontSize: '10rem', color: '#3f51b5' }} />
        <Typography variant="h6" mt={2}>
          {userInfo.name || 'Unknown'}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {userInfo.email || 'Unknown'}
        </Typography>
      </Box>
      <Box width="70%">
        <Typography variant="h4" component="h1" mb={3}>
          User Bookings
        </Typography>
        {bookings.length > 0 ? (
          <Box component="ul" p={0} style={{ listStyle: 'none' }}>
            {bookings.map((booking) => (
              <Box
                component="li"
                key={booking._id}
                mb={2}
                p={2}
                border="1px solid #ccc"
                borderRadius="8px"
                boxShadow={1}
              >
                <Typography variant="h6">
                  Movie: {booking.movie.title}
                </Typography>
                <Typography variant="body1">
                  Date: {new Date(booking.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body1">
                  Seat Number: {booking.seatNumber}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Typography variant="body1" color="textSecondary">
            No bookings found.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default UserProfile;
