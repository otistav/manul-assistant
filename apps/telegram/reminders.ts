import bot from '.';

// eslint-disable-next-line import/prefer-default-export
export async function createReminder(id: string, messages: string[]) {
  let passedMessages: string[] = [];
  return () => {
    const notProperTime = (new Date().getHours() > 0 && new Date().getHours() < 8)
      || new Date().getHours() > 22;
    if (notProperTime) {
      return;
    }
    let filteredMessages = messages.filter((m) => !passedMessages.includes(m));
    if (!filteredMessages.length) {
      filteredMessages = messages;
      passedMessages = [];
    }
    const randomMessage = filteredMessages[Math.floor(Math.random() * filteredMessages.length)];
    passedMessages.push(randomMessage);
    // const messages = process.env.STRETCH_MESSAGES?.split('*') as string[];
    bot.telegram.sendMessage(
      id,
      randomMessage,
    );
  };
}
