import labels from './labels.json';
import messages from './messages.json';

export type Lang = {
	labels: unknown;
	messages: unknown;
};

const lang: Lang = { labels, messages } as unknown as Lang;

export default lang;
export { lang };