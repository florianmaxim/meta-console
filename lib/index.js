'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('./style.scss');

require('./codemirror.css');

require('./codemirror.theme.monokai.css');

var _metaClient = require('meta-client');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.i = _metaClient.i;
window.e = _metaClient.e;

window.Space = _metaClient.Space;

window.Ground = _metaClient.Ground;

window.Matter = _metaClient.Matter;
window.Graphics = _metaClient.Matter;

window.Sphere = _metaClient.Sphere;
window.Cube = _metaClient.Cube;
window.Cylinder = _metaClient.Cylinder;
window.Plane = _metaClient.Plane;

window.Model = _metaClient.Model;

window.Cube = function (w, h, l) {
  return new _metaClient.Cube(w, h, l);
};
window.Sphere = function (r) {
  return new _metaClient.Sphere(r);
};
window.Cylinder = function (r1, r2, h) {
  return new _metaClient.Cylinder(r1, r2, h);
};
window.Plane = function (w, l) {
  return new _metaClient.Plane(w, l);
};

window.C = function (w, h, l) {
  return new _metaClient.C(w, h, l);
};
window.S = function (r) {
  return new _metaClient.S(r);
};
window.Y = function (r1, r2, h) {
  return new _metaClient.C(r1, r2, h);
};
window.P = function (w, l) {
  return new _metaClient.P(w, l);
};

var SAY = ["Will you try a spoonful of this and tell me what you think of it?", "Voice your opinion.", "Have your say."];

var TRY = ["Play around!", "Try it!", "Give it the old college try!", "Road test!", "Shake down!", "Push your luck!", "Go for it!", "Have a try!", "Play it safe!", "Have a ball!", "It's up tp you", "Taste!"];

var EXAMPLES = ["C()", "C(2.5)", "new Cube(2.5)", "Y()", "Y(2.5, 2.5)", "new Cylinder(2.5, 2.5, 10)", "for(let i=-2;i<=2;i++){\n\tfor(let j=-2;j<=2;j++){\n\t\tfor(let k=-2;k<=2;k++){\n\t\t\tC(1).set(i,j,k)\n}}}", "for(let i=-2;i<=2;i++){\n\tfor(let j=-2;j<=2;j++){\n\t\tfor(let k=-2;k<=2;k++){\n\t\t\tC(1).set(i*2,j*2,k*2)\n}}}", "for(let i=-2;i<=2;i++){\n\tfor(let j=-2;j<=2;j++){\n\t\tfor(let k=-2;k<=2;k++){\n\t\t\tY(0,1).set(i*2,j*2,k*2)\n}}}", "i(2000,()=>{C()})", "e(2000,()=>{C().p()})", "e(2000,()=>{C(1).p()})\nC(10,1,10).m('d', 5).p('f')", "let c = C()\nc.ev(1000, ()=>{\nc.c();});", "let c = C()\nlet s = 0;\nc.ev(100, ()=>{\nc.m('r',s);\ns++;\n});", "C().p()", "Y().p()", "C(10).m('d',7.5).p('f');\nC(2).p();", "C(10).m('d',7.5).p('f');\nC(2).m('l',5).p();", "C(10).m('d',7.5).p('f');\nC(2).m('l',5).p();\nC(2).m('r',2).p()"];

var _DEFAULT = {
  CODE: "C()",
  LOGO: "Meta"
};

var keys = {
  shift: false,
  ctrl: false
};

