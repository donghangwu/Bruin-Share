import React, { useState } from "react";

// MUI
import unlikeIcon from "@material-ui/icons/FavoriteBorder";
import likeIcon from "@material-ui/icons/Favorite";
import { Typography } from "@material-ui/core";

// Utils
import axios from "axios";
import Icon from "@material-ui/core/Icon";
import { useStyles } from "../../utils/useStyles";
import { getUserId } from "../../utils/UserAction";
import { isLoggedIn } from "../../utils/LoginActions";
import { useHistory } from "react-router-dom";

// Styles
import CustomButton from "../../styled/CustomButton";

const Like = ({ likes, postId }) => {
  const classes = useStyles();
  const [likeCount, setLikeCount] = useState(likes.length);
  const history = useHistory();
  const [liked, setLiked] = useState(() => {
    if (likes.length) {
      let likeIds = likes.map((like) => like._id);
      return likeIds.includes(getUserId());
    }
  });

  const likePost = async () => {
    if (!isLoggedIn()) {
      history.push("/login");
    }
    try {
      const body = {
        postid: postId,
      };
      await axios.put("/like", body);
      setLiked(true);
      setLikeCount(likeCount + 1);
    } catch (err) {
      console.error(err);
    }
  };

  const unlikePost = async () => {
    if (!isLoggedIn()) {
      history.pushState("/login");
    }
    try {
      const body = {
        postid: postId,
      };
      await axios.put("/unlike", body);
      setLiked(false);
      setLikeCount(likeCount - 1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {!liked ? (
        <CustomButton tip="like" onClick={likePost}>
          <Icon component={unlikeIcon} className={classes.iconbtn} />
        </CustomButton>
      ) : (
        <CustomButton tip="unlike" onClick={unlikePost}>
          <Icon component={likeIcon} className={classes.iconbtn}></Icon>
        </CustomButton>
      )}
      <Typography className={classes.likecommenttext}>{likeCount}</Typography>
    </>
  );
};

export default Like;
