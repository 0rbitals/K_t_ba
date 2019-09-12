import React from 'react';
import { Button, Icon, ButtonGroup } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Buttons = (props) => {
  const { markClicked, value, blockClicked } = props;
  return (
    <div>
      <Button.Group>
        <Button
          toggle
          active={value.activeMarks.some((mark) => mark.type === 'bold')}
          icon
          type="button"
          name="bold"
          onMouseDown={markClicked}
        >
          <Icon name="bold" />
        </Button>
        <Button
          toggle
          active={value.activeMarks.some((mark) => mark.type === 'italic')}
          icon
          type="button"
          name="italic"
          onMouseDown={markClicked}
        >
          <Icon name="italic" />
        </Button>
        <Button
          toggle
          active={value.activeMarks.some((mark) => mark.type === 'underline')}
          icon
          type="button"
          name="underline"
          onMouseDown={markClicked}
        >
          <Icon name="underline" />
        </Button>
        <Button
          toggle
          active={value.activeMarks.some(
            (mark) => mark.type === 'strikethrough',
          )}
          icon
          type="button"
          name="strikethrough"
          onMouseDown={markClicked}
        >
          <Icon name="strikethrough" />
        </Button>
        <Button
          toggle
          active={value.activeMarks.some((mark) => mark.type === 'code')}
          icon
          type="button"
          name="code"
          onMouseDown={markClicked}
        >
          <Icon name="code" />
        </Button>
        <Button
          toggle
          active={value.activeMarks.some((mark) => mark.type === 'h1')}
          icon
          type="button"
          name="h1"
          onMouseDown={markClicked}
        >
          <Icon name="heading" />
        </Button>
      </Button.Group>
      {' '}
      <ButtonGroup>
        <Button
          toggle
          active={value.blocks.some(
            (block) => value.document.getClosest(block.key, (parent) => parent.type === 'unorderedList'),
          )}
          icon
          type="button"
          name="unorderedList"
          onMouseDown={blockClicked}
        >
          <Icon name="list ul" />
        </Button>
        <Button
          toggle
          active={value.blocks.some(
            (block) => value.document.getClosest(block.key, (parent) => parent.type === 'orderedList'),
          )}
          icon
          type="button"
          name="orderedList"
          onMouseDown={blockClicked}
        >
          <Icon name="list ol" />
        </Button>
      </ButtonGroup>
    </div>
  );
};

Buttons.propTypes = {
  markClicked: PropTypes.func.isRequired,
  blockClicked: PropTypes.func.isRequired,
  value: PropTypes.shape({
    activeMarks: PropTypes.object.isRequired,
    blocks: PropTypes.object.isRequired,
    document: PropTypes.object.isRequired,
  }).isRequired,
};

export default Buttons;

/*
<button type="button" name="bold" onMouseDown={markClicked}>Bold</button>
      <button type="button" name="italic" onMouseDown={markClicked}>Italic</button>
      <button type="button" name="code" onMouseDown={markClicked}>Code</button>
      <button type="button" name="underline" onMouseDown={markClicked}>Underline</button>
      <button type="button" name="strikethrough" onMouseDown={markClicked}>Strikethrough</button>
*/
