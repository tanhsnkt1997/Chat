import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { useDebounce } from "../../../helper/use-debounce";

const Input = forwardRef((props, ref) => {
  const [text, setText, { signal, debouncing }] = useDebounce("");

  useEffect(() => {
    if (text === "") {
      props.setShowLikeButton(true);
    } else {
      props.setShowLikeButton(false);
    }
  }, [signal]);

  useImperativeHandle(ref, () => ({
    resetTextInput() {
      setText("");
    },
    setTextInput(text) {
      setText(text);
    },
    getTextInput() {
      return text;
    },
  }));

  const onChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <textarea
        id="message"
        className="chatShow___footer_input_text"
        placeholder="Nhập nội dung..."
        onChange={onChange}
        value={text}
      />
    </div>
  );
});

export default React.memo(Input);

// setText(e.currentTarget.textContent);

/* <div
        id="message"
        contentEditable
        className="chatShow___footer_input_text"
        onInput={onInput}
        // onFocus={handlePlaceHolder}
        // onBlur={handlePlaceHolder}
      /> */

/* {showPlaceholder && (
        <span style={{ position: "absolute", top: "50%", transform: `translateY("50%")` }}>Nhập nội dung...</span>
      )} */
