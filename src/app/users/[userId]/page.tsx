import { Box, Button, Card, CardContent, List, ListItem, ListItemText, Typography } from '@mui/material'
import JsonPlaseholderAPI, {type User} from "@/api/JsonPlaseholderAPI/JsonPlaseholderAPI"
import Link from 'next/link'
import DeleteUserForm from './DeleteUserForm'

interface UserDetailsProps {
  params: {
    userId: string;
  }
}

const FIELDS = [
  { name: 'Name', key: 'name' },
  { name: 'Username', key: 'username' },
  { name: 'Email', key: 'email' },
  { name: 'Phone', key: 'phone' },
  { name: 'Website', key: 'website' },
] satisfies { name: string; key: keyof Pick<User, 'name' | 'username' | 'email' | 'phone' | 'website'> }[]


const UserDetails = async ({ params: { userId } }: UserDetailsProps) => {
  const user = await JsonPlaseholderAPI.getUser({
    userId: Number(userId)
  });

  
  return (
    <>
      <Typography variant="h5" gutterBottom>
        User Details
      </Typography>
      {user && (
        <Card>
          <CardContent>
            <List>
              {FIELDS.map((field) => (
                <ListItem key={field.key}>
                  <ListItemText primary={field.name} secondary={user[field.key]}></ListItemText>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
      <Box mt={2} display="flex" flexDirection="row">
        <Box mr={2}>
          <Button component={Link} variant="contained" color="primary" href={`${user.id}/edit`}>
            Edit User
          </Button>
        </Box>
        <DeleteUserForm userId={userId}/>
      </Box>
    </>
  );
};

export default UserDetails
