import Router from 'src/router';

const viewPoll = (pollId: string) => {
    Router.push({
      name: 'Poll',
      params: {
        pollId: pollId,
      },
    });
  };

export {viewPoll}