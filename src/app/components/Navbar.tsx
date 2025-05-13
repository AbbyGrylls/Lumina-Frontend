import Image from 'next/image';
import Link from 'next/link';
import { Box, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { useTheme, useMediaQuery } from '@mui/material';
/* import LogoutComp from './LogoutComp' */


interface NavbarProps {
  showIconsOnly: boolean;
}

export default function Navbar({ showIconsOnly }: NavbarProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Check if screen is small
  
  return (
    <Box
      className="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        justifyContent: 'space-between',
        alignItems: 'justify',
        padding: {md:'120px 70px'},
        paddingTop:{xs:"100px",sm:"100px"},
        paddingLeft:{xs:"-1px",sm:"30px"},
        position: 'relative',
        backgroundColor: 'black', // Ensure background is black
      }}
    >
      {/* Logo with adjusted size on small screens */}
      <Box
        sx={{
          width: isSmallScreen ? '60px' : '100px', // Adjust size based on screen size
          height: isSmallScreen ? '60px' : '100px', // Adjust size based on screen size
          overflow: 'hidden', // Ensure the image does not overflow
          marginLeft:{xs:"-10px",sm:"-30px",md:"5px"}
        }}
      >
        <Image
          src="/logo.png"
          alt="Logo"
          //layout="responsive"
          width={100} // Full width for larger screens
          height={100} // Full height for larger screens
        />
      </Box>

      <Link href="/">
        <span style={{ textDecoration: 'none', fontSize: '20px' }}>
          {showIconsOnly ? (
            <IconButton sx={{ color: 'white' }}>
              <HomeIcon  />
            </IconButton>
          ) : (
            <div style={{display:"flex",gap:"10px"}}>
            <HomeIcon sx={{marginTop:"2px"}}/>
              Home
            </div>
          )}
        </span>
      </Link>
      <Link href="/profile">
        <span style={{ textDecoration: 'none', fontSize: '20px' }}>
          {showIconsOnly ? (
            <IconButton sx={{ color: 'white' }}>
              <PersonIcon />
            </IconButton>
          ) : (
            <div style={{display:"flex",gap:"10px"}}>
            <PersonIcon sx={{marginTop:"2px"}}/>
              Profile
            </div>
          )}
        </span>
      </Link>
      <Link href="/search">
        <span style={{ textDecoration: 'none', fontSize: '20px' }}>
          {showIconsOnly ? (
            <IconButton sx={{ color: 'white' }}>
              <SearchIcon />
            </IconButton>
          ) : (
            <div style={{display:"flex",gap:"10px",}}>
            <SearchIcon sx={{marginTop:"2px"}}/>
              Search
            </div>
          )}
        </span>
      </Link>
      <Link href="/chatbox">
        <span style={{ textDecoration: 'none', fontSize: '20px' }}>
          {showIconsOnly ? (
            <IconButton sx={{ color: 'white' }}>
              <ChatIcon />
            </IconButton>
          ) : (
            <div style={{display:"flex",gap:"10px",}}>
            <ChatIcon sx={{marginTop:"2px"}}/>
              ChatBox
            </div>
          )}
        </span>
      </Link>
      <Link href="/notifications">
        <span style={{ textDecoration: 'none', fontSize: '20px' }}>
          {showIconsOnly ? (
            <IconButton sx={{ color: 'white' }}>
              <NotificationsIcon />
            </IconButton>
          ) : (
            <div style={{display:"flex",gap:"10px",}}>
            <NotificationsIcon sx={{marginTop:"2px"}}/>
              Notifications
            </div>
          )}
        </span>
      </Link>
      <Link href="/settings">
        <span style={{ textDecoration: 'none', fontSize: '20px' }}>
          {showIconsOnly ? (
            <IconButton sx={{ color: 'white' }}>
              <SettingsIcon />
            </IconButton>
          ) : (
            <div style={{display:"flex",gap:"10px",}}>
            <SettingsIcon sx={{marginTop:"2px"}}/>
              Settings
            </div>
          )}
        </span>
      </Link>
    </Box>
  );
}