'use client'
import { Box, Button, Card, CardContent, FormControl, InputLabel, OutlinedInput, Typography } from '@mui/material'
import JsonPlaseholderAPI, { User } from '@/api/JsonPlaseholderAPI/JsonPlaseholderAPI';
import { useEffect, useState } from 'react'
//import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation'

interface EditUserDelailsProps {
  params: {
    userId: string;
  }
}

const EditUser = ({ params: { userId } }: EditUserDelailsProps) => {
  const router = useRouter()

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const controller = new AbortController()
    const fetchUser = async () => {
      try {
        const user = await JsonPlaseholderAPI.getUser({ signal: controller.signal, userId: Number(userId) })
        setUser(user)
      } catch (e) {
        console.log('isAborted', controller.signal.aborted);
        if (!controller.signal.aborted) {
          console.log('Error', e)
        }
      }
    }
    fetchUser()

    return () => {
      controller.abort()
    };
  }, [userId]);

  if (!user) {
    return null
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      await JsonPlaseholderAPI.updateUser({
        signal: new AbortController().signal,
        userId: Number(userId),
        updates: Object.fromEntries(formData),
      });
      //redirect(`/users`);
      router.push(`/users/${userId}`, { scroll: true })
    } catch (error) {
      console.error('Error', error);
    }
  };
  
  return (
    <>
    <Typography variant="h5" gutterBottom>
        Edit User
      </Typography>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor="name">Name</InputLabel>
                <OutlinedInput id="name" name="name" label="Name" fullWidth defaultValue={user.name} />
              </FormControl>
            </Box>
            <Box mb={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor="username">Username</InputLabel>
                <OutlinedInput id="username" name="username" label="username" fullWidth defaultValue={user.username} />
              </FormControl>
            </Box>
            <Box mb={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor="email">E-mail</InputLabel>
                <OutlinedInput id="email" name="email" label="E-mail" fullWidth defaultValue={user.email} />
              </FormControl>
            </Box>
            <Box mb={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor="phone">Phone</InputLabel>
                <OutlinedInput id="phone" name="phone" label="Phone" fullWidth defaultValue={user.phone} />
              </FormControl>
            </Box>
            <Box mb={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor="website">Website</InputLabel>
                <OutlinedInput id="website" name="website" label="website" fullWidth defaultValue={user.website} />
              </FormControl>
            </Box>
            <Button variant={'contained'} type="submit" color={'primary'}>
              Save
            </Button>  
          </form>
        </CardContent>
      </Card>
    </>
  )
}

export default EditUser
