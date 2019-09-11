import React from 'react';
import PropTypes from 'prop-types';

const Buttons = (props) => {
  const { buttonClicked } = props;
  return (
    <div>
      <button type="button" name="bold" onMouseDown={buttonClicked}>Bold</button>
      <button type="button" name="italic" onMouseDown={buttonClicked}>Italic</button>
      <button type="button" name="code" onMouseDown={buttonClicked}>Code</button>
      <button type="button" name="underline" onMouseDown={buttonClicked}>Underline</button>
      <button type="button" name="strikethrough" onMouseDown={buttonClicked}>Strikethrough</button>
    </div>
  );
};

Buttons.propTypes = {
  buttonClicked: PropTypes.func.isRequired,
};

export default Buttons;
