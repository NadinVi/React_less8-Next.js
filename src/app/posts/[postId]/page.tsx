import { Box, Button, Card, CardContent, List, ListItem, ListItemText, Typography } from '@mui/material'
import JsonPlaseholderAPI, { type Posts } from "@/api/JsonPlaseholderAPI/JsonPlaseholderAPI";
import Link from 'next/link';
import DeletePostForm from './DeletePostForm';

interface PostsDetailsProps {
    params: {
      postId: string;
    }
  }

const POSTS = [
    { name: 'Title', key: 'title' },
    { name: 'Text post', key: 'body' },
  ] satisfies { name: string; key: keyof Pick<Posts, 'title' | 'body'> }[];

const PostDetails = async ({ params: { postId } }: PostsDetailsProps) => {
    const post = await JsonPlaseholderAPI.getPost({ 
        postId: Number(postId) 
    });
    console.log({ post })
    return (
        <>
      <Typography variant="h5" gutterBottom>
        Post Details
      </Typography>
      {post && (
        <Card>
          <CardContent>
            <List>
              {POSTS.map((text) => (
                <ListItem key={text.key}>
                  <ListItemText primary={text.name} secondary={post[text.key]}></ListItemText>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
      <Box mt={2} display="flex" flexDirection="row">
        <Box mr={2}>
          <Button component={Link} variant="contained" color="primary" href={`${postId}/edit`}>
            Edit Post
          </Button>
        </Box>
        <DeletePostForm postId={postId}/>
      </Box>
    </>
    )
}

export default PostDetails
