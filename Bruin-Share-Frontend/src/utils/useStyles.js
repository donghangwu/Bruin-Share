import { makeStyles } from "@material-ui/core/styles";

const loginbg = "cover_bg_test2.png";
const signupbg = "cover_bg_test3.png";

export const useStyles = makeStyles((theme) => ({
  /**<--------------Main Story Box ----------------------------------------------------> */
  post: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px 20px",
    borderRadius: "5px",
    height: "30vh",
    border: "1px solid silver",
    position: "relative",
    overflow: "hidden",
  },
  title: {
    display: "flex",
    flexDirection: "row",
    margin: theme.spacing(1, 0, 1),
  },
  profile: {
    padding: theme.spacing(0, 1, 0),
  },
  contentContainer: {
    height: "14vh",
    overflow: "hidden",
    marginBottom: "20px",
  },
  content: {
    padding: "15px 0 0px 10px",
  },
  time: {
    fontSize: "12px",
    color: "silver",
  },
  likeComment: {
    alignSelf: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    display: "flex",
    width: "100%",
    gap: "20px",
    height: "3.5vh",
    position: "absolute",
    bottom: "3vh",
  },
  likecommenttext: {
    marginTop: "12px",
  },

  /**<------------------Home--------------------------------------> */
  homebody: {
    display: "grid",
    margin: "0 0 0 10vw",
    gridTemplateColumns: "2fr 1fr",
    gridColumnGap: "10vw",
  },
  homeposts: {
    position: "relative",
    top: "10vh",
    display: "grid",
    width: "41vw",
  },
  homesideBar: {
    position: "relative",
  },

  /**<------------------EditPost--------------------------------------> */
  dialogTitle: {
    width: "500px",
    display: "flex",
  },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
  },

  /**<------------------Comment--------------------------------------> */
  closebtn: {
    position: "absolute",
    right: "2px",
    top: "8px",
  },
  sendbtn: {
    marginTop: "20px",
  },
  commentPostCard: {
    minHeight: "100px",
    padding: "25px",
    display: "flex",
    gap: "15px",
    fontFamily: "Roboto",
    fontSize: "18px",
    alignItems: "center",
    marginTop: "10px",
    textOverflow: "ellipsis",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    lineBreak: "auto",
  },
  commentPostPostBy: {
    fontSize: "15px",
  },
  commentPostPostTitle: {
    fontSize: "15px",
    fontWeight: "600",
  },
  commentPostContent: {
    // fontSize: "1px",
  },
  commentPostImage: {
    width: "60px",
    height: "60px",
  },
  commentCard: {
    minHeight: "50px",
    fontFamily: "Roboto",
    display: "flex",
    alignItems: "center",
    margin: "10px 10px 10px 15px",
    width: "400px",
    paddingLeft: "10px",
    overflow: "hidden",
  },
  passwordHide: {
    height: "50px",
    paddingRight: "20px",
  },
  commentIcon: {
    width: "50px",
    height: "50px",
  },
  userImage: {
    margin: "10px 10px 0px 2px",
  },

  /**<------------------Signup--------------------------------------> */
  passwordHide: {
    height: "50px",
    paddingRight: "20px",
  },
  signupContainer: {
    display: "flex",
    height: "100vh",
  },
  signupTitle: {
    fontFamily: "Poppins",
    fontWeight: "800",
    fontSize: "30px",
    textAlign: "center",
  },
  signupRight: {
    flex: "4 0 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: `url(${signupbg})`,
  },
  signupLeft: {
    flex: "1 0 auto",
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  },
  signupImg: {
    width: "35vw",
    maxWidth: "800px",
  },
  signupPage: {
    padding: "100px 50px",
    borderRadius: "30px",
    width: "500px",
    flex: "1 0 auto",
  },

  formPaper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  signupForm: {
    width: "100%",
    marginTop: theme.spacing(2),
  },

  /**<------------------Login--------------------------------------> */
  loginContainer: {
    display: "flex",
    height: "100vh",
  },
  loginTitle: {
    fontFamily: "Poppins",
    fontWeight: "800",
    fontSize: "30px",
    textAlign: "center",
  },
  loginLeft: {
    justifyContent: "center",
    background: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), url(${loginbg}) fixed center center no-repeat`,
    backgroundSize: "cover",
    flex: "2 0 auto",
    display: "flex",
    alignItems: "center",
  },
  loginRight: {
    flex: "1 0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  coverImg: {
    width: "35vw",
    maxWidth: "800px",
  },
  page: {
    padding: "100px 50px",
    borderRadius: "30px",
    width: "500px",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "30px 10px",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(2),
  },
  textField: {
    margin: theme.spacing(4, 0, 2),
  },
  submit: {
    margin: theme.spacing(6, 0, 2),
    width: "60%",
  },

  /** <------------------ Send Post ------------------------------> */
  dialogDescription: {
    paddingLeft: "20px",
  },
  sendPostTopic: {
    marginBottom: "50px",
  },
  sendPostBox: {
    height: "200px",
  },

  /**<-------------------Notifications -----------------------------> */
  notificationButton: {
    color: "#666",
    cursor: "pointer",
  },
  selectButton: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  selectComments: {
    flex: "50%",
  },
  selectLikes: {
    flex: "50%",
  },
  commentButton: {
    marginRight: "1vh",
  },
  notificationlikeButton: {
    marginRight: "2vh",
  },
  notificationDropDown: {
    width: "350px",
  },
  messageList: {
    maxHeight: 100,
    overflow: "auto",
    position: "relative",
    flexDirection: "column",
    margin: theme.spacing(1, 0, 0),
  },
  listItem: {
    color: "#666",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemText: {
    cursor: "pointer",
  },
  deleteButton: {},

  /**<------------------------- Profile ------------------------------> */
  profilebody: {
    display: "grid",
    margin: "0 0 0 10vw",
    gridTemplateColumns: "1fr 2fr",
    gridColumnGap: "10vw",
  },
  profileSideBar: {
    position: "relative",
  },
  profileposts: {
    position: "relative",
    top: "10vh",
    display: "grid",
    width: "41vw",
  },

  /**<------------------------- Private ------------------------------> */
  privatebody: {
    display: "grid",
    margin: "0 0 0 10vw",
    gridTemplateColumns: "1fr 2fr",
    gridColumnGap: "10vw",
  },
  privateposts: {
    position: "relative",
    display: "grid",
    width: "41vw",
    marginTop: "10vh",
  },
}));
