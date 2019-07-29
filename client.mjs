import * as alt from 'alt';

let loaded = false;
let view = null;

function viewInit() {
  loaded = true;
  alt.emitServer('memGraphStatus', true);
}

alt.onServer('graphUpdate', (data) => {
  if(view && loaded)
  view.emit('graphUpdate', data);
})

alt.on('keyup', (key) => {
   // list of key codes https://docs.microsoft.com/en-us/windows/desktop/inputdev/virtual-key-codes
  if (key == 0x74 && !loaded) { //f5
    view = new alt.WebView("http://resources/memory-usage/html/index.html");
    view.on('graphReady',viewInit);
  }
  else if (loaded && (key == 0x1B || key == 0x74)) {
    loaded = false;
    alt.emitServer('memGraphStatus', false);
    view.destroy();
  }
})
