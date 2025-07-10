
export function renderCss(cssCode) {
    const style = document.createElement('style');
    document.head.appendChild(style);
    const sheet = style.sheet;
    
    cssCode.split('}').forEach(rule => {
      if (rule.trim().length > 0) {
        sheet.insertRule(rule, sheet.cssRules.length);
        console.log(sheet.cssRules)
      }
    });
  }
  



