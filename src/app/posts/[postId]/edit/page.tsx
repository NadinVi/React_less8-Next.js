'use client'
import { Box, Button, Card, CardContent, FormControl, InputLabel, OutlinedInput, Typography } from '@mui/material'
import JsonPlaseholderAPI, { Posts } from '@/api/JsonPlaseholderAPI/JsonPlaseholderAPI';
import { useEffect, useState } from 'react'
//import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation'

interface EditPostDelailsProps {
  params: {
    postId: string;
  }
}

const EditPost = ({ params: { postId } }: EditPostDelailsProps) => {
  const router = useRouter()

  const [post, setPost] = useState<Posts | null>(null);

  useEffect(() => {
    const controller = new AbortController()
    const fetchPost = async () => {
      try {
        const post = await JsonPlaseholderAPI.getPost({ signal: controller.signal, postId: Number(postId) })
        setPost(post)
      } catch (e) {
        console.log('isAborted', controller.signal.aborted);
        if (!controller.signal.aborted) {
          console.log('Error', e)
        }
      }
    }
    fetchPost()

    return () => {
      controller.abort()
    };
  }, [postId]);

  if (!post) {
    return null
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      await JsonPlaseholderAPI.updatePost({
        signal: new AbortController().signal,
        postId: Number(postId),
        updates: Object.fromEntries(formData),
      });
      router.push(`/posts/${postId}`, { scroll: true })
    } catch (error) {
      console.error('Error', error);
    }
  };
  
  return (
    <>
    <Typography variant="h5" gutterBottom>
      Edit Post
    </Typography>
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel htmlFor="title">Title</InputLabel>
              <OutlinedInput id="title" name="title" label="Title" fullWidth defaultValue={post.title} />
            </FormControl>
          </Box>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel htmlFor="postbody">Text Post</InputLabel>
              <OutlinedInput id="postbody" name="postbody" label="Text Post" fullWidth defaultValue={post.body} />
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

export default EditPost
