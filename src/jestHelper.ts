const spacesAndTabsButNotNewlines = "[^\\S\\r\\n]";
const leadingWhitespaceExceptNewline = new RegExp(
  `^${spacesAndTabsButNotNewlines}+`,
  "gm"
);
const trailingWhitespaceExceptNewline = new RegExp(
  `${spacesAndTabsButNotNewlines}+$`,
  "gm"
);

interface Query {
  query: string;
  variables: object;
}

// removes indentation whitespace which is not significant to GraphQL,
// leading and trailing spaces and tabs. Does not remove newlines.
export function trimQueryString(q: Query) {
  const withoutLeading = q.query.replace(leadingWhitespaceExceptNewline, "");
  const withoutEither = withoutLeading.replace(
    trailingWhitespaceExceptNewline,
    ""
  );
  return { ...q, query: withoutEither };
}
