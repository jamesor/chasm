'use strict';

class FooCommand {
  execute(data) {
    if (data.length === 1) {
      chasm.publish(Events.OUTPUT_WRITELN, 'Well, FOO, BAR, and BLETCH to you too!');
      return;
    }

    chasm.publish(Events.OUTPUT_WRITELN, 'I only understood you as far as wanting to foo.');
  }
}