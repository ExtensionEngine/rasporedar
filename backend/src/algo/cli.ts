#!npx ts-node

import { generateSchedule } from './index';
import { generateScheduleProps } from './seed';

// fix console.log printing [Array] etc
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('util').inspect.defaultOptions.depth = null;

console.log(generateSchedule(generateScheduleProps));
