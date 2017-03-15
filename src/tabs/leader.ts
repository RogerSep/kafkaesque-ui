import { Observable } from 'rx'
import * as R from 'ramda';

function leader(heartbeat: Observable<any>, globalContext: any): (f: () => void) => void {

  let l: any = null;

  const tabId: string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
      .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      } )

  function runIfLeader() {
    const leader = globalContext.localStorage.getItem('kafkaesque-ui.leader');

    if (R.either(R.equals(tabId), R.either(R.isNil, R.isEmpty))(leader)) {
      globalContext.localStorage.setItem('kafkaesque-ui.leader', tabId);
      l()
    }
  }

  Observable.fromEvent(globalContext, 'unload').subscribe( () => {
    if (globalContext.localStorage.getItem('kafkaesque-ui.leader') == tabId) {
      globalContext.localStorage.setItem('kafkaesque-ui.leader', '')
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
