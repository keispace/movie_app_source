import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//reactdom이 선언된 app의 내용을 id root에다가 집어넣는다. 
//(App위치는 위에 import하고, document는 이 js파일이랑 같은 이름의 public html)
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
