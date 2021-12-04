import { parser } from './lang.js';
import { foldNodeProp, foldInside, indentNodeProp } from '@codemirror/language';
import { styleTags, tags as t } from '@codemirror/highlight';
import { LRLanguage } from '@codemirror/language';
import { completeFromList } from '@codemirror/autocomplete';
import { LanguageSupport } from '@codemirror/language';
import { readTrainingFileToArray, suggestWord } from './autocomplete/index.js';

let parserWithMetadata = parser.configure({
  props: [
    styleTags({
      Identifier: t.variableName,
      Boolean: t.bool,
      String: t.string,
      LineComment: t.lineComment,
      '( )': t.paren,
    }),
    indentNodeProp.add({
      Application: (context) =>
        context.column(context.node.from) + context.unit,
    }),
    foldNodeProp.add({
      Application: foldInside,
    }),
  ],
});

export const exampleLanguage = LRLanguage.define({
  parser: parserWithMetadata,
  languageData: {
    commentTokens: { line: ';' },
  },
});

function myCompletions(context) {
  let word = context.matchBefore(/\w*/);
  if (word.from === word.to && !context.explicit) return null;
  console.log({ word });
  const suggestedWord = suggestWord(word.text);
  const options = [{ label: suggestedWord, type: 'keyword' }];
  return {
    from: word.from,
    options,
  };
}

export const exampleCompletion = exampleLanguage.data.of({
  // autocomplete: completeFromList([
  //   { label: 'defun', type: 'keyword' },
  //   { label: 'defvar', type: 'keyword' },
  //   { label: 'let', type: 'keyword' },
  //   { label: 'cons', type: 'function' },
  //   { label: 'car', type: 'function' },
  //   { label: 'cdr', type: 'function' },
  // ]),
  autocomplete: myCompletions,
});

export function example() {
  return new LanguageSupport(exampleLanguage, [exampleCompletion]);
}
