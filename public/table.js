const socket = io.connect(`ws://${window.location.host}`);
let $list = $('#list');

const clearChat = () => {
  $list.empty();
};

var autoClearInterval;

const autoClear = () => {
  const value = $('#auto-clear').val();
  if (value) {
    if (autoClearInterval) {
      clearInterval(autoClearInterval);
    }
    const minutes = +value * 1000 * 60;
    autoClearInterval = setInterval(() => {
      $list.empty();
    }, minutes)
  }
  return;
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

  const isBuy = /^@From|To.+Hi, I would|I'd like to buy your.+/.test(text);

  $element.append($('<div>', {
    'class': isBuy ? 'buy' : 'text',
    html: text,
  }));
  $("#list").scrollTop($('#list')[0].scrollHeight);
  console.log(text);
  $element.appendTo($list);
 
});