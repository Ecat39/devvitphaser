// Visit developers.reddit.com/docs to learn Devvit!

import { Devvit, useWebView } from '@devvit/public-api';

Devvit.configure({
  redditAPI: true,
  redis: true,
});


Devvit.addMenuItem({
  label: 'Create Test Post (with Web View)',
  location: 'subreddit',
  onPress: async (_event, context) => {
    const { reddit, ui } = context;
    const subreddit = await reddit.getCurrentSubreddit();
    const post = await reddit.submitPost({
      title: 'Hello World!',
      subredditName: subreddit.name,
      // The preview appears while the post loads
      preview: (
        <vstack height="100%" width="100%" alignment="middle center">
          <text size="large">Loading ...</text>
        </vstack>
      ),
    });
    ui.showToast({ text: 'Created post!' });
    ui.navigateTo(post);
  },
});
Devvit.addCustomPostType({
  name: 'Test Example',
  height: 'tall',
  render: (context) => {
    const { mount } = useWebView({
      url: 'index.html',
      onMessage: () => console.log('Received message:'),
      onUnmount: () => context.ui.showToast('Thanks for playing! See you soon!'),
    });

    return (
      <vstack grow padding="small">
        <vstack grow alignment="middle center">
          <text size="xlarge" weight="bold">
            Example App
          </text>
          <spacer />
          <vstack alignment="start middle">
            <hstack>
              <text size="medium">Username:</text>
            </hstack>
            <hstack>
              <text size="medium">Current counter:</text>
            </hstack>
          </vstack>
          <spacer />
          <button onPress={() => mount()}>Launch App</button>
        </vstack>
      </vstack>
    );
  },
});

export default Devvit;
