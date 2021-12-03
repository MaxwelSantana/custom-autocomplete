import React from 'react';
import './index.css';
import { EditorState, EditorView, basicSetup } from '@codemirror/basic-setup';
import { example } from '../../lib/lang-example';

let state = EditorState.create({
  doc: 'console.log("Hello world")',
  extensions: [basicSetup, example()],
});

export const Editor = () => {
  const editorRef = React.useRef(null);
  React.useEffect(() => {
    if (editorRef.current === null) return;
    const view = new EditorView({
      state,
      parent: editorRef.current,
    });
    return () => {
      view.destroy();
    };
  }, [editorRef]);
  return <section className="Editor-editable-area" ref={editorRef} />;
};
