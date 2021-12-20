import React, { forwardRef, useImperativeHandle } from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import "../Footer.css";
import SentimentVerySatisfiedOutlinedIcon from "@material-ui/icons/SentimentVerySatisfiedOutlined";

const Emoji = forwardRef((props, ref) => {
  const [isOpen, setOpen] = React.useState(false);
  useImperativeHandle(ref, () => ({
    isOpenEmoji() {
      setOpen(false);
    },
  }));
  const addEmoji = (emoji) => {
    const textarea = document.getElementById("message");
    const message = textarea.value;
    const cursorPositionStart = textarea.selectionStart;
    const cursorPositionEnd = textarea.selectionEnd;

    const start = textarea.value.substring(0, textarea.selectionStart);
    const end = textarea.value.substring(textarea.selectionStart);
    //bôi đen rồi change
    if (cursorPositionStart !== cursorPositionEnd) {
      const strSlice = message.substring(cursorPositionStart, cursorPositionEnd);
      const stringReplaceStartToEnd = message.replace(strSlice, emoji.native);
      // textarea.value = stringReplaceStartToEnd;
      props.inputRef.current.setTextInput(stringReplaceStartToEnd);
      textarea.focus();
      setTimeout(() => {
        textarea.selectionEnd = textarea.selectionStart = cursorPositionEnd;
      }, 0);
      return;
    }
    const text = start + emoji.native + end;
    // textarea.value = text;
    props.inputRef.current.setTextInput(text);
    textarea.focus();
    setTimeout(() => {
      textarea.selectionEnd = textarea.selectionStart = cursorPositionEnd + emoji.native.length;
    }, 0);
  };

  return (
    <div className="chatShow___footer_toolbox_emoji_container">
      <SentimentVerySatisfiedOutlinedIcon
        className="chatShow___footer_toolbox_emoji"
        onClick={() => setOpen((state) => !state)}
      />
      {isOpen && (
        <div className="chatShow___footer_toolbox_emoji_list">
          <Picker
            emoji="point_up"
            onSelect={addEmoji}
            showPreview={false}
            set="google"
            showSkinTones={false}
            style={{ width: "100%" }}
          />
        </div>
      )}
    </div>
  );
});

export default React.memo(Emoji);
