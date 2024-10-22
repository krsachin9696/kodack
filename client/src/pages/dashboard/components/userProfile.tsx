import { Avatar, Box, IconButton, Typography } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LaunchIcon from '@mui/icons-material/Launch';
import CardWrapper from '../../../components/shared/card';

// Define interfaces
interface User {
  name: string;
  username: string;
  email: string;
}

interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string | null;
  portfolio?: string;
  leetcode?: string | null;
}

interface UserProfileProps {
  user: User | null;
  socialLinks: SocialLinks;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, socialLinks }) => (
  <CardWrapper>
    <Avatar
      src="https://assets.leetcode.com/users/avatars/avatar_1666705889.png"
      sx={{ width: 100, height: 100 }}
    />
    <Typography variant="h6">{user?.name}</Typography>
    <Typography variant="body1" sx={{ mb: 1 }}>
      @{user?.username}
    </Typography>
    <Typography variant="body2" sx={{ color: 'gray' }}>
      {user?.email}
    </Typography>
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
      {Object.entries(socialLinks).map(([key, value]) => (
        value ? (
          <IconButton
            key={key}
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: 'inherit' }}
          >
            {key === 'linkedin' && <LinkedInIcon sx={{ fontSize: '2rem' }} />}
            {key === 'github' && <GitHubIcon sx={{ fontSize: '2rem' }} />}
            {key === 'twitter' && <TwitterIcon sx={{ fontSize: '2rem' }} />}
            {key === 'leetcode' && <LaunchIcon sx={{ fontSize: '2rem' }} />}
          </IconButton>
        ) : null
      ))}
    </Box>
  </CardWrapper>
);

export default UserProfile;
