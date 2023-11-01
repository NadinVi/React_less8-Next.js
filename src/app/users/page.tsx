import { List, ListItem, ListItemText, Typography } from '@mui/material'
import JsonPlaseholderAPI from "@/api/JsonPlaseholderAPI/JsonPlaseholderAPI"
import Link from 'next/link';

const Users = async () => {
  const users = await JsonPlaseholderAPI.getUsers({ signal: new AbortController().signal, cache: 'no-cache'});
  console.log({ users })
  return (
    <>
    <Typography variant="h5" gutterBottom>
      Users
    </Typography>
    <List>
      {users.map((user) => (
        <ListItem key={user.id} component={Link} href={`/users/${user.id}`}>
          <ListItemText primary={user.name} secondary={user.email} />
        </ListItem>
      ))}
    </List>
  </>
  )
}

export default Users
