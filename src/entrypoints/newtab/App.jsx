import LayoutRenderer from '/src/Layout/LayoutRenderer.jsx';
import SideBar from '/src/Sidebar/SideBar.jsx';
import {enableMapSet } from 'immer';
import './App.css'

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