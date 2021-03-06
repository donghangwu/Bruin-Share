import React from "react";

// MUI
import { Grid, Typography, Avatar, Box } from "@material-ui/core";

// Utils
import moment from "moment";
import { useStyles } from "../utils/useStyles";

// Components
import Like from "./Post/Like";
import Comment from "./Post/Comment";
import { useHistory } from "react-router-dom";

// Styles
import CustomButton from "../styled/CustomButton";
import styled from "styled-components";
import "../App.css";

export const Title = styled(Typography)`
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const MainStoryBox = ({
  name,
  title,
  content,
  time,
  comments,
  likes,
  id,
  image,
  postById,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const handleClickShowDetails = () => {
    try {
      history.push(`/posts/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClickShowProfile = () => {
    try {
      console.log(postById);
      history.push(`/profile/${postById}`);
    } catch (err) {
      console.error(err);
    }
  };

  const truncateText = (prop) => {
    let truncated = prop;
    if (prop.length > 110) {
      truncated = prop.substr(0, 107) + "...";
    }
    return truncated;
  };

  return (
    <Box className={classes.post}>
      <Grid className={classes.title} container>
        <Grid item>
          <CustomButton
            className={classes.profile}
            onClick={handleClickShowProfile}
            tip={name}
          >
            <Avatar src={image} alt="postby image"></Avatar>
          </CustomButton>
        </Grid>
        <Grid item xs onClick={handleClickShowDetails}>
          <Title
            noWrap
            style={{ maxWidth: "20vw", textOverflow: "ellipsis" }}
            variant="h6"
          >
            {title}
          </Title>
          <Typography className={classes.time} variant="caption">
            {moment(time).fromNow()}
          </Typography>
        </Grid>
      </Grid>
      <Grid className={classes.contentContainer} container>
        <Grid item xs>
          <Typography className="postcontent">
            {truncateText(content)}
          </Typography>
        </Grid>
      </Grid>
      <Box className={classes.likeComment}>
        <Grid container>
          <Grid item xs container>
            <Like likes={likes} postId={id}></Like>
          </Grid>
          <Grid item xs container>
            <Comment
              comments={comments}
              content={content}
              postId={id}
              postImage={image}
              postBy={name}
              postTitle={title}
            ></Comment>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default MainStoryBox;
