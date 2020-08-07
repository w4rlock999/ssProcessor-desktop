import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CloudIcon from '@material-ui/icons/Cloud'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import backgroundImageFile from './bromo1.jpg';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Electron = window.require('electron');

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://dsarot.com/">
        dsarot technology 
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${backgroundImageFile})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(6, 0, 1),
    // marginTop: '15%'
  },
}));

export default function SignInSide() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <CloudIcon />
          </Avatar>
          <Typography style={{marginBottom: '70px'}}component="h1" variant="h5">
            OneProcessor
          </Typography>
          <form className={classes.form} noValidate>
            <div>
              <TextField style={{ width: '70%'}}
                variant="outlined"
                margin="normal"
                id="projectfolder"
                label="Project Folder"
                name="projectfolder"
                autoFocus
              />
              <Button style={{ margin: '25px 0px 25px 23px',
                              maxWidth: '80px', maxHeight: '50px', 
                              minWidth: '30px', minHeight: '30px'}} 
                variant="contained" 
                color="primary"
              >
                Browse
              </Button>
            </div>
            <div style={{display: 'inlineBlock' }}> 
              <TextField style={{ width: '70%'}}
                variant="outlined"
                margin="normal"
                name="ppkfolder"
                label="Trajectory Folder"
                type="ppkfolder"
                id="password"
                autoComplete="current-password"
              />
              <Button style={{ margin: '25px 0px 25px 23px',
                              maxWidth: '80px', maxHeight: '50px', 
                              minWidth: '30px', minHeight: '30px'}} 
                variant="contained"
                color="primary"
              >
                Browse
              </Button>
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Process
            </Button>
            
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