var Console = function Console(props) {
  _classCallCheck(this, Console);

  var _default = props !== undefined && typeof props === 'boolean' ? props : true;

  var example = -1;
  var code = EXAMPLES[EXAMPLES.length - 1];

  if (_default) {
    document.body.style.backgroundColor = '#111111';

    var link = document.createElement("a");
    link.className = 'console-logo';
    link.href = 'https://github.com/cheesyeyes/meta';
    link.target = '_blank';
    link.innerHTML = _DEFAULT.LOGO;

    document.body.appendChild(link);
  }

  var container = document.createElement("div");
  container.className = 'console-container';

  document.body.appendChild(container);

  var close = document.createElement("div");
  close.className = 'console-resize';

  container.appendChild(close);

  var input = document.createElement("textarea");
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
    mode: "javascript",
    value: code,
    theme: 'monokai',
    lineWrapping: true,
    lineNumbers: true
  });

  myCodeMirror.getWrapperElement().style.transition = "1s all";
  myCodeMirror.getWrapperElement().style.height = "16vh";
  myCodeMirror.getWrapperElement().style.backgroundColor = 'rgba(0,0,0,.5)';

  var buttonContainer = document.createElement("div");
  buttonContainer.className = 'console-button-container';
  container.appendChild(buttonContainer);

  var buttonClear = document.createElement("button");
  buttonClear.className = 'console-button';
  buttonContainer.appendChild(buttonClear);
  buttonClear.innerHTML = "Clear";

  var buttonExample = document.createElement("button");
  buttonExample.className = 'console-button';
  buttonExample.id = 'console-button-example';
  buttonContainer.appendChild(buttonExample);
  buttonExample.innerHTML = "Examples(" + EXAMPLES.length + ")";

  var buttonCompile = document.createElement("button");
  buttonCompile.className = "console-button";
  buttonContainer.appendChild(buttonCompile);
  buttonCompile.innerHTML = 'Compile';

  if (_default) {
    var buttonExampleN = document.createElement("button");
    buttonExampleN.className = 'console-button-notification';
    buttonExample.appendChild(buttonExampleN);
    buttonExampleN.innerHTML = TRY[Math.floor(Math.random() * TRY.length)];
  }

  function resize() {
    var currentHeight = myCodeMirror.getWrapperElement().style.height;
    var nextHeight = void 0;

    switch (currentHeight) {
      case '0vh':case '0':
        nextHeight = '16vh';
        if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) nextHeight = 'calc(16vh - 182px)';
        close.style.cursor = 'n-resize';
        break;
      case '16vh':
        nextHeight = '92.5vh';
        if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) nextHeight = 'calc(92.5vh - 182px)';
        close.style.transform = close.style.transform == 'rotateZ(180deg)' ? 'rotateZ(0deg)' : 'rotateZ(180deg)';
        close.style.cursor = 's-resize';
        break;
      case '92.5vh':
        nextHeight = '0vh';
        close.style.transform = close.style.transform == 'rotateZ(180deg)' ? 'rotateZ(0deg)' : 'rotateZ(180deg)';
        close.style.cursor = 'n-resize';
        break;
    }

    myCodeMirror.getWrapperElement().style.height = nextHeight;
  }

  function clear() {
    _metaClient.Space.clear();

    myCodeMirror.setValue('');
    myCodeMirror.focus();
    code = '';
  }

  function compile() {

    _metaClient.Space.clear();

    var code = myCodeMirror.getValue();

    eval(code);
  }

  buttonCompile.addEventListener('click', function (event) {

    event.preventDefault();

    compile();
  });

  buttonExample.addEventListener('click', function (event) {

    event.preventDefault();

    clear();

    example = example < EXAMPLES.length - 1 ? example + 1 : 0;

    code = EXAMPLES[example];

    myCodeMirror.setValue(code);
    myCodeMirror.focus();

    buttonExample.innerHTML = 'Example (' + (example + 1) + ')/' + EXAMPLES.length + ')';
  });

  buttonClear.addEventListener('click', function (event) {
    event.preventDefault();
    buttonClear.style.color = 'rgba(137,145,162,1)';
    buttonClear.style.backgroundColor = 'rgba(42,46,56,1)';

    _metaClient.Space.clear();

    myCodeMirror.setValue('');
    myCodeMirror.focus();
    code = '';
  });

  input.addEventListener('click', function (event) {
    input.value = input.value === defaultText ? "" : input.value;
  });

  close.addEventListener('click', resize);

  addEventListener('load', function (event) {

    event.preventDefault();

    input.focus();

    myCodeMirror.focus();
  });

  addEventListener('keydown', function (event) {

    if (event.keyCode === 192) event.preventDefault();

    if (event.keyCode == 16) {
      keys["shift"] = true;
    } else if (event.keyCode == 13) {
      keys["ctrl"] = true;
    } else if (event.keyCode == 27) {
      keys["esc"] = true;
    }

    if (keys["shift"] && keys["ctrl"]) {
      event.preventDefault();
      console.log('[Console] - SHIFT and ENTER');
      compile();
    }

    if (keys["shift"] && keys["esc"]) {
      event.preventDefault();
      console.log('[Console] - SHIFT and ESC');
      _metaClient.Space.clear();
      myCodeMirror.setValue('');
      code = '';
      myCodeMirror.focus();
    }
  });

  addEventListener('keyup', function (event) {

    if (event.keyCode === 192) {
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
  });
};

exports.default = Console;