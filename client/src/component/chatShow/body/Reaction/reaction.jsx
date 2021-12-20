import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import socketAction from "../../../../redux/action/socket";
import ReactionList from "./reactionList .jsx";

const images = [
  { id: "like", description: "Like", img: "http://i.imgur.com/LwCYmcM.gif" },
  { id: "love", description: "Love", img: "http://i.imgur.com/k5jMsaH.gif" },
  { id: "haha", description: "Haha", img: "http://i.imgur.com/f93vCxM.gif" },
  {
    id: "lovelove",
    description: "lovelove",
    img: "https://i.pinimg.com/originals/1e/c6/ff/1ec6ffa47799defdcd397a84f9b19f41.gif",
  },
  { id: "wow", description: "Wow", img: "http://i.imgur.com/9xTkN93.gif" },
  { id: "sad", description: "Sad", img: "http://i.imgur.com/tFOrN5d.gif" },
  { id: "angry", description: "Angry", img: "http://i.imgur.com/1MgcQg0.gif" },
];
const Reaction = ({ messageId, reactions }) => {
  const dispatch = useDispatch();
  const UserIdStore = useSelector((state) => state.auth.user._id);

  const onUpdateIcon = (icon) => {
    dispatch(socketAction.sentReaction({ icon, messageId }));
  };

  const cancelReaction = () => {
    dispatch(socketAction.sentReaction({ icon: "cancel", messageId }));
  };

  const showReactionMe = () => {
    const reactionIsExits = reactions.find((reaction) => reaction.userId === UserIdStore);
    if (!reactionIsExits) {
      return <SentimentSatisfiedOutlinedIcon className="chatShow___body_me_tool_message_icon" />;
    } else {
      const reactionImage = images.find((item) => item.id === reactionIsExits.typeReaction);
      return (
        <img
          alt="img"
          src={reactionImage.img}
          style={{ height: "20px", width: "20px", objectFit: "cover" }}
          onClick={cancelReaction}
        />
      );
    }
  };

  return (
    <>
      <ReactionList items={images} onUpdateIcon={onUpdateIcon}>
        <div style={{ cursor: "pointer" }}>{showReactionMe()}</div>
      </ReactionList>
    </>
  );
};

export default React.memo(Reaction);
