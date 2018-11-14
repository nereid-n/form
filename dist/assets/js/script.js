'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Shared = function Shared() {
  _classCallCheck(this, Shared);
};

var open = document.querySelector('.js-open-form');
var form = document.querySelector('.form__main');
var load = document.querySelector('.load');
var inputs = document.querySelectorAll('.input');
var send = document.querySelector('.js-send');
var table = document.querySelector('.form__table');
var err = document.querySelector('.form__err-block');
var restart = document.querySelector('.js-restart');
var closeForm = document.querySelector('.js-close-form');
var closeErr = document.querySelector('.js-close-err');
var values = {};
var success = false;

open.onclick = function () {
  closeBlock(open);
  setTimeout(function () {
    load.classList.remove('d-none');
  }, 200);

  setTimeout(function () {
    load.classList.add('d-none');
    form.classList.remove('fade');
    form.classList.add('show');
  }, 5000);
};

jQuery(function ($) {
  $(".input[name='phone']").mask("(999) 999-9999", {
    completed: function completed() {
      this.addClass('input-success');
      if (document.querySelectorAll('.input-success').length === inputs.length) {
        send.classList.remove('disabled');
      }
      values.phone = this.val();
    }
  });
});

var regular = {
  name: '^[а-яА-ЯёЁa-zA-Z0-9]{1,40}$',
  email: '^([a-z0-9_-]+\\.)*[a-z0-9_-]+@[a-z0-9_-]+(\\.[a-z0-9_-]+)*\\.[a-z]{2,6}$'
};

for (var i = 0; i < inputs.length; i++) {
  inputs[i].oninput = function () {
    var name = this.name;
    if (name !== 'phone') {
      if (this.value.match(regular[name])) {
        this.classList.remove('input-err');
        this.classList.add('input-success');
      } else {
        this.classList.remove('input-success');
        this.classList.add('input-err');
      }
    }
    success = document.querySelectorAll('.input-success').length === inputs.length;
    values[name] = this.value;
    console.log(values);
  };
}

send.onclick = function (e) {
  e.preventDefault();
  closeBlock(form);
  if (success) {
    openBlock(table);
    for (var _i in values) {
      var name = '.res-' + _i;
      var item = document.querySelector(name);
      item.innerHTML = values[_i];
    }
  } else {
    openBlock(err);
  }
};

closeForm.onclick = function () {
  closeBlock(form);
  openBlock(open);
};

closeErr.onclick = function () {
  closeBlock(err);
  openBlock(form);
};

restart.onclick = function () {
  var show = document.querySelector('.show');
  show.classList.remove('show');
  show.classList.add('fade');
  for (var _i2 = 0; _i2 < inputs.length; _i2++) {
    var input = inputs[_i2];
    input.value = '';
    input.classList.remove('input-success', 'input-err');
    values = {};
  }
  setTimeout(function () {
    open.classList.add('show');
  }, 300);
};

function closeBlock(el) {
  el.classList.add('fade');
  el.classList.remove('show');
}

function openBlock(el) {
  setTimeout(function () {
    el.classList.remove('fade');
    el.classList.add('show');
  }, 300);
}
//# sourceMappingURL=script.js.map
