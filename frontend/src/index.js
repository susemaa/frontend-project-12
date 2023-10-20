import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'react-toastify/dist/ReactToastify.css';
import init from './init.jsx';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
document.getElementById('root').classList.add('h-100');

root.render(await init());
