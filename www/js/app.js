var app = {
  topics: {},

  subscribe: function(topic, listener, context) {
    if(!this.topics[topic]) this.topics[topic] = [];
    // todo, ensure not already listening
    this.topics[topic].push({fn: listener, cxt: context});
  },

  unsubscribe: function(topic, listener, context) {
    if(!this.topics[topic] || this.topics[topic].length < 1) return;
    // todo, remove listener
  },

  publish: function(topic, data) {
    if(!this.topics[topic] || this.topics[topic].length < 1) return;
    this.topics[topic].forEach(function(listener) {
      if (listener.cxt) {
        listener.fn.call(listener.cxt, data);
      } else {
        listener.fn(data);
      }
    });
  }
};

var writeInput = function(str) {
  $('#response').html(str.replace(/ /g, '&nbsp;'));
}

var writeOutput = function(str) {
  $('#output').append('<p>'+str+'</p>');
  $outText[0].scrollTop = $outText[0].scrollHeight;
}

app.subscribe('writeInput', writeInput);
app.subscribe('writeOutput', writeOutput);