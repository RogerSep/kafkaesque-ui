import { Observable } from "rx"
import * as R from "ramda";

let l: () => void = null;

const tabId: string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  .replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });

function setUpLeader() {
  localStorage.setItem("kafkaesque-ui.leader", tabId);
  l()
}

function runIfLeader() {
  const leader = localStorage.getItem("kafkaesque-ui.leader");

  if (R.either(R.equals(tabId), R.either(R.isNil, R.isEmpty))(leader)) {
    setUpLeader();
  }
}

function leader(f: () => void) {
  if (l == null) {
    l = R.once(f);
  }
  runIfLeader()
}

Observable.interval(1000).subscribe( () => {
  const leader = localStorage.getItem("kafkaesque-ui.leader");
  if (R.either(R.isNil, R.isEmpty)(leader)) {
    setUpLeader();
  }
} );

Observable.fromEvent(window, "unload").subscribe( () => {
  if (localStorage.getItem("kafkaesque-ui.leader") == tabId) {
    localStorage.setItem("kafkaesque-ui.leader", "")
  }
} );

export { leader };