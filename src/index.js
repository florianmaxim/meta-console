import './style.scss';
import './codemirror.css';
import './codemirror.theme.monokai.css';

import {Space, Ground, Matter, Graphics, Sphere, Cube, Cylinder, Plane, Model, C, O, Y, P, S} from 'meta-client';

import {i, e} from 'meta-client';

window.i = i;
window.e = e;

window.Space    = Space;

window.Ground   = Ground;

window.Matter   = Matter;
window.Graphics = Matter;

window.Sphere   = Sphere;
window.Cube     = Cube;
window.Cylinder = Cylinder;
window.Plane    = Plane;

window.Model    = Model;

window.Cube = (w,h,l)         => {return new Cube(w,h,l)};
window.Sphere = (r)           => {return new Sphere(r)};
window.Cylinder = (r1, r2, h) => {return new Cylinder(r1, r2, h)};
window.Plane = (w, l)         => {return new Plane(w, l)};

window.C = (w,h,l)     => {return new C(w,h,l)};
window.S = (r)         => {return new S(r)};
window.Y = (r1, r2, h) => {return new C(r1, r2, h)};
window.P = (w, l)      => {return new P(w, l)};

const SAY = [
  "Will you try a spoonful of this and tell me what you think of it?",
  "Voice your opinion.",
  "Have your say."
]

const TRY = [
  "Play around!",
  "Try it!",
  "Give it the old college try!",
  "Road test!",
  "Shake down!",
  "Push your luck!",
  "Go for it!",
  "Have a try!",
  "Play it safe!",
  "Have a ball!",
  "It's up tp you",
  "Taste!",
]

const EXAMPLES = [
  "C()",
  "C(2.5)",
  "new Cube(2.5)",

  "Y()",
  "Y(2.5, 2.5)",
  "new Cylinder(2.5, 2.5, 10)",

  "for(let i=-2;i<=2;i++){\n\tfor(let j=-2;j<=2;j++){\n\t\tfor(let k=-2;k<=2;k++){\n\t\t\tC(1).set(i,j,k)\n}}}",
  "for(let i=-2;i<=2;i++){\n\tfor(let j=-2;j<=2;j++){\n\t\tfor(let k=-2;k<=2;k++){\n\t\t\tC(1).set(i*2,j*2,k*2)\n}}}",
  "for(let i=-2;i<=2;i++){\n\tfor(let j=-2;j<=2;j++){\n\t\tfor(let k=-2;k<=2;k++){\n\t\t\tY(0,1).set(i*2,j*2,k*2)\n}}}",

  "i(2000,()=>{C()})",
  "e(2000,()=>{C().p()})",
  "e(2000,()=>{C(1).p()})\nC(10,1,10).m('d', 5).p('f')",

  "let c = C()\nc.ev(1000, ()=>{\nc.c();});",
  "let c = C()\nlet s = 0;\nc.ev(100, ()=>{\nc.m('r',s);\ns++;\n});",

  "C().p()",
  "Y().p()",

  "C(10).m('d',7.5).p('f');\nC(2).p();",
  "C(10).m('d',7.5).p('f');\nC(2).m('l',5).p();",
  "C(10).m('d',7.5).p('f');\nC(2).m('l',5).p();\nC(2).m('r',2).p()"
]

const _DEFAULT = {
  CODE: "C()",
  LOGO: "Meta"
}

let keys = {
    shift: false,
    ctrl: false
};

export default class Console {

