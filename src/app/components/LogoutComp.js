import { Button} from '@mui/material'
import { useLogout } from '../hooks/useLogout'
export default function LogoutComp(){
    const { logout } = useLogout()
    const handleClick = ()=>{
        logout()
    }
    return (
        <Button
  onClick={handleClick}
  sx={{
    backgroundColor: "#FF0000", // Intense red background
    color: "#ffffff", // White text for high contrast
    padding: "4px 10px", // Reduced padding for a smaller size
    borderRadius: "4px", // Slightly rounded corners
    fontWeight: "bold",
    fontSize: "0.8rem", // Adjusted font size for compact appearance
    textTransform: "none", // Prevent uppercase text
    boxShadow: "none", // Removed glow/shadow effect
    transition: "background-color 0.3s ease, transform 0.2s ease", // Smooth transitions
    "&:hover": {
      backgroundColor: "#B20000", // Darker red on hover
    },
    "&:active": {
      transform: "scale(0.95)", // Slight press-down effect
    },
    "&:focus": {
      outline: "2px solid #FF0000", // Intense red outline for focus
    },
  }}
>
  Logout
</Button>

    )
}