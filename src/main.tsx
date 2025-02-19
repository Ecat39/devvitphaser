// Visit developers.reddit.com/docs to learn Devvit!

import { Devvit, useWebView } from '@devvit/public-api';

Devvit.configure({
  redditAPI: true,
  redis: true,
});


Devvit.addMenuItem({
  label: 'Test',
  location: 'subreddit',
  onPress: (event, context) => {
    console.log(`Pressed ${event.targetId}`);
    context.ui.showToast('Hello world!');
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
