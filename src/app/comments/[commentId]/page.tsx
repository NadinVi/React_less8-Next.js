import JsonPlaseholderAPI, { Comments } from "@/api/JsonPlaseholderAPI/JsonPlaseholderAPI"
import { Box, Button, Card, CardContent, List, ListItem, ListItemText, Typography } from "@mui/material"
import Link from "next/link"
import DeleteCommentForm from './DeleteCommentForm'

interface CommentDetailsProps {
    params: {
        commentId: string;
    }
  };
  
const COMMENTS = [
    { name: 'Title', key: 'name' },
    { name: 'Email', key: 'email' },
    { name: 'Сomment', key: 'body' },
  ] satisfies { name: string; key: keyof Pick<Comments, 'name' | 'email' | 'body'> }[]

  const CommentDetails = async ({ params: { commentId } }: CommentDetailsProps) => {
    const comment = await JsonPlaseholderAPI.getComment({
    commentId: Number(commentId)
    });

    
    return (
      <>
        <Typography variant="h5" gutterBottom>
          Comment Details
        </Typography>
        {comment && (
          <Card>
            <CardContent>
              <List>
                {COMMENTS.map((field) => (
                  <ListItem key={field.key}>
                    <ListItemText primary={field.name} secondary={comment[field.key]}></ListItemText>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        )}
        <Box mt={2} display="flex" flexDirection="row">
          <DeleteCommentForm commentId={commentId}/>
        </Box>
      </>
    );
  };
  
  export default CommentDetails
