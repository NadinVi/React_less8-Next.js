import { Card, CardContent, List, ListItem, ListItemText, Typography } from '@mui/material'
import JsonPlaseholderAPI from "@/api/JsonPlaseholderAPI/JsonPlaseholderAPI"
import Link from 'next/link'

const Comments = async () => {
  const comments = await JsonPlaseholderAPI.getComments({ signal: new AbortController().signal, cache: 'no-cache'});
  //console.log({ comments })

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Comments
      </Typography>
      <List>
        {comments.map((comment) => (
          <Card key={comment.id} className="card">
            <CardContent>
              <ListItem component={Link} href={`/comments/${comment.id}`}>
                <ListItemText primary={comment.name} secondary={comment.body} />
              </ListItem>
            </CardContent>
          </Card>
        ))}
      </List>
    </>
  )
}

export default Comments
