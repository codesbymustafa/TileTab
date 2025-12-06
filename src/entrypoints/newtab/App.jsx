import LayoutRenderer from '/src/Layout/LayoutRenderer.jsx';
import SideBar from '/src/SideBar/SideBar.jsx';
import {enableMapSet } from 'immer';

enableMapSet();
const App = () => {

  return (
  <>
  <SideBar/>
  <LayoutRenderer />
  </>
)
};

export default App;