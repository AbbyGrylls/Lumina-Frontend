'use client';
import { useState, useEffect } from "react";
import { useBloomsContext } from "../../hooks/useBloomsContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Typography, Box, Button, Menu, MenuItem, TextField } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton, Tooltip } from '@mui/material';
import { useLikes } from "@/app/context/LikesContext";
export default function PBloomList() {
  const { redisLikes,likeCounts,likesDispatch } = useLikes();
  const { Pblooms, dispatch } = useBloomsContext();
  const { user } = useAuthContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBloom, setSelectedBloom] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState("");
  const handleMoreClick = (event, bloom) => {
    //console.log("More clicked for bloom:", bloom);
    setAnchorEl(event.currentTarget);
    setSelectedBloom(bloom);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedBloom(null);
    setEditMode(false);
    setEditText("");
  };

  /* const handleEditInit = () => {
    console.log("Edit mode activated for:", selectedBloom);
    setEditText(selectedBloom.text);
    setEditMode(true);
    handleClose();
  };

  const handleEditSubmit = async () => {
    console.log("Edit submit triggered");
    if (selectedBloom && user) {
      console.log("Editing bloom:", selectedBloom);
      console.log("Updated text:", editText);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blooms/${selectedBloom._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ text: editText }),
        });
        const updatedBloom = await res.json();
        console.log("API response:", updatedBloom);
        if (res.ok) {
          dispatch({ type: "UPDATE_PBLOOM", payload: updatedBloom });
          dispatch({ type: "UPDATE_BLOOM", payload: updatedBloom });
          handleClose();
        } else {
          console.error("Failed to update bloom");
        }
      } catch (error) {
        console.error("Edit error:", error);
      }
    }
  }; */

  const handleDelete = async () => {
    if (selectedBloom && user) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blooms/${selectedBloom._id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (res.ok) {
          dispatch({ type: "DELETE_PBLOOM", payload: selectedBloom._id });
          dispatch({ type: "DELETE_BLOOM", payload: selectedBloom._id });
          handleClose();
        } else {
          console.error("Failed to delete bloom");
        }
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };
  const liked = async (bloom) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blooms/like/${bloom._id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        /* 
        console.log(data.likeCount); // Correct
        console.log(Pblooms.find(p => p._id === bloom._id)?.likesCount); */
        likesDispatch({ type: "LIKED", payload: data })
        console.log(redisLikes)
      }
      else {
        console.error("Failed to like/unlike bloom", data.error);
      }
    } catch (error) {
      console.error("like error:", error);
    }
  }

  useEffect(() => {
    const getBlooms = async () => {
      
      console.log(redisLikes)
      if (user && user.username) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blooms/${encodeURIComponent(user.username)}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          });
          const json = await res.json();
          if (res.ok) {
            dispatch({ type: "SET_PBLOOMS", payload: json.Pblooms || json });
          } else {
            console.error("Failed to fetch blooms");
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      }
    };

    getBlooms();
  }, [user, dispatch]);

  return (
    <Box>
      {Pblooms && Pblooms.length > 0 ? (
        Pblooms.map((bloom) => (
          <Box key={bloom._id} sx={{ marginBottom: "15px", backgroundColor: "#333", padding: "20px", borderRadius: "8px" }}>
            <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <Box
                sx={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#666",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "10px",
                }}
              >
                <span style={{ color: "#fff", fontWeight: "bold" }}>P</span>
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: "bold" }}>
                  {user.name}
                </Typography>
                <Typography variant="subtitle2" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
                  @{user.username}
                </Typography>
              </Box>
              <Button onClick={(event) => handleMoreClick(event, bloom)}>
                <MoreVert sx={{ color: "#fff" }} />
              </Button>
            </Box>
            <Typography sx={{ color: "#fff" }}>{bloom.text}</Typography>
            <Box>
              <Tooltip title={
                redisLikes?.likedBloomIds?.includes(bloom._id) 
                  ? "Unlike"
                  : bloom.likesCount
                    ? "Like"
                    : "Be the first to like"
              }>
                <IconButton onClick={() => liked(bloom)}>
                  {redisLikes?.likedBloomIds?.includes(bloom._id) || redisLikes.liked? (
                    <FavoriteIcon style={{ color: 'red' }} />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
                <Typography sx={{ color: "#fff" }}>
                  {/* {redisLikes.likeCount > 0 ? redisLikes.likeCount : "No likes yet"} */}
                  {likeCounts?.[bloom._id] ?? 0}
                </Typography>
              </Tooltip>
            </Box>
          </Box>
        ))
      ) : (
        <Typography>Loading blooms...</Typography>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {/* <MenuItem onClick={handleEditInit}>Edit</MenuItem> */}
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
      {/*  <Box sx={{}}>
      {editMode && (
        <Box sx={{ marginLeft: "110px", padding: "20px", backgroundColor: "444", borderRadius: "8px", zIndex:5, width:"100px"}}>
          <TextField
            fullWidth
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            sx={{ marginBottom: "10px" }}
            multiline
          />
          <Button onClick={handleEditSubmit} variant="contained" sx={{ marginRight: "10px" }}>
            Save
          </Button>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
        </Box>
      )}
      </Box> */}
    </Box>
  );
}
