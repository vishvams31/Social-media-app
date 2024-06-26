import axios from "axios";
import toast from "react-hot-toast";
const BASE_URL = "http://localhost:8800/api/";
//added token in header
const axiosInstance = axios.create({
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
//get the user on login
export const getUser = async (token) => {};
//update profile picture handler
export const handleFileChange = async (event, user) => {
  const file = event.target.files[0];
  if (!file) {
    console.error("No file selected for profile picture update.");
    return;
  }
  const data = new FormData();
  const fileName = Date.now() + file.name;
  data.append("name", fileName);
  data.append("file", file);
  try {
    const uploadResponse = await axiosInstance.post(BASE_URL + "upload", data);
    console.log("File uploaded successfully:", uploadResponse.data);
    const updateResponse = await axiosInstance.put(
      BASE_URL + "users/" + user._id,
      {
        profilePicture: fileName,
        userId: user._id,
      }
    );
    console.log(
      "User profile picture updated successfully:",
      updateResponse.data
    );

    window.location.reload();
    setTimeout(() => {
      toast.success("Profile picture updated");
    }, 2000);
  } catch (err) {
    console.log("Error updating profile picture:", err);
    toast.error("Failed to update profile picture");
  }
};

//handels the delete post
export const handleDeletePost = async (post, setPosts, posts) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this post?"
  );
  if (confirmDelete) {
    try {
      await axiosInstance.delete(BASE_URL + `posts/${post._id}`, {
        data: { userId: post.userId },
      });
      setPosts(posts.filter((ele) => ele._id !== post._id));
      toast.success("successfully deleted");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }
};
//fetch timeline and user profile posts
export const fetchPosts = async (username, user, setPosts) => {
  const res = username
    ? await axios.get(BASE_URL + "posts/profile/" + username)
    : await axios.get(BASE_URL + "posts/timeline/" + user._id);
  console.log(res);
  setPosts(
    res.data.posts.sort((p1, p2) => {
      return new Date(p2.createdAt) - new Date(p1.createdAt);
    })
  );
};

//get user profile
export const fetchUser = async (post, setUser) => {
  try {
    const res = await axiosInstance.get(
      BASE_URL + `users?userId=${post.userId}`
    );
    setUser(res.data);
  } catch (error) {
    console.error("Error fetching user:", error);
    // Handle error, show message to user, etc.
  }
};

//handle likes
export const likeHandler = (
  post,
  currentUser,
  setLike,
  setIsLiked,
  isLiked,
  Like
) => {
  try {
    axios.put(BASE_URL + "posts/" + post._id + "/like", {
      userId: currentUser._id,
    });
  } catch (err) {
    console.error("Error liking post:", err);
  }
  setLike(isLiked ? Like - 1 : Like + 1);
  setIsLiked(!isLiked);
};

//handle the edit button
export const handleUpdatePost = async (
  editedContent,
  currentUser,
  post,
  setShowDropdown,
  setIsEditing
) => {
  try {
    const updatedPost = {
      desc: editedContent,
      userId: currentUser._id,
    };

    const response = await axiosInstance.put(
      BASE_URL + `posts/${post._id}`,
      updatedPost
    );

    if (response.status === 200) {
      console.log("Post updated:", response.data);
      toast.success("Updated! Please refreash the feed to see the changes");
      // window.location.reload()
    } else {
      console.error("Failed to update post:", response.data);
    }
  } catch (error) {
    console.error("Error updating post:", error);
  }
  setShowDropdown(false); // Close the dropdown menu after clicking the option
  setIsEditing(false);
};

//get user friends on user profile
export const getFriends = async (user, setFriends) => {
  try {
    // setIsLoading(true); // Start loading
    if (user && user._id) {
      const URL = BASE_URL + `users/friends/${user._id}`;
      const friendList = await axios.get(URL);
      setFriends(friendList.data);
      // setIsLoading(false); // Stop loading
    }
  } catch (err) {
    console.log(err);
  }
};

//follow button handler
export const followHandler = async (
  followed,
  user,
  currentUser,
  dispatch,
  setFollowed
) => {
  try {
    console.log(!followed);
    if (followed) {
      await axios.put(BASE_URL + `users/${user._id}/unfollow`, {
        userId: currentUser._id,
      });
      dispatch({ type: "UNFOLLOW", payload: user._id });
    } else {
      await axios.put(BASE_URL + `users/${user._id}/follow`, {
        userId: currentUser._id,
      });
      dispatch({ type: "FOLLOW", payload: user._id });
    }
    setFollowed(!followed);
  } catch (err) {}
};

//update user information on profile page
export const updateData = async (values, user) => {
  const data = {
    city: values.city,
    state: values.state,
    relationship: values.relationship,
    userId: user._id,
    username: values.username,
  };
  await axiosInstance.put(BASE_URL + `users/${user._id}`, data);
  toast.success("Successfully Updated");
};
//create post handler
export const submitHandler = async (dat, event, user, file) => {
  event.preventDefault();

  // console.log(dat)
  const newPost = {
    userId: user._id,
    desc: dat.desc,
  };
  if (file) {
    const data = new FormData();
    const fileName = Date.now() + file.name;
    data.append("name", fileName);
    data.append("file", file);
    newPost.img = fileName;
    console.log(newPost);
    try {
      await axios.post(BASE_URL + "upload", data);
    } catch (err) {}
  }
  try {
    await axiosInstance.post(BASE_URL + "posts", newPost);
    window.location.reload();
    setTimeout(() => {
      toast.success("Post uploaded");
    }, 2000);
  } catch (err) {}
};

//searchbar handler
export const searchUser = async (username) => {
  try {
    console.log(username);
    const URL = BASE_URL + `users/exists/${username}`;
    const user = await axios.get(URL);
    return user.data;
  } catch (err) {
    console.log(err);
  }
};

//profile page handler
export const fetchUserProfile = async (username, setUser) => {
  const res = await axios.get(BASE_URL + `users?username=${username}`);
  setUser(res.data);
};

//register handler
export const handleClick = async (
  e,
  passwordAgain,
  password,
  username,
  email,
  navigate
) => {
  // const navigate = useNavigate();
  e.preventDefault();
  if (passwordAgain.current.value !== password.current.value) {
    passwordAgain.current.setCustomValidity("Password don't match!");
  } else {
    try {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      await axios.post(BASE_URL + "auth/register", user);
      toast.success("Successfully registered");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }
};
