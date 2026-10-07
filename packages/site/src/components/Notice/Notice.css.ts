import { select } from 'surimi';

const notice = select('.site-notice');

notice.style({
	flexShrink: '0',
});

notice.child('p').style({
	fontSize: '0.875rem',
});
