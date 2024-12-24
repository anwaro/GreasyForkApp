import { Dictionary } from '../dictionary/Dictionary';
import { ElementDetector } from './ElementDetector';
import { SettingsItemId, UserSettingsType } from './UserSettings';

enum HiddenType {
  SponsoredLink = 'sponsored-link',
  SponsoredLabel = 'sponsored-label',
  SponsoredHiddenLabel = 'sponsored-hidden-label',
  Follow = 'follow',
  Join = 'join',
  Reels = 'reels',
}

export class BannedPost {
  private dictionary = new Dictionary();
  private detector = new ElementDetector();

  filter(posts: HTMLDivElement[], settings: UserSettingsType) {
    return posts.filter((post) => {
      if (post.dataset.fcc) {
        return true;
      }

      const query = '[data-ad-rendering-role="profile_name"] [role="button"]';
      if (
        settings[SettingsItemId.HideSuggestedProfiles] &&
        this.detector.getElement(post, query, this.dictionary.getFollowLabel())
      ) {
        post.dataset.fccReason = HiddenType.Follow;
        return true;
      }

      if (
        settings[SettingsItemId.HideSuggestedGroups] &&
        this.detector.getElement(post, query, this.dictionary.getJoinLabel())
      ) {
        post.dataset.fccReason = HiddenType.Join;
        return true;
      }

      if (
        settings[SettingsItemId.HideReels] &&
        this.detector.getElement(
          post,
          '[role="button"]',
          this.dictionary.getReelsLabel()
        )
      ) {
        post.dataset.fccReason = HiddenType.Reels;
        return true;
      }

      if (
        settings[SettingsItemId.HideSponsored] &&
        this.detector.getElement(post, 'a[href*="ads/about"]')
      ) {
        post.dataset.fccReason = HiddenType.SponsoredLink;
        return true;
      }

      if (
        settings[SettingsItemId.HideSponsored] &&
        this.detector.getElement(
          post,
          'a[attributionsrc] [aria-labelledby]',
          this.dictionary.getSponsoredLabel()
        )
      ) {
        post.dataset.fccReason = HiddenType.SponsoredLabel;
        return true;
      }

      const items = this.detector.getElements(
        post,
        'a[attributionsrc] [aria-labelledby]'
      );

      if (
        settings[SettingsItemId.HideSponsored] &&
        items.some(this.isSponsoredElement.bind(this))
      ) {
        post.dataset.fccReason = HiddenType.SponsoredHiddenLabel;
        return true;
      }

      return false;
    });
  }

  isSponsoredElement(element: HTMLSpanElement) {
    const sponsoredLabel = this.dictionary.getSponsoredLabel();
    const items = (
      [...element.firstElementChild.children] as HTMLSpanElement[]
    ).filter((i) => sponsoredLabel.includes(i.innerText));

    if (items.length < sponsoredLabel.length) {
      return false;
    }

    const elementLabel = items
      .map((item) => {
        const styles = getComputedStyle(item);
        return {
          text: item.innerText,
          isVisible: styles.position !== 'absolute',
          order: Number(styles.order),
        };
      })
      .filter((item) => item.isVisible)
      .sort((a, b) => a.order - b.order)
      .map((item) => item.text)
      .join('');
    return elementLabel.includes(sponsoredLabel);
  }

  hide(post: HTMLDivElement) {
    post.dataset.fcc = '@';
    post.dataset.fccType = '';
  }

  showHiddenPostGroups() {
    const hiddenPosts =
      document.querySelectorAll<HTMLDivElement>('[data-fcc="@"]');

    const hiddenPostsCount = (post: HTMLDivElement) => {
      const nextPost = post.nextElementSibling as HTMLDivElement | null;
      if (nextPost && nextPost.dataset.fcc) {
        return 1 + hiddenPostsCount(nextPost);
      }
      return 0;
    };

    [...hiddenPosts].forEach((post) => {
      const prevPost = post.previousElementSibling as HTMLDivElement | null;
      if (!prevPost || (prevPost && !prevPost.dataset.fcc)) {
        const count = 1 + hiddenPostsCount(post);
        post.dataset.fccType = '@';
        post.title = this.dictionary.hiddenPostLabel(count);
      }
    });
  }
}
