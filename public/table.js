var socket = io.connect(`ws://${process.env.IP}:4000`);
let $list = $('#list');

const clearChat = () => {
  $list.empty();
}

socket.on('newMessage', (message) => {
  let rgx = /(?<time>\d{2}:\d{2}:\d{2})(?:.+].+)(?<text>(@To|@From).+)/;
  const exec = rgx.exec(message);
  if (!exec?.groups) {
    return;
  }
  const { groups: { time, text }} = exec;
  let $element = $('<a>', {
    'class': 'list-group-item list-group-item-action',
  });
  $element.append($('<div>', {
    'class': 'time',
    html: time,
  })).css({'display': 'flex', 'gap': '1rem'});

  const isBuy = /Hi, I would like to buy your.+/.test(text);

  $element.append($('<div>', {
    'class': isBuy ? 'buy' : 'text',
    html: text,
  }));
  $("#list").scrollTop($('#list')[0].scrollHeight);
  console.log(text);
  $element.appendTo($list);
 
});