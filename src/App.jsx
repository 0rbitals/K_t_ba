/* eslint-disable class-methods-use-this */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import {
  Container,
  Header,
  Segment,
} from 'semantic-ui-react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import Buttons from './components/Buttons';


const style = {
  background: '#f4f4f4',
  border: '1px solid #ddd',
  borderLeft: '3px solid #06e7c2',
  color: '#666',
  pageBreakInside: 'avoid',
  fontFamily: 'monospace',
  fontSize: '15px',
  lineHeight: '1.6',
  marginBottom: '1.6em',
  maxWidth: '100%',
  overflow: 'auto',
  padding: '1em 1.5em',
  display: 'block',
  wordWrap: 'break-word',
};

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            text: 'Trying to rich text editor.',
          },
        ],
      },
    ],
  },
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      value: initialValue,
    };

    this.markClicked = this.markClicked.bind(this);
    this.blockClicked = this.blockClicked.bind(this);
  }

  ref = (editor) => {
    this.editor = editor;
  }

  onChange = ({ value }) => {
    this.setState({ value });
  }

  markClicked(event) {
    event.preventDefault();
    let { name } = event.target;
    if (event.target.type !== 'button') {
      name = event.target.parentNode.name;
    }
    this.editor.toggleMark(name);
  }

  blockClicked(event) {
    event.preventDefault();
    const { value } = this.state;
    const { document } = this.editor.value;
    let { name } = event.target;
    if (event.target.type !== 'button') {
      name = event.target.parentNode.name;
    }
    const isList = value.blocks.some((node) => node.type === 'list-item');
    const isType = value.blocks.some(
      (block) => document.getClosest(block.key, (parent) => parent.type === name),
    );
    if (isList && isType) {
      this.editor.unwrapBlock(name).setBlocks('paragraph');
    } else if (isList) {
      // If this is already a list and you click
      // on a different type of list button then change the type to that.
      this.editor.unwrapBlock().wrapBlock(name);
    } else {
      this.editor.setBlocks('list-item').wrapBlock(name);
    }
  }

  renderMark(props, editor, next) {
    const { children, mark, attributes } = props;
    switch (mark.type) {
      case 'bold':
        return <strong {...{ attributes }}>{children}</strong>;
      case 'italic':
        return <em {...{ attributes }}>{children}</em>;
      case 'code':
        return <code style={style} {...{ attributes }}>{children}</code>;
      case 'underline':
        return <u {...{ attributes }}>{children}</u>;
      case 'strikethrough':
        return <s {...{ attributes }}>{children}</s>;
      case 'h1':
        return <h1 {...{ attributes }}>{children}</h1>;
      default:
        return next();
    }
  }

  renderBlock = (props, editor, next) => {
    const { attributes, children, node } = props;

    switch (node.type) {
      case 'unorderedList':
        return <ul {...attributes}>{children}</ul>;
      case 'list-item':
        return <li {...attributes}>{children}</li>;
      case 'orderedList':
        return <ol {...attributes}>{children}</ol>;
      default:
        return next();
    }
  }

  render() {
    const { value } = this.state;
    return (
      <Container text>
        <Header as="h1" textAlign="center" style={{ marginTop: '20px' }}>K_T_BA Rich Text Editor</Header>
        <Segment.Group>
          <Segment>
            <Buttons
              markClicked={this.markClicked}
              value={value}
              blockClicked={this.blockClicked}
            />
          </Segment>
          <Segment>
            <Editor
              ref={this.ref}
              value={value}
              onChange={this.onChange}
              renderMark={this.renderMark}
              renderBlock={this.renderBlock}
            />
          </Segment>
        </Segment.Group>
      </Container>
    );
  }
}

export default App;
