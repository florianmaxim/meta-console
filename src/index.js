import CONTENT from './CONTENT.js';

import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';

import './style.scss';
import './codemirror.css';
import './codemirror.theme.monokai.css';

import Tone from 'tone';

import {Space}        from 'meta-client';

import {Matter}       from 'meta-client';

import {Graphics,
        Existence}    from 'meta-client';

import {Ground, Grid} from 'meta-client';

import {Sphere,
        Cube,
        Cylinder,
        Plane,
        Model}     from 'meta-client';

/*
  Helpers
*/

import {r, i, e} from 'meta-client';

window.r = r;
window.i = i;
window.e = e;

/*
 Tone.js
*/

window.Tone = Tone;

/*
  Space
*/

window.Space    = Space;

/*
  Matter
*/

window.Matter   = Matter;

// Custom
window.Ground   = Ground;
window.Grid     = Grid;

/*
  Graphics
*/
window.Graphics = Graphics;
window.Existence = Existence;

/*
  Geometries
*/

window.Sphere   = Sphere;
window.Cube     = Cube;
window.Cylinder = Cylinder;
window.Plane    = Plane;

window.Model    = Model;

// window.Cube = (w,h,l)         => {return new Cube(w,h,l)};
// window.Sphere = (r)           => {return new Sphere(r)};
// window.Cylinder = (r1, r2, h) => {return new Cylinder(r1, r2, h)};
// window.Plane = (w, l)         => {return new Plane(w, l)};
//
// window.C = (w,h,l)     => {return new C(w,h,l)};
// window.S = (r)         => {return new S(r)};
// window.Y = (r1, r2, h) => {return new C(r1, r2, h)};
// window.P = (w, l)      => {return new P(w, l)};

const _DEFAULT = {
  CODE: "C()",
  LOGO: "Meta"
}

let keys = {
    shift: false,
    ctrl: false
};

let scope;

export default class Console {

  constructor(props){

    scope = this;

    let example = -1;
    let code    = CONTENT.EXAMPLES[CONTENT.EXAMPLES.length-1];

    this.started = false;

    const container       = document.createElement("div");
          container.className = 'console-container';
          document.body.appendChild(container);

    const close           = document.createElement("div");
          close.className = 'console-resize';
          container.appendChild(close);

    const input           = document.createElement("textarea");
          input.id = 'console';
          input.value = code;
          container.appendChild(input);

    const codemirror      = CodeMirror.fromTextArea(input, {
        mode:  "javascript",
        value: code,
        theme: 'monokai',
        lineWrapping: true,
        lineNumbers: true
      });
          codemirror.getWrapperElement().style.transition = "1s all";
          codemirror.getWrapperElement().style.height = "16vh";
          codemirror.getWrapperElement().style.backgroundColor = 'rgba(0,0,0,.5)'
          codemirror.getWrapperElement().style.zIndex = '2';

    const buttonContainer = document.createElement("div");
          buttonContainer.className = 'console-button-container'
          container.appendChild(buttonContainer);

    const buttonClear     = document.createElement("button");
          buttonClear.className = 'console-button';
          buttonClear.innerHTML = "Clear (Shift+ESC)";
          buttonContainer.appendChild(buttonClear);

    const buttonExample   = document.createElement("button");
          buttonExample.className = 'console-button';
          buttonExample.id = 'console-button-example';
          buttonExample.innerHTML = "Examples("+CONTENT.EXAMPLES.length+")";
          buttonContainer.appendChild(buttonExample);

    const buttonExampleNotifications  = document.createElement("button");
          buttonExampleNotifications.className = 'console-button-notification';
          buttonExampleNotifications.innerHTML = CONTENT.TRY[Math.floor(Math.random()*CONTENT.TRY.length)];
          buttonExample.appendChild(buttonExampleNotifications);

    const buttonCompile   = document.createElement("button");
          buttonCompile.className = "console-button";
          buttonCompile.innerHTML = 'Compile (Shift+Enter)';
          buttonContainer.appendChild(buttonCompile);

    const link = document.createElement("a");
          link.className = 'console-logo';
          link.href = 'https://metajs.org';
          link.target = '_blank';
          link.innerHTML = _DEFAULT.LOGO;
          container.appendChild(link);

    const line    = document.createElement('div');
          line.className = "console-line";
           container.appendChild(line);

    line.innerHTML = "{";

    const a1 = document.createElement('a');
          a1.href = "http://meta.camp";
          a1.target = '_blank';
          a1.innerHTML = "docs";
          line.appendChild(a1);

    line.innerHTML += "/";

    const a2 = document.createElement('a');
          a2.href = "http://meta.codes";
          a2.target = '_blank';
          a2.innerHTML = "codes";
          line.appendChild(a2);

    line.innerHTML += "}";

    const circle    = document.createElement('div');
          circle.className = "console-circle";
          circle.id ="paper";

    document.body.appendChild(circle);

    circle.addEventListener('click',(event) => {
      container.style.display = container.style.display=='none'?'flex':'none';
    });

    function resize(){
      let currentHeight = codemirror.getWrapperElement().style.height;
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

      codemirror.getWrapperElement().style.height = nextHeight;
    }

    function clear(){

      codemirror.setValue('');
      codemirror.focus();
      code = '';

    }

    function compile(){

      Space.clear();

      const code = codemirror.getValue();

      eval(code);

    }

    /*
      Events
     */

    addEventListener('click', () => {
      console.log('click')
      if(scope.started===false) {
        line.style.display = 'none';
        scope.started = true;
      }

    })

    addEventListener('load', () => compile())

    buttonCompile.addEventListener('click', (event) => {

      event.preventDefault();

      compile();

    });

    buttonExample.addEventListener('click', (event) => {

      event.preventDefault();

      clear();

      example = example<CONTENT.EXAMPLES.length-1?example+1:0;

      code = CONTENT.EXAMPLES[example];

      codemirror.setValue(code);
      codemirror.focus();

      buttonExample.innerHTML = `Example (${example+1})/${CONTENT.EXAMPLES.length})`;

    });

    buttonClear.addEventListener('click', (event) => {
      event.preventDefault();
      buttonClear.style.color = 'rgba(137,145,162,1)';
      buttonClear.style.backgroundColor = 'rgba(42,46,56,1)'

      Space.clear();

      codemirror.setValue('');
      codemirror.focus();
      code = '';

    })


    input.addEventListener('click', (event) => {
      input.value = input.value===defaultText?"":input.value;
    })

    close.addEventListener('click', resize)


    addEventListener('load', (event) => {

      event.preventDefault();

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
        codemirror.setValue('');
        code = '';
        codemirror.focus();
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
