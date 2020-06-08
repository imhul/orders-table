import React from 'react';
import { render } from 'react-dom';
import Output from './components/Output';
import "antd/dist/antd.css";
import "./assets/scss/index.scss";

render(<Output />,
  document.getElementById('root'),
);
