import React, {useState} from 'react';
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
import LinearProgress from '@material-ui/core/LinearProgress'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import backgroundImageFile from './bromo1.jpg';
import dsarotBlack from './dsarotblack.png';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FolderIcon from '@material-ui/icons/FolderOpen';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import { orange, grey } from '@material-ui/core/colors';

const Electron = window.require('electron');

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

const oneTheme = createMuiTheme({
  palette: {
    secondary: {
      main: orange[500],
    },
    primary: {
      main: orange[500],
    },
  },
});


function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Processing Finished !"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your 3D map is done, click folder icon below to open the 3D map folder
          </DialogContentText>
          <br/>
          <br/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            <FolderIcon/>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

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

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 28,
    borderRadius: 2,
  },
  colorPrimary: {
    backgroundColor: '#ba000d',
  },
  bar: {
    borderRadius: 2,
    backgroundColor: '#f44336',
  },
}))(LinearProgress);

function InputDialog(props) {
  const classes = useStyles();
  var pathToProjectBuff = "";
  var pathToTrajectBuff = "";
  const [pathToProject, setPathToProject] = useState("");
  const [pathToTraject, setPathToTraject] = useState("");
  
  const projectButtonOnClickHandler = () => {
    pathToProjectBuff = Electron.remote.dialog.showOpenDialogSync({ properties: ['openDirectory'] });
    setPathToProject(pathToProjectBuff);
  }
  const trajectButtonOnClickHandler = () => {
    pathToTrajectBuff = Electron.remote.dialog.showOpenDialogSync({ properties: ['openDirectory'] });
    setPathToTraject(pathToTrajectBuff);
  }

  return(
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <CloudIcon />
      </Avatar>
      <Typography style={{marginBottom: '70px'}} component="h1" variant="h5">
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
            value={pathToProject}
          />
          <Button style={{ margin: '25px 0px 25px 23px',
                          maxWidth: '80px', maxHeight: '50px', 
                          minWidth: '30px', minHeight: '30px'}} 
            variant="contained" 
            color="primary"
            onClick={projectButtonOnClickHandler}
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
            value = {pathToTraject}
          />
          <Button style={{ margin: '25px 0px 25px 23px',
                          maxWidth: '80px', maxHeight: '50px', 
                          minWidth: '30px', minHeight: '30px'}} 
            variant="contained"
            color="primary"
            onClick={trajectButtonOnClickHandler}
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
          onClick={props.processOnClickHandler}
        >
          Process
        </Button>
        
        <Box mt={5}>
          <Copyright />
        </Box>
      </form>
    </div>
  );
}

function ProcessDialog(props) {
  const classes = useStyles();
  const progress = 50;

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <CloudIcon />
      </Avatar>
      <Typography style={{marginBottom: '70px'}} component="h1" variant="h5">
        OneProcessor
      </Typography>
      
      <div style={{height: "172px", marginTop: "8px"}}>
        <Typography style={{margin: '40px'}} component="h1" variant="h5">
          Processing your 3D map
        </Typography>
        <Typography style={{marginTop: '10px', textAlign: 'center'}} >
          412 / 2134
        </Typography>
        <Typography style={{textAlign: 'center'}} >
          2.6 Frame/s
        </Typography>
        
      </div>
      <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.submit}
          style={{padding:4, paddingLeft:2, paddingRight: 2}}
        >
          <BorderLinearProgress style={{width:"100%"}} variant="determinate" value={30} />
          <Typography style={{marginLeft: '8px', marginRight: '5px', textAlign: 'center'}} >
            30%
        </Typography>
        </Button>
      <AlertDialog/>
      <Button
          type="submit"
          variant="contained"
          color="secondary"
          onClick={props.backOnClickHandler}
      >
        BACK
      </Button>
      {/* <BorderLinearProgress style={{width:"100%"}} variant="determinate" value={50} /> */}
      <Box mt={5}>
        <Copyright />
      </Box>
    </div>
  )
}

function Main() {
  const classes = useStyles();

  const [processState, setProcessState] = React.useState("waiting")

  const processOnClickHandler = () => {
    setProcessState("processing")
  }

  const backOnClickHandler = () => {
    setProcessState("waiting");
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image}>
        <img style={{marginTop:90, display:'block', marginLeft:'auto', marginRight:'auto'}} 
            src={dsarotBlack} alt="dsarotlogo" width="150px"/>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <ThemeProvider theme={oneTheme}>
          {processState == "waiting" && <InputDialog processOnClickHandler={processOnClickHandler} />}
          {processState == "processing" && <ProcessDialog backOnClickHandler={backOnClickHandler} />}
        </ThemeProvider>
      </Grid>
    </Grid>
  );
}

function App() {
  return (
    <div className="App">
      <Main/>
    </div>
  );
}

export default App;
