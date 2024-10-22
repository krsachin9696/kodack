import { Box, TextField, Typography } from "@mui/material"

const CreateList: React.FC = () => {
  return (
    <Box>
      <Typography>Create List</Typography>
      <TextField>name</TextField>
      <Box>Select Tags</Box>
    </Box>
  )
}

export default CreateList;