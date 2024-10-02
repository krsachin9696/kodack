import { Button, TextField, Typography } from '@mui/material'
import { Google } from '@mui/icons-material'
import { defaultStyles } from '../../constants/defaultStyles'

const Signup = () => {
  return (
    <div className="min-h-screen flex px-[10%]">
      {/* Left Section */}
      <div className="hidden md:flex w-1/2 text-white flex-col justify-center p-10">
        <div className="ml-10">
          <h1 className="text-4xl mb-10 text-blue-400">KODACK</h1>
          <div className="mb-8">
            <h3 className="text-xl flex items-center">
              🔧 Access master list of essential LeetCode problems
            </h3>
          </div>
          <div className="mb-8">
            <h3 className="text-xl flex items-center">
              🛠 Create and customize personal problem lists.
            </h3>
          </div>
          <div className="mb-8">
            <h3 className="text-xl flex items-center">
              👍 Track progress on problem-solving.
            </h3>
          </div>
          <div>
            <h3 className="text-xl flex items-center">
              ✨ Share and collaborate on curated lists.
            </h3>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex w-full md:w-1/2 justify-center items-center">
        <div
          className="p-10 rounded-lg w-11/12 max-w-lg"
          style={{ border: '1px solid rgba(51, 60, 77, 0.6)' }}
        >
          <Typography variant="h5" component="h1" className="text-white mb-4">
            Sign up
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            sx={defaultStyles.inputStyles}
          />
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            sx={defaultStyles.inputStyles}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            sx={defaultStyles.inputStyles}
          />
          <Button
            fullWidth
            variant="contained"
            size="small"
            color="primary"
            className="mt-4 mb-4"
            sx={{ padding: 2 }}
          >
            Sign up
          </Button>
          <div className="mt-4 text-center text-white">or</div>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Google />}
            sx={{ padding: 2 }}
            className="mt-4 text-white border-white"
          >
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Signup
