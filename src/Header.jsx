import React, { useState } from 'react';
import { Toolbar, AppBar, Typography, IconButton, Link, Menu, MenuItem } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import SyncIcon from '@material-ui/icons/Sync';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as actions from './actions';
import { connect } from 'react-redux';
import { checkPort, quit } from './bridge';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function Header(props) {

  const [anchorEl, setAnchorEl] = useState(null);

  function refreshAllReady(e) {
    props.services.forEach((service, index) => {
      checkPort(service.port).then(ready => {
        if (service.ready !== ready) props.updateService(index, {ready});
      });
    });
    closeMenu(e);
  }

  function closeMenu(e) {
    setAnchorEl(null);
    e.stopPropagation();
  }

  return (<>
    <AppBar position="static" style={{marginBottom: '10px', color: 'white'}}>
      <Toolbar>
        <span style={{flex: '1 1 0', WebkitAppRegion: 'drag'}}>
          <Typography variant="h6">Naaae</Typography>
        </span>
        <span style={{flex: '1 0 1'}}>
          <IconButton onClick={() => alert('Not implemented')} title="Search (/)">
            <SearchIcon style={{color: 'white'}} />
          </IconButton>
          <IconButton onClick={e => setAnchorEl(e.currentTarget)} title="Menu">
            <MoreVertIcon style={{color: 'white'}} />
            <Menu open={Boolean(anchorEl)} onClose={closeMenu} anchorEl={anchorEl}>
              <MenuItem onClick={closeMenu}>
                <Link to="/settings" title="Settings" style={{textDecoration: 'none', color: 'black'}}>
                  <SettingsIcon /> Settings
                </Link>
              </MenuItem>
              <MenuItem onClick={refreshAllReady}>
                <SyncIcon /> Refresh
              </MenuItem>
              <MenuItem onClick={quit}>
                <ExitToAppIcon /> Exit
              </MenuItem>
            </Menu>
          </IconButton>
        </span>
      </Toolbar>
    </AppBar>
  </>);
}

export default connect(a => a, actions)(Header);