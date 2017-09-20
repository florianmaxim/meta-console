'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _paper = require('paper');

var _paper2 = _interopRequireDefault(_paper);

var _codemirror = require('codemirror');

var _codemirror2 = _interopRequireDefault(_codemirror);

require('codemirror/lib/codemirror.css');

require('./style.scss');

require('./codemirror.css');

require('./codemirror.theme.monokai.css');

var _tone = require('tone');

var _tone2 = _interopRequireDefault(_tone);

var _metaClient = require('meta-client');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('codemirror/mode/javascript/javascript');

/*
  Helpers
*/

window.r = _metaClient.r;
window.i = _metaClient.i;
window.e = _metaClient.e;

/*
 Tone.js
*/

window.Tone = _tone2.default;

/*
  Space
*/

window.Space = _metaClient.Space;

/*
  Matter
*/

window.Matter = _metaClient.Matter;

// Custom
window.Ground = _metaClient.Ground;
window.Grid = _metaClient.Grid;

/*
  Graphics
*/
window.Graphics = _metaClient.Graphics;
window.Existence = _metaClient.Existence;

/*
  Geometries
*/

window.Sphere = _metaClient.Sphere;
window.Cube = _metaClient.Cube;
window.Cylinder = _metaClient.Cylinder;
window.Plane = _metaClient.Plane;

window.Model = _metaClient.Model;

// window.Cube = (w,h,l)         => {return new Cube(w,h,l)};
// window.Sphere = (r)           => {return new Sphere(r)};
// window.Cylinder = (r1, r2, h) => {return new Cylinder(r1, r2, h)};
// window.Plane = (w, l)         => {return new Plane(w, l)};
//
// window.C = (w,h,l)     => {return new C(w,h,l)};
// window.S = (r)         => {return new S(r)};
// window.Y = (r1, r2, h) => {return new C(r1, r2, h)};
// window.P = (w, l)      => {return new P(w, l)};

var SAY = ["Will you try a spoonful of this and tell me what you think of it?", "Voice your opinion.", "Have your say."];

var TRY = ["Play around!", "Try it!", "Give it the old college try!", "Road test!", "Shake down!", "Push your luck!", "Go for it!", "Have a try!", "Play it safe!", "Have a ball!", "It's up to you!", "Taste!"];

