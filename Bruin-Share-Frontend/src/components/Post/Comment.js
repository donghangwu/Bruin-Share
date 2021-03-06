import React, { useState } from "react";

// MUI
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Card,
  TextField,
  Typography,
  Avatar,
  Tooltip,
} from "@material-ui/core/";
import CloseIcon from "@material-ui/icons/Close";
import Icon from "@material-ui/core/Icon";
import commentIcon from "@material-ui/icons/Message";
import SendIcon from "@material-ui/icons/Send";

// Utils
import axios from "axios";
import { useStyles } from "../../utils/useStyles";
import { isLoggedIn } from "../../utils/LoginActions";
import { getUserId } from "../../utils/UserAction";
import { useHistory } from "react-router-dom";

// Components
import CustomButton from "../../styled/CustomButton";
import SeparateLine from "../../styled/SeparateLine";
import { StyledDeleteIcon } from "../../styled/DeleteIcon";

const Comment = ({
  comments,
  content,
  postId,
  postImage,
  postBy,
  postTitle,
}) => {
  const [open, setOpen] = useState(false);
  const [commenttext, setCommenttext] = useState("");
  const history = useHistory();
  const classes = useStyles();
  let displayComments = [...comments];
  if (displayComments.length > 5) {
    displayComments = displayComments.slice(-5);
  }
  const handleOpen = () => {
    if (isLoggedIn()) {
      setOpen(true);
    } else {
      history.push("/login");
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOnChange = (e) => {
    setCommenttext(e.target.value);
    console.log(commenttext);
  };

  const handleSubmit = async () => {
    const body = {
      postid: postId,
      comment: commenttext,
    };
    try {
      await axios.put("/comment", body);
      handleClose();
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelteComment = async (commentid) => {
    try {
      const body = {
        postid: postId,
        commentid,
      };
      await axios.put("/deletecomment", body);
      handleClose();
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <CustomButton tip="comment" onClick={handleOpen}>
        <Icon component={commentIcon}></Icon>
      </CustomButton>
      <Typography className={classes.likecommenttext}>
        {comments.length}
      </Typography>

      <Dialog open={open} onClose={handleClose}>
        <div style={{ display: "flex", width: "600px" }}>
          <DialogTitle>Replying to Post...</DialogTitle>
          <CustomButton
            tip="close"
            className={classes.closebtn}
            onClick={handleClose}
          >
            <CloseIcon></CloseIcon>
          </CustomButton>
        </div>
        <DialogContent>
          <Card className={classes.commentPostCard}>
            <Avatar
              src={postImage}
              className={classes.commentPostImage}
            ></Avatar>
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexDirection: "column",
                marginTop: "-15px",
              }}
            >
              <Typography className={classes.commentPostPostTitle}>
                {postTitle}
              </Typography>
              <Typography className={classes.commentPostPostBy}>
                @{postBy}:
              </Typography>
            </div>
            <Typography className={classes.commentPostContent}>
              {content}
            </Typography>
          </Card>
        </DialogContent>

        <DialogContent>
          {displayComments.map((c, i) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "20px",
              }}
              key={i}
            >
              <Tooltip title={c.commentBy.name} placement="top" arrow>
                <img
                  src={c.commentBy.image}
                  className={classes.commentIcon}
                  alt="commentIcon"
                />
              </Tooltip>
              <Card key={i} className={classes.commentCard} variant="outlined">
                {c.text}
              </Card>
              {getUserId() === c.commentBy._id && (
                <CustomButton
                  tip="Delete Comment"
                  onClick={() => handleDelteComment(c._id)}
                >
                  <StyledDeleteIcon></StyledDeleteIcon>
                </CustomButton>
              )}
            </div>
          ))}

          <SeparateLine />
          <div style={{ display: "flex" }}>
            <Avatar
              className={classes.userImage}
              src={window.localStorage.getItem("UserImage")}
              alt="user image"
            ></Avatar>

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="New Comment"
              fullWidth
              inputProps={{
                autocomplete: "new-password",
                form: {
                  autocomplete: "off",
                },
              }}
              onChange={(e) => handleOnChange(e)}
            />
            <CustomButton
              tip="send"
              className={classes.sendbtn}
              onClick={handleSubmit}
            >
              <SendIcon />
            </CustomButton>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Comment;
