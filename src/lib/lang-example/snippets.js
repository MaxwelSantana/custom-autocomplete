/* eslint-disable no-template-curly-in-string */
import { snippetCompletion as snip } from '@codemirror/autocomplete';

/// A collection of JavaScript-related
/// [snippets](#autocomplete.snippet).
export const snippets = [
  snip('click "${element}"', {
    label: 'click',
    type: 'keyword',
  }),
  snip('enter "${value}" in "${element}"', {
    label: 'enter',
    type: 'keyword',
  }),
  snip('press "${element}"', {
    label: 'press',
    type: 'keyword',
  }),
];
