import { PropTypes } from "prop-types";
import { forwardRef, useImperativeHandle, useState } from "react";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div className="togglableContent">
      <div>
        <button
          style={
            hideWhenVisible.display === "none"
              ? showWhenVisible
              : hideWhenVisible
          }
          onClick={toggleVisibility}
        >
          { hideWhenVisible.display !== "none"
            ? props.buttonVisibleLable
            : props.buttonHideLable === "hide"
              ? props.buttonHideLable
              : props.buttonVisibleLable }
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        {props.buttonHideLable === "cancel" && (
          <button onClick={toggleVisibility}>{props.buttonHideLable}</button>
        )}
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonVisibleLable: PropTypes.string.isRequired,
  buttonHideLable: PropTypes.string.isRequired,
};
Togglable.displayName = "Togglable";

export default Togglable;
