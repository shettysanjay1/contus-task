import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Grid, Card, CardContent, TextField, Typography } from '@mui/material';

const PostCard = () => {
  const { posts = [], selectedUser } = useSelector(state => state);
  const [search, setSearch] = useState('');

  const filtered = posts.filter(post =>
    (!selectedUser || post.userId === selectedUser) &&
    (post.title.toLowerCase().includes(search.toLowerCase()) || post.userId.toString().includes(search))
  );

  return (
    <Box>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by title or userId"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />
      <Grid container spacing={2}>
        {filtered.map(post => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1">User ID: {post.userId}</Typography>
                <Typography variant="body1">{post.title}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PostCard;
