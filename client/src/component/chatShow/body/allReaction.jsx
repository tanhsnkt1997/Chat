import React from "react";
import likeImg from "../../../public/image/like.png";
import loveImg from "../../../public/image/love.png";
import hahaImg from "../../../public/image/haha.png";
import wowImg from "../../../public/image/wow.png";
import sadImg from "../../../public/image/sad.png";
import angryImg from "../../../public/image/angry.png";
import loveloveImg from "../../../public/image/lovelove.png";

const images = [
  { id: "like", description: "Like", img: likeImg },
  { id: "love", description: "Love", img: loveImg },
  { id: "haha", description: "Haha", img: hahaImg },
  { id: "lovelove", description: "lovelove", img: loveloveImg },
  { id: "wow", description: "Wow", img: wowImg },
  { id: "sad", description: "Sad", img: sadImg },
  { id: "angry", description: "Angry", img: angryImg },
];

const AllReaction = ({ reactions }) => {
  const groupReaction = () => {
    return reactions.reduce((acc, curr, index, array) => {
      if (acc[curr.typeReaction]) {
        acc[curr.typeReaction].push(curr);
      } else {
        acc[curr.typeReaction] = [curr];
      }
      return acc;
    }, {});
  };

  const findImageByKey = (key) => {
    const imgReact = images.find((img) => img.id === key);
    return (
      <div style={{ width: "17px", height: "17px" }}>
        <img alt="img" src={imgReact.img} style={{ width: "100%", height: "100%", objectFit: "contain" }} />;
      </div>
    );
  };

  const renderAllReaction = () => {
    return Object.entries(groupReaction()).map(([key, value], i) => {
      return (
        <div style={{ display: "flex" }} key={i}>
          <div>{value.length > 1 && value.length}</div>
          <div>{findImageByKey(key)}</div>
        </div>
      );
    });
  };
  return <div style={{ display: "flex" }}>{renderAllReaction()}</div>;
};

export default React.memo(AllReaction);
