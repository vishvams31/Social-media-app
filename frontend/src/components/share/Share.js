import PermMediaIcon from "@mui/icons-material/PermMedia";
import { Cancel } from "@mui/icons-material";
import { submitHandler } from "../../services/Service";
import "./share.css";
import { useState } from "react";
import { useSelector } from "react-redux";

import { useForm } from "react-hook-form";

export default function Share() {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // const desc = useRef();
  const [file, setFile] = useState(null);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    submitHandler(data, { preventDefault: () => {} }, user, file);
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="shareTop">
            <img
              className="shareProfileImg"
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "person/noProfilePicture.jpeg"
              }
              alt=""
            />
            <input
              placeholder={"What's in your mind " + user.username + "?"}
              className="shareInput"
              // ref={desc}
              {...register("desc")}
            />
          </div>
          <hr className="shareHr" />
          {file && (
            <div className="shareImgContainer">
              <img
                className="shareImg"
                src={URL.createObjectURL(file)}
                alt=""
              />
              <Cancel
                className="shareCancelImg"
                onClick={() => setFile(null)}
              />
            </div>
          )}
          <div className="shareBottom">
            <div className="shareOptions">
              <label htmlFor="file" className="shareOption">
                <PermMediaIcon htmlColor="tomato" className="shareIcon" />
                <span className="shareOptionText">Photo or Video</span>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
            </div>
            <button className="shareButton" type="submit">
              Share
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
