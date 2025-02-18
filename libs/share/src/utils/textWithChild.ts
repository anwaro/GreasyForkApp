import { ComponentChild, ComponentChildren } from 'preact';

export function textWithChild(
  text: string,
  pattern: RegExp,
  replacer: (text: string) => ComponentChild
): ComponentChildren {
  const matches = text.match(RegExp(pattern, 'g'));
  const parts = text.split(RegExp(pattern, 'g'));

  if (!matches?.length) {
    return text;
  }

  return parts.reduce((items, text, index) => {
    const textToReplace = index < matches.length ? matches[index] : undefined;

    return [
      ...items,
      text,
      ...(textToReplace ? [replacer(textToReplace)] : []),
    ];
  }, [] as ComponentChild[]);
}
