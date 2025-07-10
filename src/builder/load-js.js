 import { createRoot } from 'react-dom/client';


 
 export function renderJavascript(jsString, rootElement) {
 
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(jsString, 'text/html');
    const scriptElements = htmlDoc.getElementsByTagName('script');
    const script = document.createElement('script');
  
    script.innerHTML = scriptElements[0].innerHTML;
    document.head.appendChild(script);
    const root = createRoot(rootElement);
    root.render(script);
  }
