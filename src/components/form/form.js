let open = document.querySelector('.js-open-form');
let form = document.querySelector('.form__main');
let load = document.querySelector('.load');
let inputs = document.querySelectorAll('.input');
let send = document.querySelector('.js-send');
let table = document.querySelector('.form__table');
let err = document.querySelector('.form__err-block');
let restart = document.querySelector('.js-restart');
let closeForm = document.querySelector('.js-close-form');
let closeErr = document.querySelector('.js-close-err');
let values = {};
let success = false;

open.onclick = function() {
  closeBlock(open);
  setTimeout(function() {
    load.classList.remove('d-none');
  }, 200);

  setTimeout(function() {
    load.classList.add('d-none');
    form.classList.remove('fade');
    form.classList.add('show');
  }, 5000)
};

jQuery(function($){
  $(".input[name='phone']").mask("(999) 999-9999", {
    completed: function() {
      this.addClass('input-success');
      if (document.querySelectorAll('.input-success').length === inputs.length) {
        send.classList.remove('disabled');
      }
      values.phone = this.val();
    }
  });
});

let regular = {
  name: '^[a-zA-Z][a-zA-Z0-9-_\\.]{1,20}$',
  email: '^([a-z0-9_-]+\\.)*[a-z0-9_-]+@[a-z0-9_-]+(\\.[a-z0-9_-]+)*\\.[a-z]{2,6}$'
};

for (let i = 0; i < inputs.length; i++) {
  inputs[i].oninput = function() {
    let name = this.name;
    if (name !== 'phone') {
      if (this.value.match(regular[name])) {
        this.classList.remove('input-err');
        this.classList.add('input-success');
      }
      else {
        this.classList.remove('input-success');
        this.classList.add('input-err');
      }
    }
    success = document.querySelectorAll('.input-success').length === inputs.length;
    values[name] = this.value;
    console.log(values);
  }
}

send.onclick = function(e) {
  e.preventDefault();
  closeBlock(form);
  if (success) {
    openBlock(table);
    for (let i in values) {
      let name = `.res-${i}`;
      let item = document.querySelector(name);
      item.innerHTML = values[i];
    }
  }
  else {
    openBlock(err);
  }
};

closeForm.onclick = function() {
  closeBlock(form);
  openBlock(open);
};

closeErr.onclick = function() {
  closeBlock(err);
  openBlock(form);
};

restart.onclick = function() {
  let show = document.querySelector('.show');
  show.classList.remove('show');
  show.classList.add('fade');
  for (let i = 0; i < inputs.length; i++) {
    let input = inputs[i];
    input.value = '';
    input.classList.remove('input-success', 'input-err');
    values = {};
  }
  setTimeout(function() {
    open.classList.add('show');
  }, 300);
};

function closeBlock(el) {
  el.classList.add('fade');
  el.classList.remove('show');
}

function openBlock(el) {
  setTimeout(function() {
    el.classList.remove('fade');
    el.classList.add('show');
  }, 300);
}
