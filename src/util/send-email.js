// @flow
import SparkPost from 'sparkpost';
import config from '../config';

type SendEmailType = {
  subject: string,
  body: string,
  from: string,
  name: string,
};

export default function sendEmail({
  subject,
  body,
  from,
  name,
}: SendEmailType) {
  const client = new SparkPost(config.sparkpostKey);
  const recipients = config.email.split(',').map(address => ({ address }));
  return client.transmissions.send({
    content: {
      from,
      subject,
      text: `${body}\r\nFrom ${name}`,
    },
    recipients,
  });
}
