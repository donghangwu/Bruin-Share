import React, { useEffect, useState } from "react";

// MUI
import {
  Avatar,
  Typography,
  Button,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

// Utils
import axios from "axios";
import moment from "moment";
import { isLoggedIn } from "../utils/LoginActions";
import { useParams, useHistory } from "react-router-dom";
import { getUserImage, getUserId } from "../utils/UserAction";

// Components
import Navbar from "../components/Navbar/Navbar";
import EditPost from "../components/Post/EditPost";

// Styles
import phone from "../components/Post/phone.png";
import laptop from "../components/Post/laptop.png";
import postBg from "../components/Post/postBg.png";
import CustomButton from "../styled/CustomButton";
import { StyledDeleteIcon } from "../styled/DeleteIcon";
import styled from "styled-components";

export const PostWrapper = styled.div`
  position: absolute;
  top: 15vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 45vw;
  position: relative;
`;

export const UserAvatar = styled(Avatar)`
  width: 8vw;
  height: 8vw;
  grid-row: 1 / 3;
  grid-column: 1 / 2;
`;

export const PostHeader = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 1fr 1fr;
  width: 45vw;
  margin-left: 15px;
  height: 25vh;
`;

export const ClickableTypography = styled(Typography)`
  font-size: 15px;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const SubtitleWrapper = styled.div`
  grid-row: 1 / 2;
  grid-column: 2;
  display: grid;
  grid-template-rows: 1fr 1fr;
  justify-content: start;
  align-items: center;
`;

export const TimeWrapper = styled(Typography)`
  justify-self: flex-end;
`;

export const PostBg = styled.img`
  width: 100vw;
  height: 80vh;
  bottom: 0;
  position: fixed;
  opacity: 0.8;
  -webkit-mask-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(0, 0, 0, 1)),
    to(rgba(0, 0, 0, 0))
  );
  z-index: -1;
`;

export const LaptopBg = styled.img`
  position: fixed;
  z-index: -1;
  width: 16vw;
  left: 3vw;
  bottom: 0;
`;

export const PhoneBg = styled.img`
  position: fixed;
  z-index: -1;
  width: 16vw;
  right: 1.5vw;
  bottom: -2vh;
`;

export const PostContent = styled(Typography)`
  align-self: flex-start;
  padding-left: 1vw;
`;

export const PostButton = styled(Button)`
  background: #fafafa;
  align-self: flex-end;
  border: 1px solid silver;
  text-transform: uppercase;
  border-radius: 5px;
  width: 120px;
  &:hover {
    cursor: pointer;
    transform: scale(1.02);
    background-color: white;
  }
`;
export const LikeButton = styled(PostButton)`
  margin-top: 10vh;
  margin-right: -0.5vw;
`;
export const CommentWrapper = styled.div`
  display: flex;
  margin-top: 25px;
  width: inherit;
  gap: 30px;
`;
export const CurAvatar = styled(Avatar)`
  width: 4vw;
  height: 4vw;
  align-self: flex-start;
`;
export const CommentField = styled(TextField)`
  width: 50vw;
  align-self: center;
`;
export const CommentsWrapper = styled.div`
  margin-top: 10vh;
`;

export const CommentBtnWrapper = styled.div`
  display: flex;
  align-self: flex-end;
  margin-top: 10px;
  gap: 40px;
`;

export const CommentCard = styled.div`
  width: 45vw;
  align-self: center;
  display: flex;
  gap: 30px;
  position: relative;
  margin-top: 40px;
`;

export const CommentDeleteButton = styled(CustomButton)`
  position: absolute;
  right: 1px;
`;

export const CommentTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EditWrapper = styled.div`
  position: absolute;
  display: flex;
  right: 1vw;
  top: 1vh;
`;
export const BoldTypography = styled(Typography)`
  font-size: 23px;
`;

export const CommentText = styled(Typography)``;

const Post = () => {
  const postid = useParams().postId;
  const [post, setPost] = useState({});
  const [curComment, setCurComment] = useState("");
  const [liked, setLiked] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/post/${postid}`);
        setPost(res.data);
        const likeIds = res.data.likes.map((like) => like._id);
        if (likeIds.includes(getUserId())) {
          setLiked(true);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchPost();
  }, []);

  useEffect(() => {
    if (post._id) {
      const likeIds = post.likes.map((like) => like._id);
      if (likeIds.includes(getUserId())) {
        setLiked(true);
      }
    }
  }, [post]);


  const handleOnChange = (e) => {
    setCurComment(e.target.value);
  };

  const handleClear = () => {
    setCurComment("");
  };
  const handleSend = async () => {
    const body = {
      postid,
      comment: curComment,
    };
    try {
      await axios.put("/comment", body);
      handleClear();
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const onLike = async () => {
    const body = {
      postid,
    };
    try {
      if (!liked) await axios.put("like", body);
      else await axios.put("unlike", body);
      setLiked(!liked);
    } catch (err) {
      console.error(err);
    }
    console.log(post);
  };

  const onName = (id) => {
    history.push(`/profile/${id}`);
  };

  const onDelete = async () => {
    try {
      const res = await axios.delete(`/deletepost/${postid}`);
      console.log(res.data);
      history.push("/home");
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const handleDelteComment = async (commentid) => {
    try {
      const body = {
        postid,
        commentid,
      };
      await axios.put("/deletecomment", body);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {post._id ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Navbar loggedIn={isLoggedIn()}></Navbar>
          <PostWrapper>
            <PostHeader>
              <Tooltip title={post.postBy.name} placement="top" arrow>
                <UserAvatar
                  src={post.postBy.image}
                  onClick={() => onName(post.postBy._id)}
                  style={{ cursor: "pointer" }}
                ></UserAvatar>
              </Tooltip>

              <SubtitleWrapper>
                <div>
                  <BoldTypography>{post.topic}</BoldTypography>
                  <ClickableTypography
                    variant="h5"
                    onClick={() => onName(post.postBy._id)}
                  >
                    @{post.postBy.name}
                  </ClickableTypography>
                </div>
                {post.postBy._id === getUserId() && (
                  <EditWrapper>
                    <EditPost
                      topic={post.topic}
                      content={post.content}
                      postid={postid}
                    />
                    <CustomButton tip="Delete your post" onClick={onDelete}>
                      <Delete />
                    </CustomButton>
                  </EditWrapper>
                )}
              </SubtitleWrapper>
              <TimeWrapper>{moment(post.createdAt).fromNow()}</TimeWrapper>
            </PostHeader>
            <PostContent className="postcontent">{post.content}</PostContent>
            {liked ? (
              <LikeButton onClick={onLike}>Unlike</LikeButton>
            ) : (
              <LikeButton onClick={onLike}>Like</LikeButton>
            )}
            <CommentWrapper>
              <CurAvatar src={getUserImage()}></CurAvatar>
              <CommentField
                placeholder="Write a comment..."
                onChange={handleOnChange}
                value={curComment}
              ></CommentField>
            </CommentWrapper>
            <CommentBtnWrapper>
              <PostButton onClick={handleClear}>Clear</PostButton>
              <PostButton onClick={handleSend}>Send</PostButton>
            </CommentBtnWrapper>
            <CommentsWrapper>
              {post.comments.map((c, i) => (
                <CommentCard key={i}>
                  <CurAvatar src={c.commentBy.image}></CurAvatar>
                  <CommentTextWrapper>
                    <ClickableTypography
                      variant="h6"
                      onClick={() => onName(c.commentBy._id)}
                    >
                      {c.commentBy.name}
                    </ClickableTypography>
                    <Typography>{c.text}</Typography>
                  </CommentTextWrapper>

                  {getUserId() === c.commentBy._id && (
                    <CommentDeleteButton
                      tip="Delete Comment"
                      onClick={() => handleDelteComment(c._id)}
                    >
                      <StyledDeleteIcon />
                    </CommentDeleteButton>
                  )}
                </CommentCard>
              ))}
            </CommentsWrapper>
          </PostWrapper>
          <PostBg src={postBg} alt="postBg"></PostBg>
          <LaptopBg src={laptop} alt="laptop"></LaptopBg>
          <PhoneBg src={phone} alt="phone"></PhoneBg>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Post;
