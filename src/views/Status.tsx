import React = require('preact');
import { Component } from 'preact';

import { FileType } from '../types';

interface StatusProps {
  connected: boolean;
  fileName: string | null;
  fileType: FileType;
  sync: boolean;

  onChangeName(file: string): void;
}

export default function Status(props: StatusProps) {
  function changeName() {
    const fileName = prompt('Enter new filename', props.fileName || '');

    if (fileName) {
      props.onChangeName(fileName);
    }
  }

  function getFileTypeString(): string {
    switch (props.fileType) {
      case 'xml':
        return 'Blockly Script';
      case 'py':
        return 'Python Script';
    }
  }

  return (
    <div class="Status">
      <span class="Status__filename" onClick={() => changeName()}>{props.fileName || '[New file]'} ({getFileTypeString()})</span>

      {!props.sync ? <span class="Status__sync">(Not in sync with block view)</span> : null}

      <span class={`Status__connection ${props.connected ? 'Status__connection--connected' : 'Status__connection--disconnected'}`}>{props.connected ? 'Connected' : 'Disconnected'}</span>
    </div>
  );
}