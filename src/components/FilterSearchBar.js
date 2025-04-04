import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useTransition } from 'react';
import { setFilteredPosts } from '../redux/actions/postActions';
import { TextField, MenuItem, Box } from '@mui/material';

const FilterSearchBar = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts?.posts || []);
  const users = useSelector((state) => state.users || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleFilter = (term, userId) => {
    startTransition(() => {
      let filtered = posts;
      if (userId) filtered = filtered.filter((p) => p.userId === parseInt(userId));
      if (term) filtered = filtered.filter((p) => p.title.includes(term) || p.userId.toString().includes(term));
      dispatch(setFilteredPosts(filtered));
    });
  };

  return (
    <Box className="mb-3 d-flex gap-3">
      <TextField
        label="Search by Title/User ID"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          handleFilter(e.target.value, selectedUser);
        }}
      />
      <TextField
        select
        label="Filter by User"
        value={selectedUser}
        onChange={(e) => {
          setSelectedUser(e.target.value);
          handleFilter(searchTerm, e.target.value);
        }}
        style={{ width: 200 }}
      >
        <MenuItem value="">All Users</MenuItem>
        {users.map((user) => (
          <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default FilterSearchBar;
