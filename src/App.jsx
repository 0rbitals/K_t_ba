/* eslint-disable class-methods-use-this */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import './App.css';
import Buttons from './components/Buttons';

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

    this.buttonClicked = this.buttonClicked.bind(this);
  }

  ref = (editor) => {
    this.editor = editor;
  }

  onChange = ({ value }) => {
    this.setState({ value });
  }

  buttonClicked(event) {
    event.preventDefault();
    const { name } = event.target;
    this.editor.toggleMark(name);
  }

  renderMark(props, editor, next) {
    const { children, mark, attributes } = props;
    switch (mark.type) {
      case 'bold':
        return <strong {...{ attributes }}>{children}</strong>;
      case 'italic':
        return <em {...{ attributes }}>{children}</em>;
      case 'code':
        return <code {...{ attributes }}>{children}</code>;
      case 'underline':
        return <u {...{ attributes }}>{children}</u>;
      case 'strikethrough':
        return <s {...{ attributes }}>{children}</s>;
      default:
        return next();
    }
  }

  render() {
    const { value } = this.state;
    return (
      <div>
        <Buttons buttonClicked={this.buttonClicked} />
        <Editor
          ref={this.ref}
          value={value}
          onChange={this.onChange}
          renderMark={this.renderMark}
        />
      </div>
    );
  }
}

export default App;
