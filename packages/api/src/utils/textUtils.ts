export const extractHashtags = (text: string): string[] => {
  const hashtagRegex = /#(\w+)/g;
  const matches = text.match(hashtagRegex);
  if (!matches) return [];
  return matches.map(tag => tag.slice(1).toLowerCase());
};

export const extractMentions = (text: string): string[] => {
  const mentionRegex = /@(\w+)/g;
  const matches = text.match(mentionRegex);
  if (!matches) return [];
  return matches.map(mention => mention.slice(1).toLowerCase());
}; 