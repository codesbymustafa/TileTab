import LayoutRenderer from '../../Layout/LayoutRenderer';
import SideBar from '../../Sidebar/SideBar';
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