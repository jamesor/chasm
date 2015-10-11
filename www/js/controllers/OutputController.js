'use strict';

class OutputController {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.view = new OutputView();
    eventBus.subscribe(Events.OUTPUT_WRITE, this.onWrite, this);
    eventBus.subscribe(Events.OUTPUT_WRITELN, this.onWriteLine, this);
    eventBus.subscribe(Events.OUTPUT_CLEAR, this.onClear, this);
  }
  onWrite(data) {
    this.view.write(data);
  }
  onWriteLine(data) {
    this.view.write('<p>'+data+'</p>');
  }
  onClear() {
    this.view.clear();
  }
  destroy() {
    this.eventBus.unsubscribe(Events.OUTPUT_WRITE, this.onWrite, this);
    this.eventBus.unsubscribe(Events.OUTPUT_WRITELN, this.onWriteLine, this);
    this.eventBus.unsubscribe(Events.OUTPUT_CLEAR, this.onClear, this);
  }
}