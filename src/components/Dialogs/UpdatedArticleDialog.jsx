import { Dialog, DialogTitle, Typography } from '@mui/material'
import React from 'react'

function UpdatedArticleDialog() {
  return (
    <Dialog>
        <DialogTitle>Update Success!</DialogTitle>
        <Typography>Congrats, you've updated this article. Click one of the buttons below to return home or keep working on this article.</Typography>
    </Dialog>
  )
}

export default UpdatedArticleDialog