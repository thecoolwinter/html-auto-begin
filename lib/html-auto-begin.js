'use babel';

import HtmlAutoBeginView from './html-auto-begin-view';
import { CompositeDisposable } from 'atom';

export default {

  htmlAutoBeginView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.htmlAutoBeginView = new HtmlAutoBeginView(state.htmlAutoBeginViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.htmlAutoBeginView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'html-auto-begin:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.htmlAutoBeginView.destroy();
  },

  serialize() {
    return {
      htmlAutoBeginViewState: this.htmlAutoBeginView.serialize()
    };
  },

  toggle() {
    console.log('HtmlAutoBegin was toggled!');
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      editor.insertText(`<!DOCTYPE html>
<html lang="en">
<head>

  <title>New Html Website</title>

</head>
<body>

</body>
</html>
`)
    }
  }

};
