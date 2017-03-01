import { Observable } from 'rx'
import * as R from 'ramda';

function leader(heartbeat: Observable<any>, globalContext: any, storage: any): (f: () => void) => void {

  let l: () => void = null;

  const tabId: string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
      .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      } )

  function runIfLeader() {
    const leader = storage.getItem('kafkaesque-ui.leader');

    if (R.either(R.equals(tabId), R.either(R.isNil, R.isEmpty))(leader)) {
      storage.setItem('kafkaesque-ui.leader', tabId);
      l()
    }
  }

  Observable.fromEvent(globalContext, 'unload').subscribe( () => {
    if (storage.getItem('kafkaesque-ui.leader') == tabId) {
      storage.setItem('kafkaesque-ui.leader', '')
    }
  } )

  return function(f: () => void): void {
    if (l == null) {
      l = R.once(f);
      heartbeat.subscribe( runIfLeader );
      runIfLeader()
    }
  }
}

export { leader };
