import { BannedPost } from './BannedPost';
import { UserSettings } from './UserSettings';

export class FeedCleaner {
  private bannedPostDetector = new BannedPost();
  private settings = new UserSettings();

  cleanFeed(feedElement: HTMLDivElement) {
    const posts = [...feedElement.children] as HTMLDivElement[];
    const bannedPosts = this.bannedPostDetector.filter(
      posts,
      this.settings.getSettings()
    );
    bannedPosts.forEach((post) => {
      this.bannedPostDetector.hide(post);
    });
    this.bannedPostDetector.showHiddenPostGroups();
  }
}
