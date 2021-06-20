export interface Profile {
  id: string;
  screenName: string;
  displayName?: string;
  bio?: string;
  avatarUri?: string;
  headerUri?: string;
  counters: {
    posts: number;
    followers: number;
    following: number;
  };
  followed?: boolean;
}