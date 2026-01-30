export const Routes = {
  HOMEPAGE: "/",
  SUBREDDIT({ subTitle }: { subTitle: string }) {
    return `/r/${subTitle}`;
  },
  POPULAR: "/r/popular",
  EXPLORE: "/explore",
  ALL: "/r/all",
  NONE: "#",
  COMMUNITIES: "/communities",
  COMMENTS({
    subTitle,
    postId,
  }: {
    subTitle: string;
    postId: number | string;
  }) {
    return `/r/${subTitle}/comments/${postId}`;
  },
  NEW_POST: "/submit",
  NEW_COMMUNITY: "/new-com",
  USER({ username }: { username: string }) {
    return `/user/${username}`;
  },
} as const;
