'use client'
import React, { FormEventHandler, useCallback } from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import JsonPlaseholderAPI from '@/api/JsonPlaseholderAPI/JsonPlaseholderAPI';

interface DeletePostFormProps {
    postId: string;
}

const DeletePostForm = ({ postId }: DeletePostFormProps) => {
  const router = useRouter();

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    async (event) => {
      event.preventDefault();
      if (!confirm('Please confirm that you want to delete this post.')) {
        return;
      }
      await JsonPlaseholderAPI.deletePost({ postId: Number(postId) });

      router.replace('/posts', { scroll: true })
    },
    [router, postId],
  );

  return (
    <form
      onSubmit={handleSubmit}
    >
      <Button variant="contained" color="error" type="submit">
        Delete Post
      </Button>
    </form>
  );
};

export default DeletePostForm;
