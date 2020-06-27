import React from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Fab } from '@material-ui/core';
import ServiceRow from './ServiceRow';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

const home = '/home/chakradarraju';

function ServicesTable(props) {

  return (<div style={{padding: '10px'}}>
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{width: '150px'}}>Actions</TableCell>
            <TableCell>Name</TableCell>
            <TableCell style={{width: '100px'}}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.services.map((service, i) => <ServiceRow 
            index={i}
            key={i} />)}
        </TableBody>
      </Table>
    </TableContainer>
    <Link to="/services/new">
      <Fab color="primary" style={{position: 'absolute', bottom: '20px', right: '20px'}}>
        <AddIcon />
      </Fab>
    </Link>
  </div>);
}

export default connect(a => a, {})(ServicesTable);