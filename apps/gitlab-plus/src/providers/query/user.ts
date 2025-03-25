export const userFragment = `
fragment UserFragment on User {
  id
  avatarUrl
  name
  username
  webUrl
  webPath
}
`;

export const userQuery = `
query workspaceAutocompleteUsersSearch($search: String!, $fullPath: ID!) {
  workspace: project(fullPath: $fullPath) {
    id
    users: autocompleteUsers(search: $search) {
      ...UserFragment
    }
  }
}

${userFragment}
`;

export const currentUserQuery = `
query currentUser {
  currentUser  {
    ...UserFragment
  }
}

${userFragment}
`;
