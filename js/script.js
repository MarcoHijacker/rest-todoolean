// Esercizio To-Do List JS

// Area init

function init() {
  getTodoList();
  addTodoBtnListener();
  delTodoListener();
}

$(document).ready(init);

// Area funzioni

// Ottiene la lista dei ToDo tramite API
function getTodoList() {
  $.ajax({
    url: 'http://157.230.17.132:3011/todos',
    method: 'GET',
    success: function(data) {
      for (var i = 0; i < data.length; i++) {
        $('#todolist').append(`<li class="item" data-id="${data[i].id}">${data[i].text} <i class="far fa-trash-alt"></i></li>`);
      }
    },
    error: function(err) {
      console.log('err', err);
    }
  });
}

// Listener sul click al bottone Add ToDo
function addTodoBtnListener() {
  $('#todobtn').click(addNewTodo);
}

// Aggiunge un nuovo ToDo prendendo l'input #todotext
function addNewTodo() {
  var input = $('#todotext');
  var value = input.val();

  $.ajax({
    url: 'http://157.230.17.132:3011/todos',
    method: 'POST',
    data: {
      'text': value
    },
    success: function(data) {
      $('#todolist').text('');
      input.val('');
      getTodoList();
    },
    error: function(err) {
      console.log('err', err);
    }
  });
}

// Listener sul click all'icona di cancellazione (trash)
function delTodoListener() {
  $(document).on('click', '.item', deleteTodo);
}

// Elimina un ToDo al click sul relativo logo Trash
function deleteTodo() {
  var item = $(this);
  var todoid = item.data('id');

  $.ajax({
    url: `http://157.230.17.132:3011/todos/${todoid}`,
    method: 'DELETE',
    success: function(data) {
      $('#todolist').text('');
      getTodoList();
    },
    error: function(err) {
      console.log(err);
    }
  });
}
