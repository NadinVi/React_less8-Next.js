'use client'
import React, { FormEventHandler, useCallback } from 'react'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import JsonPlaseholderAPI from '@/api/JsonPlaseholderAPI/JsonPlaseholderAPI'

interface DeleteCommentFormProps {
  commentId: string;
}

const DeleteUserForm = ({ commentId }: DeleteCommentFormProps) => {
  const router = useRouter();

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    async (event) => {
      event.preventDefault();
      if (!confirm('Please confirm that you want to delete this comment.')) {
        return;
      }
      await JsonPlaseholderAPI.deleteUser({ commentId: Number(commentId) });

      router.replace('/comments', { scroll: true })
    },
    [router, commentId],
  );

  return (
    <form
      onSubmit={handleSubmit}
    >
      <Button variant="contained" color="error" type="submit">
        Delete Comment
      </Button>
    </form>
  );
};

export default DeleteUserForm;
