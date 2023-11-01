import { Grid, ImageList, ImageListItem, Typography } from '@mui/material'
import JsonPlaseholderAPI from "@/api/JsonPlaseholderAPI/JsonPlaseholderAPI"
import Image from 'next/image'

export default async function Home() {
  const photos = await JsonPlaseholderAPI.getPhotos({ signal: new AbortController().signal, cache: 'no-cache' })
  console.log({ photos })
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Photos
      </Typography>
      <Grid container spacing={2}>
      <ImageList gap={10} cols={5}>
            {photos.map((photo) => (
              <ImageListItem key={photo.id}>
                <Image src={photo.url} alt={photo.title} width={230} height={230} priority={true} />
              </ImageListItem>
            ))}
          </ImageList>
      </Grid>
    </>
  )
}
