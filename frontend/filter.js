import profanity from '/home/frontend-project-12/frontend/node_modules/leo-profanity/src/index';

profanity.addWord(['badword1', 'badword2']);

export function filterProfanity(text) {
  return profanity.check(text) ? '***' : text;
}