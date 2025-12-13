// Import your Native Components here
import Blank from '../nativeFlexbits/Blank';
import Calendar from '../nativeFlexbits/Calendar';
import Clock from '../nativeFlexbits/Clock';
import GoogleSearchBar from '../nativeFlexbits/GoogleSearchBar';

import { FlexbitConfig } from '@/types';

// The Registry Map
export const FLEXBIT_REGISTRY: Record<string, FlexbitConfig> = {

  "Clock": {
    type: "native",
    component: Clock
  },
  "GoogleSearch": {
    type: "native",
    component: GoogleSearchBar
  },
  "Calendar": {
    type: "native",
    component: Calendar
  },
  "Blank": {
    type: "native",
    component: Blank
  }

};