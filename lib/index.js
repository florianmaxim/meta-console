'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @TODO call codemirror's .refresh()
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * if anything renders werid...
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

/*
  Helpers
*/

var _CONTENT = require('./CONTENT.js');

var _CONTENT2 = _interopRequireDefault(_CONTENT);

var _codemirror = require('codemirror');

var _codemirror2 = _interopRequireDefault(_codemirror);

require('codemirror/lib/codemirror.css');

require('codemirror/mode/javascript/javascript');

require('./style.scss');

require('./codemirror.css');

require('./codemirror.theme.monokai.css');

var _tone = require('tone');

var _tone2 = _interopRequireDefault(_tone);

var _metaClient = require('meta-client');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var _DEFAULT = {

  LOGO: "Meta",

  COLOR: {

    PRIMARY: 'rgba(' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ', 0.5)',
    SECONDARY: 'rgba(' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ', 0.5)'

  }

};

var keys = {
  shift: false,
  ctrl: false
};

var scope = void 0;

var codemirror = void 0,
    _resize = void 0;

var Console = function () {
  function Console(props) {
    _classCallCheck(this, Console);

    scope = this;

    var example = -1;
    var code = _CONTENT2.default.EXAMPLES[_CONTENT2.default.EXAMPLES.length - 1];

    this.started = false;
    this.mode = 0;

    var container = document.createElement("div");
    container.className = 'console-container';
    document.body.appendChild(container);

    _resize = document.createElement("div");
    _resize.className = 'console-resize';
    container.appendChild(_resize);

    var input = document.createElement("textarea");
    input.value = code;
    container.appendChild(input);

    codemirror = _codemirror2.default.fromTextArea(input, {
      mode: "javascript",
      value: code,
      theme: 'monokai',
      lineWrapping: true,
      lineNumbers: true
    });
    codemirror.getWrapperElement().style.background = 'linear-gradient(135deg, ' + _DEFAULT.COLOR.PRIMARY + ', ' + _DEFAULT.COLOR.SECONDARY + ')';
    codemirror.getWrapperElement().style.width = '100vw';
    codemirror.getWrapperElement().style.height = '16vh';
    codemirror.getWrapperElement().style.transition = '.5s all';

    var buttonContainer = document.createElement("div");
    buttonContainer.className = 'console-button-container';
    container.appendChild(buttonContainer);

    var buttonClear = document.createElement("button");
    buttonClear.className = 'console-button';
    buttonClear.innerHTML = "Clear (Shift+ESC)";
    buttonContainer.appendChild(buttonClear);

    var buttonExample = document.createElement("button");
    buttonExample.className = 'console-button';
    buttonExample.id = 'console-button-example';
    buttonExample.innerHTML = "Examples(" + _CONTENT2.default.EXAMPLES.length + ")";
    buttonContainer.appendChild(buttonExample);

    // const buttonExampleNotifications  = document.createElement("button");
    //       buttonExampleNotifications.className = 'console-button-notification';
    //       buttonExampleNotifications.innerHTML = CONTENT.TRY[Math.floor(Math.random()*CONTENT.TRY.length)];
    //       buttonExample.appendChild(buttonExampleNotifications);

    var buttonCompile = document.createElement("button");
    buttonCompile.className = "console-button";
    buttonCompile.innerHTML = 'Compile (Shift+Enter)';
    buttonContainer.appendChild(buttonCompile);

    var logo = document.createElement("a");
    logo.className = 'console-logo';
    logo.href = 'https://metajs.org';
    logo.target = '_blank';
    logo.innerHTML = _DEFAULT.LOGO;
    container.appendChild(logo);

    var line = document.createElement('div');
    line.className = "console-line";
    container.appendChild(line);

    line.innerHTML = "{";

    var a1 = document.createElement('a');
    a1.href = "http://meta.camp";
    a1.target = '_blank';
    a1.innerHTML = "docs";
    line.appendChild(a1);

    line.innerHTML += "/";

    var a2 = document.createElement('a');
    a2.href = "http://meta.codes";
    a2.target = '_blank';
    a2.innerHTML = "codes";
    line.appendChild(a2);

    line.innerHTML += "}";

    var circle = document.createElement('div');
    circle.className = "console-circle";
    circle.style.background = 'linear-gradient(135deg, ' + _DEFAULT.COLOR.PRIMARY + ', ' + _DEFAULT.COLOR.SECONDARY + ')';
    circle.id = "paper";

    document.body.appendChild(circle);

    circle.addEventListener('click', function (event) {

      setMode();
    });

    function setMode(mode) {

      if (mode !== undefined) {
        scope.mode = mode;
      } else {
        scope.mode = scope.mode < 2 ? scope.mode + 1 : 0;
      }

      console.log('[Console] - Mode: ' + scope.mode);

      switch (scope.mode) {
        case 0:

          container.style.display = 'flex';
          line.style.display = 'flex';
          buttonContainer.style.display = 'none';
          codemirror.getWrapperElement().style.display = 'none';

          break;
        case 1:

          container.style.display = 'flex';
          line.style.display = 'none';
          buttonContainer.style.display = 'flex';
          codemirror.getWrapperElement().style.display = 'block';

          break;
        case 2:

          container.style.display = 'none';
          codemirror.getWrapperElement().style.display = 'none';

          break;
      }
    }

    function clear() {

      codemirror.setValue('');
      codemirror.focus();
      code = '';
    }

    function compile() {

      _metaClient.Space.clear();

      var code = codemirror.getValue();

      eval(code);
    }

    /*
      Events
     */

    addEventListener('click', function () {
      if (scope.started === false) {
        line.style.display = 'none';
        scope.started = true;
      }
    });

    buttonCompile.addEventListener('click', function (event) {

      event.preventDefault();

      compile();
    });

    buttonExample.addEventListener('click', function (event) {

      event.preventDefault();

      clear();

      example = example < _CONTENT2.default.EXAMPLES.length - 1 ? example + 1 : 0;

      code = _CONTENT2.default.EXAMPLES[example];

      codemirror.setValue(code);

      buttonExample.innerHTML = 'Example (' + (example + 1) + ')/' + _CONTENT2.default.EXAMPLES.length + ')';
    });

    buttonClear.addEventListener('click', function (event) {

      event.preventDefault();

      buttonClear.style.color = 'rgba(137,145,162,1)';
      buttonClear.style.backgroundColor = 'rgba(42,46,56,1)';

      _metaClient.Space.clear();

      codemirror.setValue('');
      codemirror.focus();
      code = '';
    });

    input.addEventListener('click', function (event) {
      input.value = input.value === defaultText ? "" : input.value;
    });

    _resize.addEventListener('click', function () {

      event.preventDefault();

      scope.resize();

      codemirror.refresh();
    });

    addEventListener('load', function (event) {

      event.preventDefault();

      codemirror.refresh();

      compile();
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
        codemirror.setValue('');
        code = '';
        codemirror.focus();
      }
    });

    addEventListener('keyup', function (event) {

      if (event.keyCode === 192) {
        event.preventDefault();
        _resize();
      }

      if (event.keyCode == 16) {
        keys["shift"] = false;
      } else if (event.keyCode == 13) {
        keys["ctrl"] = false;
      } else if (event.keyCode == 27) {
        keys["esc"] = false;
      }
    });
  }

  _createClass(Console, [{
    key: 'resize',
    value: function resize() {

      var currentHeight = codemirror.getWrapperElement().style.height;
      var nextHeight = void 0;

      switch (currentHeight) {
        case '0vh':case '0':
          nextHeight = '16vh';
          if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) nextHeight = 'calc(16vh - 182px)';
          _resize.style.cursor = 'n-resize';
          break;
        case '16vh':
          nextHeight = '92.5vh';
          if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) nextHeight = 'calc(92.5vh - 182px)';
          _resize.style.transform = _resize.style.transform == 'rotateZ(180deg)' ? 'rotateZ(0deg)' : 'rotateZ(180deg)';
          _resize.style.cursor = 's-resize';
          break;
        case '92.5vh':
          nextHeight = '0vh';
          _resize.style.transform = _resize.style.transform == 'rotateZ(180deg)' ? 'rotateZ(0deg)' : 'rotateZ(180deg)';
          _resize.style.cursor = 'n-resize';
          break;
      }

      codemirror.getWrapperElement().style.height = nextHeight;
      console.log('[Console] - Resize');
    }
  }]);

  return Console;
}();

exports.default = Console;