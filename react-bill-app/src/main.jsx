import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.less';
import App from './App';
import 'lib-flexible/flexible'
import 'zarm/dist/zarm.css';
import "./assets/css/font_3777243_26zw4ixjwlk/iconfont.css"
//引入BrowserRouter
import { BrowserRouter } from 'react-router-dom'
const root = createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>,在严格模式下zarm组件的弹窗不显示
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </React.StrictMode>
);