var EXAMPLES = ["C()", "C(2.5)", "new Cube(2.5)", "Y()", "Y(2.5, 2.5)", "new Cylinder(2.5, 2.5, 10)", "for(let i=-2;i<=2;i++){\n\tfor(let j=-2;j<=2;j++){\n\t\tfor(let k=-2;k<=2;k++){\n\t\t\tC(1).set(i,j,k)\n}}}", "for(let i=-2;i<=2;i++){\n\tfor(let j=-2;j<=2;j++){\n\t\tfor(let k=-2;k<=2;k++){\n\t\t\tC(1).set(i*2,j*2,k*2)\n}}}", "for(let i=-2;i<=2;i++){\n\tfor(let j=-2;j<=2;j++){\n\t\tfor(let k=-2;k<=2;k++){\n\t\t\tY(0,1).set(i*2,j*2,k*2)\n}}}", "i(2000,()=>{C()})", "e(2000,()=>{C().p()})", "e(2000,()=>{C(1).p()})\nC(10,1,10).m('d', 5).p('f')", "let c = C()\nc.ev(1000, ()=>{\nc.c();});", "let c = C()\nlet s = 0;\nc.ev(100, ()=>{\nc.m('r',s);\ns++;\n});", "C().p()", "Y().p()", "C(10).m('d',7.5).p('f');\nC(2).p();", "C(10).m('d',7.5).p('f');\nC(2).m('l',5).p();", "C(10).m('d',7.5).p('f');\nC(2).m('l',5).p();\nC(2).m('r',2).p()", "new Ground()\nnew Grid()\nnew Cube()", "new Space({color:0x548adf});\nnew Ground({color:0x9aa9fe});\nvar synth = new Tone.Synth().toMaster();\nnew Cube({w:5,h:1,l:1})\n.m('l',5)\n.r('r',.5).r('f',.5)\n.c(0xffffff)\n.l((_,t)=> _.r('l', .01))\n.o('enter',(_)=>{_.c();\nsynth.triggerAttackRelease('C4', '8n');\n})\nnew Cube({w:5,h:1,l:1})\n.m('r',0)\n.r('r',.5).r('f',.5)\n.c(0xffffff)\n.l((_,t)=> _.r('u', .01))\n.o('release',(_)=>{_.c()\nsynth.triggerAttackRelease('C6', '8n');\n})\nnew Cube({w:5,h:1,l:1})\n.m('r',5)\n.r('r',.5).r('f',.5)\n.c(0xffffff)\n.l((_,t)=> _.r('b', .01))\n.o('touch',(_)=>{_.c()\nsynth.triggerAttackRelease('C2', '8n');\n})"];

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

  var container = document.createElement("div");
  container.className = 'console-container';

  document.body.appendChild(container);

  var close = document.createElement("div");
  close.className = 'console-resize';

  container.appendChild(close);

  var input = document.createElement("textarea");
  input.id = 'console';
  input.value = code;

  container.appendChild(input);

  var myCodeMirror = _codemirror2.default.fromTextArea(input, {
    mode: "javascript",
    value: code,
    theme: 'monokai',
    lineWrapping: true,
    lineNumbers: true
  });

  myCodeMirror.getWrapperElement().style.transition = "1s all";
  myCodeMirror.getWrapperElement().style.height = "16vh";
  myCodeMirror.getWrapperElement().style.backgroundColor = 'rgba(0,0,0,.5)';
  myCodeMirror.getWrapperElement().style.zIndex = '2';

  var buttonContainer = document.createElement("div");
  buttonContainer.className = 'console-button-container';
  container.appendChild(buttonContainer);

  var buttonClear = document.createElement("button");
  buttonClear.className = 'console-button';
  buttonContainer.appendChild(buttonClear);
  buttonClear.innerHTML = "Clear (Shift+ESC)";

  var buttonExample = document.createElement("button");
  buttonExample.className = 'console-button';
  buttonExample.id = 'console-button-example';
  buttonContainer.appendChild(buttonExample);
  buttonExample.innerHTML = "Examples(" + EXAMPLES.length + ")";

  var buttonCompile = document.createElement("button");
  buttonCompile.className = "console-button";
  buttonContainer.appendChild(buttonCompile);
  buttonCompile.innerHTML = 'Compile (Shift+Enter)';

  if (_default) {

    var link = document.createElement("a");
    link.className = 'console-logo';

    link.href = 'https://metajs.org';
    link.target = '_blank';
    link.innerHTML = _DEFAULT.LOGO;

    container.appendChild(link);

    var buttonExampleN = document.createElement("button");
    buttonExampleN.className = 'console-button-notification';
    buttonExample.appendChild(buttonExampleN);
    buttonExampleN.innerHTML = TRY[Math.floor(Math.random() * TRY.length)];

    // const i = document.createElement('img');
    //       i.className = "console-logo-github-img";
    //       i.src = "https://cdn.rawgit.com/gilbarbara/logos/00cf8501/logos/github-octocat.svg";
    //
    // const a = document.createElement('a');
    //       a.className = "console-logo-github";
    //       a.href =  'https://github.com/cheesyeyes/meta';
    //       a.target = '_blank';
    //
    //       a.appendChild(i);
    //
    //   document.body.appendChild(a);

    var line = document.createElement('div');
    line.className = "console-line";
    container.appendChild(line);

    line.innerHTML = "{";

    var a1 = document.createElement('a');
    a1.href = "https://docs.metajs.org";
    a1.target = '_blank';
    a1.innerHTML = "docs";
    line.appendChild(a1);

    line.innerHTML += "/";

    var a2 = document.createElement('a');
    a2.href = "https://meta.codes";
    a2.target = '_blank';
    a2.innerHTML = "codes";
    line.appendChild(a2);

    line.innerHTML += "}";

    var el = document.createElement('canvas');
    el.className = "console-circle";
    el.id = "paper";

    document.body.appendChild(el);

    var canvas = document.getElementById('paper');

    _paper2.default.setup(canvas);
    _paper2.default.view.size.width = 30;
    _paper2.default.view.size.height = 30;

    var path = new _paper2.default.Path.Circle({
      center: _paper2.default.view.center,
      radius: _paper2.default.view.bounds.height / 2
    });

    path.fillColor = {
      gradient: {
        stops: [['#' + Math.floor(Math.random() * 16777215).toString(16), 0], ['#' + Math.floor(Math.random() * 16777215).toString(16), 0.5]]
      },
      origin: path.position,
      destination: path.bounds.bottom
    };

    _paper2.default.view.draw();

    canvas.addEventListener('click', function (event) {
      container.style.display = container.style.display == 'none' ? 'flex' : 'none';
    });
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

    myCodeMirror.setValue('');
    myCodeMirror.focus();
    code = '';
  }

  function compile() {

    _metaClient.Space.clear();

    var code = myCodeMirror.getValue();

    eval(code);
  }

  addEventListener('load', function () {
    return compile();
  });

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