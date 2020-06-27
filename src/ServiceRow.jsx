import React, { useState, useEffect } from 'react';
import { TableRow, TableCell, IconButton, CircularProgress } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from './actions';
import { start, stop, checkPort } from './bridge';

function ServiceRow(props) {
  const [service, setService] = useState(null);
  const [waitingForReadyChange, setWaitingForReadyChange] = useState(false);

  useEffect(() => {
    if (!service) return;
    checkPort(service.port)
      .then(ready => {
        if (service.ready !== ready) props.updateService(props.index, {ready})
      })
      .catch(console.error);
  }, [props.index, service]);

  useEffect(() => {
    if (!Number.isInteger(props.index) || props.index < 0 || props.index >= props.services.length) {
      console.error('Som ding wong, we should not see this');
      return;
    }
    setService(props.services[props.index]);
  }, [props.services, props.index]);

  function onRemove() {
    const sure = window.confirm('Are you sure, you want to delete ' + service.name + '?');
    if (sure) props.removeService(props.index);
  }

  function onStop() {
    const sure = window.confirm('Are you sure, you want to stop ' + service.name + '?');
    if (sure && service) {
      stop(service.port);
      waitForReadyChangeTo(false);
    }
  }

  function waitForReadyChangeTo(expected, setWaitingState) {
    setWaitingForReadyChange(true);
    setTimeout(() => {
      checkPort(service.port).then(ready => {
        if (ready !== expected) {
          waitForReadyChangeTo(expected);
          return;
        }
        props.updateService(props.index, {ready});
        setWaitingForReadyChange(false);
      })
    }, 3000);
  }

  function onStart() {
    console.log('starting', service);
    if (service) {
      start(service.command, service.workingDirectory, service.port);
      waitForReadyChangeTo(true);
    }
  }

  function buttonForState() {
    if (waitingForReadyChange) return <IconButton><CircularProgress size={24} /></IconButton>;
    if (service && service.ready) return <IconButton onClick={onStop}><CloseIcon /></IconButton>;
    return <IconButton onClick={onStart}><PlayArrowIcon /></IconButton>;
  }

  function status() {
    if (waitingForReadyChange) return "Waiting...";
    if (service && service.ready) return "Ready";
    return "Not running";
  }

  return (<TableRow>
    <TableCell>
      {buttonForState()}
      <Link to={`/services/edit/${props.index}`}>
        <IconButton>
          <EditIcon />
        </IconButton>
      </Link>
      <IconButton onClick={onRemove}>
        <DeleteIcon />
      </IconButton>
    </TableCell>
    <TableCell>
      {service && service.name}
    </TableCell>
    <TableCell>
      {status()}
    </TableCell>
  </TableRow>);
}

export default connect(a => a, actions)(ServiceRow);