  constructor(props){

    const _default = props!==undefined&&typeof(props)==='boolean'?props:true;

    let example = -1;
    let code    = EXAMPLES[EXAMPLES.length-1];

    if(_default){
      document.body.style.backgroundColor = '#111111';

      let link = document.createElement("a");
          link.className = 'console-logo';
          link.href = 'https://github.com/cheesyeyes/meta';
          link.target = '_blank';
          link.innerHTML = _DEFAULT.LOGO;

      document.body.appendChild(link);
    }

    const container = document.createElement("div");
          container.className = 'console-container';

    document.body.appendChild(container);

    const close = document.createElement("div");
          close.className = 'console-resize';

    container.appendChild(close);

    const input = document.createElement("textarea");
          input.style.transition = '1s all';
          input.style.width = '100vw';
          input.style.border = '1px solid #eee';
          input.style.filter = "blur(15px)";

          input.id = 'console';
          input.value = code;

    container.appendChild(input);

    require('codemirror/mode/javascript/javascript');
    require('codemirror/lib/codemirror.css');

    var CodeMirror = require('codemirror/lib/codemirror');

    var myCodeMirror = CodeMirror.fromTextArea(input, {
      mode:  "javascript",
      value: code,
      theme: 'monokai',
      lineWrapping: true,
      lineNumbers: true
    });

    myCodeMirror.getWrapperElement().style.transition = "1s all";
    myCodeMirror.getWrapperElement().style.height = "16vh";
    myCodeMirror.getWrapperElement().style.backgroundColor = 'rgba(0,0,0,.5)'


    const buttonContainer = document.createElement("div");
          buttonContainer.className = 'console-button-container'
          container.appendChild(buttonContainer);

    const buttonClear     = document.createElement("button");
          buttonClear.className = 'console-button';
          buttonContainer.appendChild(buttonClear);
          buttonClear.innerHTML = "Clear";

    const buttonExample   = document.createElement("button");
          buttonExample.className = 'console-button';
          buttonExample.id = 'console-button-example';
          buttonContainer.appendChild(buttonExample);
          buttonExample.innerHTML = "Examples("+EXAMPLES.length+")";

    const buttonCompile   = document.createElement("button");
          buttonCompile.className = "console-button";
          buttonContainer.appendChild(buttonCompile);
          buttonCompile.innerHTML = 'Compile';

    if(_default){
      const buttonExampleN  = document.createElement("button");
            buttonExampleN.className = 'console-button-notification';
            buttonExample.appendChild(buttonExampleN);
            buttonExampleN.innerHTML = TRY[Math.floor(Math.random()*TRY.length)];
    }

    function resize(){
      let currentHeight = myCodeMirror.getWrapperElement().style.height;
      let nextHeight;

      switch(currentHeight){
        case '0vh': case '0':
          nextHeight = '16vh';
          if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)))
            nextHeight = 'calc(16vh - 182px)';
          close.style.cursor = 'n-resize';
        break;
        case '16vh':
          nextHeight = '92.5vh';
          if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)))
            nextHeight = 'calc(92.5vh - 182px)';
          close.style.transform = close.style.transform=='rotateZ(180deg)'?'rotateZ(0deg)':'rotateZ(180deg)';
          close.style.cursor = 's-resize';
        break;
        case '92.5vh':
          nextHeight = '0vh';
          close.style.transform = close.style.transform=='rotateZ(180deg)'?'rotateZ(0deg)':'rotateZ(180deg)';
          close.style.cursor = 'n-resize';
        break;
      }

      myCodeMirror.getWrapperElement().style.height = nextHeight;
    }

    function clear(){
      Space.clear();

      myCodeMirror.setValue('');
      myCodeMirror.focus();
      code = '';
    }

    function compile(){

      Space.clear();

      const code = myCodeMirror.getValue();

      eval(code);

    }


    buttonCompile.addEventListener('click', (event) => {

      event.preventDefault();

      compile();
    });

    buttonExample.addEventListener('click', (event) => {

      event.preventDefault();

      clear();

      example = example<EXAMPLES.length-1?example+1:0;

      code = EXAMPLES[example];

      myCodeMirror.setValue(code);
      myCodeMirror.focus();

      buttonExample.innerHTML = `Example (${example+1})/${EXAMPLES.length})`;

    });

    buttonClear.addEventListener('click', (event) => {
      event.preventDefault();
      buttonClear.style.color = 'rgba(137,145,162,1)';
      buttonClear.style.backgroundColor = 'rgba(42,46,56,1)'

      Space.clear();

      myCodeMirror.setValue('');
      myCodeMirror.focus();
      code = '';

    })


    input.addEventListener('click', (event) => {
      input.value = input.value===defaultText?"":input.value;
    })

    close.addEventListener('click', resize)


    addEventListener('load', (event) => {

      event.preventDefault();

      input.focus();

      myCodeMirror.focus();

    });

    addEventListener('keydown', (event) => {

      if(event.keyCode===192) event.preventDefault();

      if (event.keyCode == 16) {
       keys["shift"] = true;
      } else if (event.keyCode == 13) {
       keys["ctrl"] = true;
      } else if (event.keyCode == 27) {
       keys["esc"] = true;
      }

      if (keys["shift"] && keys["ctrl"]) {
        event.preventDefault();
        console.log('[Console] - SHIFT and ENTER')
        compile();
      }

      if (keys["shift"] && keys["esc"]) {
        event.preventDefault();
        console.log('[Console] - SHIFT and ESC');
        Space.clear();
        myCodeMirror.setValue('');
        code = '';
        myCodeMirror.focus();
      }
    })

    addEventListener('keyup', (event) => {

      if(event.keyCode===192){
        event.preventDefault();
        resize();
      }

      if (event.keyCode == 16) {
       keys["shift"] = false;
      } else if (event.keyCode == 13) {
       keys["ctrl"] = false;
      } else if (event.keyCode == 27) {
       keys["esc"] = false;
      }

    })

  }

}
