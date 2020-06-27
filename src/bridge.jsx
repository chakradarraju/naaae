
export function checkPort(port) {
  return new Promise(res => {
    window.ipcRenderer.send('checkPort', {port});
    window.ipcRenderer.once('checkReply' + port, (event, response) => {
      res(response.result);
    });  
  })
}

export function start(command, workingDirectory, port) {
  return new Promise(res => {
    console.log('sending start', command, workingDirectory);
    res(window.ipcRenderer.sendSync('startProcess', {command, workingDirectory}));
  });
}

export function stop(port) {
  return new Promise(res => {
    window.ipcRenderer.send('stopProcess', {port});
    window.ipcRenderer.once('stopProcess' + port, (event, response) => {
      res(response);
    });
  });
}

export function quit() {
  console.log('Sending quit');
  window.ipcRenderer.send('quit');
}