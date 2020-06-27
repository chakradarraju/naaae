import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Table, TableRow, TableCell, Input, Button, TableBody } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import * as actions from './actions';
import { useEffect } from 'react';

function ServiceEditor(props) {
  const history = useHistory();
  const [name, setName] = useState('');
  const [workingDirectory, setWorkingDirectory] = useState('');
  const [command, setCommand] = useState('');
  const [port, setPort] = useState(0);
  const [index, setIndex] = useState(null);

  useEffect(() => {
    const indexStr = props.match.params.index || null;
    if (indexStr === null) return;
    const idx = parseInt(indexStr);
    if (idx < 0 || idx >= props.services.length) return;
    setIndex(idx);
    const service = props.services[idx];
    if (service.name) setName(service.name);
    if (service.workingDirectory) setWorkingDirectory(service.workingDirectory);
    if (service.command) setCommand(service.command);
    if (service.port) setPort(service.port);
  }, [props.services]);

  function onSave() {
    console.log(props);
    const service = { name, workingDirectory, command, port };
    if (index) props.updateService(index, service);
    else props.addService(service);
    history.goBack();
  }

  function title() {
    if (props.match.params.index) return 'Editing ' + name;
    else return 'Adding new service';
  }

  return (<>
    <h3 style={{textAlign: 'center'}}>{title()}</h3>
    <Table size="small">
      <TableBody>
        <TableRow>
          <TableCell align="right">Name</TableCell>
          <TableCell><Input autoFocus value={name} onChange={e => setName(e.target.value)} fullWidth={true} /></TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="right">Working directory</TableCell>
          <TableCell><Input value={workingDirectory} onChange={e => setWorkingDirectory(e.target.value)} fullWidth={true} /></TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="right">Command</TableCell>
          <TableCell><Input value={command} onChange={e => setCommand(e.target.value)} fullWidth={true} /></TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="right">Port</TableCell>
          <TableCell><Input value={port} onChange={e => setPort(e.target.value)} fullWidth={true} type="number" /></TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="right">
            <Button variant="contained" onClick={() => history.goBack()}>Cancel</Button>
          </TableCell>
          <TableCell>
            <Button variant="contained" color="primary" onClick={onSave}>Save</Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </>);
}

export default connect(a => a, actions)(ServiceEditor);