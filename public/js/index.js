function init() {

  var serverBaseUrl = document.domain;
  socket = io.connect(serverBaseUrl);
  var sessionId = '';

  function updateParticipants(participants) {
   $('#participants').html('');
   for (var i = 0; i < participants.length; i++) {
      $('#participants').append('<span id="' + participants[i].id + '">' +
        participants[i].name + ' ' + (participants[i].id === sessionId ? '(You)' : '') + '<br /></span>');
    } 
  }

  socket.on('connect', function () {
    sessionId = socket.io.engine.id;
    socket.emit('newUser', {id: sessionId, name: $('#name').val()});
  });

  socket.on('newConnection', function (data) {    
    updateParticipants(data.participants);
    pointsDrawn = data.pointsDrawn
    redraw();
  });

  socket.on('redrawFrame', function (data) { 
      combinePointArrays(data)
      redraw();
  });

  socket.on('userDisconnected', function(data) {
    $('#' + data.id).remove();
  });

  socket.on('nameChanged', function (data) {
    $('#' + data.id).html(data.name + ' ' + (data.id === sessionId ? '(You)' : '') + '<br />');
  });

  socket.on('incomingMessage', function (data) {
    var message = data.message;
    var name = data.name;
    $('#messages').prepend('<b>' + name + '</b><br />' + message + '<hr />');
  });

  socket.on('error', function (reason) {
    console.log('Unable to connect to server', reason);
  });

  function sendMessage() {
    var outgoingMessage = $('#outgoingMessage').val();
    var name = $('#name').val();
    $.ajax({
      url:  '/message',
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({message: outgoingMessage, name: name})
    });
  }

  function outgoingMessageKeyDown(event) {
    if (event.which == 13) {
      event.preventDefault();
      if ($('#outgoingMessage').val().trim().length <= 0) {
        return;
      }
      sendMessage();
      $('#outgoingMessage').val('');
    }
  }

  function outgoingMessageKeyUp() {
    var outgoingMessageValue = $('#outgoingMessage').val();
    $('#send').attr('disabled', (outgoingMessageValue.trim()).length > 0 ? false : true);
  }

  function nameFocusOut() {
    var name = $('#name').val();
    socket.emit('nameChange', {id: sessionId, name: name});
  }

  $('#outgoingMessage').on('keydown', outgoingMessageKeyDown);
  $('#outgoingMessage').on('keyup', outgoingMessageKeyUp);
  $('#name').on('focusout', nameFocusOut);
  $('#send').on('click', sendMessage);

}

$(document).on('ready', init);


function combinePointArrays(data) {
  var regularPointHolder = []
  var undoPointHolder = []
  _.each(pointsDrawn, function(point){ 
    if (point["stored?"] = false) {
      regularPointHolder.push(point)
    }
  });
   _.each(undoPointStore, function(point){ 
    if (point["stored?"] = false) {
      undoPointHolder.push(point)
    }
  });
  pointsDrawn = data.pointsDrawn
  undoPointStore = data.undoPointStore
  _.each(regularPointHolder, function(point){ 
    pointsDrawn.push(point)
  });
   _.each(undoPointHolder, function(point){ 
      undopointStore.push(point)
  });
}