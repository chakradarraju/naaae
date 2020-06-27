const child_process = require('child_process');
const findProcess = require('find-process');

class ProcessManager {
  constructor() {
    this.procs = {};
  }

  start(cwd, cmd) {
    const proc = child_process.exec(cmd, {cwd});
    this.procs[proc.pid] = proc;
    return proc.pid;
  }

  stop(pid) {
    const proc = this.procs[pid];
    if (proc) {
      proc.kill();
      return;
    } 
  }

  kill(pid) {
    child_process.exec('kill ' + pid);
    console.log('Killed ' + pid);
  }

  async stopProcessAtPort(port) {
    const processes = await findProcess('port', port).catch(console.error);
    if (!processes) return;
    processes.forEach(p => this.kill(p.pid))
    return processes && processes.length;
  }

  async checkPort(port) {
    const processes = await findProcess('port', port).catch(console.error);
    return processes && !!processes.length;
  }
}

module.exports = new ProcessManager();