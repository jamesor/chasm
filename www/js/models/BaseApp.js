'use strict';

class BaseApp {
  constructor() {
    this.topics = new Map();
    this.commands = new Map();
  }

  // Pub/Sub Event Bus
  registerCommand(topic, command) {
    if (!this.topics.has(topic)) this.topics.set(topic, []);
    this.topics.get(topic).push({cmd: command});
  }
  
  subscribe(topic, listener, context) {
    if (!this.topics.has(topic)) this.topics.set(topic, []);
    this.topics.get(topic).push({fn: listener, cxt: context});
  }

  unsubscribe(topic, listener, context) {
    if (this.topics.has(topic) && this.topics.get(topic).length > 0) {
      // todo
    }
  }

  publish(topic, data) {
    if (this.topics.has(topic) && this.topics.get(topic).length > 0) {
      this.topics.get(topic).forEach(function(listener) {
        if (listener.cmd) {
          new listener.cmd(data).execute();
        } else if (listener.cxt) {
          listener.fn.call(listener.cxt, data);
        } else {
          listener.fn(data);
        }
      });
    }
  }
}