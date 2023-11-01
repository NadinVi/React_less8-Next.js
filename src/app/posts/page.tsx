import { Card, CardContent, List, ListItem, ListItemText, Typography } from '@mui/material'
import JsonPlaseholderAPI from "@/api/JsonPlaseholderAPI/JsonPlaseholderAPI"
import Link from 'next/link'

const Posts = async () => {
  const posts = await JsonPlaseholderAPI.getPosts({ signal:new AbortController().signal, cache: 'no-cache' });
  //console.log({ posts })
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Posts
      </Typography>
      <List>
        {posts.map((post) => (
          <Card key={post.id} className="card">
            <CardContent>
              <ListItem key={post.id} component={Link} href={`/posts/${post.id}`}>
                <ListItemText primary={post.title} secondary={post.body} />
              </ListItem>
            </CardContent>
          </Card>
        ))}
      </List>
    </>
  )
}

export default Posts
