// Import your Native Components here
import Clock from '../nativeFlexbits/Clock';
import GoogleSearchBar from '../nativeFlexbits/GoogleSearchBar';
import { FlexbitConfig } from '@/types';
// import Calendar from '../nativeFlexbits/Calendar'; 

// The Registry Map
export const FLEXBIT_REGISTRY: Record<string, FlexbitConfig> = {

  "Clock": {
    type: "native",
    component: Clock
  },
  "Google Search": {
    type: "native",
    component: GoogleSearchBar
  },
  
  // Remote Widgets (Map string name -> Vercel Path)
  "Stock Chart": {
    type: "remote",
    url: "stocks" // will become https://tiletab-widgets.vercel.app/stocks
  },
  "News Feed": {
    type: "remote",
    url: "news"
  }

};