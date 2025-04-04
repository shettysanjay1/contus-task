import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchUsers } from './redux/actions/postActions';
import {
  Box, Typography, TextField, MenuItem,
  Card, CardContent, Grid, Paper
} from '@mui/material';

const Homepg = () => {
  const dispatch = useDispatch();
  const { posts, users, selectedUser } = useSelector(state => state.postsData);
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
      setLimit(prev => prev + 10);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filtered = posts
    .filter(post => {
      if (search) {
        const titleMatch = post.title.toLowerCase().includes(search.toLowerCase());
        const userIdMatch = post.userId.toString() === search;
        return titleMatch || userIdMatch;
      }
      return true;
    })
    .slice(0, limit);

  const selectedUserData = users.find(user => user.id === selectedUser);

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', p: 4 }}>
      <Typography
        variant="h3"
        sx={{
          mb: 4,
          fontWeight: 700,
          background: 'linear-gradient(to right, #2196f3, #21cbf3)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Contus-Tech Task
      </Typography>

     
      <Box display="flex" gap={2} mb={4} flexWrap="wrap">
        <TextField
          label="Search by title or userId"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ bgcolor: 'white', borderRadius: 1 }}
        />
        <TextField
          select
          label="Filter by User"
          value={selectedUser || ''}
          onChange={(e) =>
            dispatch({
              type: 'SET_SELECTED_USER',
              payload: e.target.value ? Number(e.target.value) : '',
            })
          }
          sx={{ minWidth: 250, bgcolor: 'white', borderRadius: 1 }}
        >
          <MenuItem value="">All Users</MenuItem>
          {users.map(user => (
            <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
          ))}
        </TextField>
      </Box>

     
      {selectedUserData && (
        <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          bgcolor: 'white',
          borderLeft: '5px solid #2196f3',
          display: 'inline-block',
          maxWidth: '100%',
          minWidth: '300px',
        }}
      >
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2196f3', mb: 1 }}>
            {selectedUserData.name}
          </Typography>
          <Typography sx={{ color: '#424242' }}>Email: {selectedUserData.email}</Typography>
          <Typography sx={{ color: '#424242' }}>Phone: {selectedUserData.phone}</Typography>
          <Typography sx={{ color: '#424242' }}>Website: {selectedUserData.website}</Typography>
          <Typography sx={{ color: '#424242' }}>
            Address: {selectedUserData.address.street}, {selectedUserData.address.suite}, {selectedUserData.address.city} - {selectedUserData.address.zipcode}
          </Typography>
          <Typography sx={{ color: '#424242' }}>
            Company: {selectedUserData.company.name}
          </Typography>
        </Paper>
      )}

      
      {!selectedUser && (
        <Grid container spacing={3}>
          {filtered.map(post => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card sx={{ bgcolor: 'white', borderLeft: '5px solid #90caf9', height: '100%' }}>
                <CardContent>
                  <Typography variant="subtitle2" sx={{ color: '#2196f3', fontWeight: 'bold' }}>
                    User ID: {post.userId}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#424242', mt: 1 }}>
                    {post.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Homepg;
