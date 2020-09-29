import React, {useState, useEffect} from 'react';
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
import CloudIcon from '@material-ui/icons/Cloud';
import CheckIcon from '@material-ui/icons/DoneSharp' ;
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import backgroundImageFile from './bromo1.jpg';
import ssIconFile from './512.png';
import dsarotBlack from './dsarotblack.png';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FolderIcon from '@material-ui/icons/FolderOpen';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import { orange, grey, red } from '@material-ui/core/colors';
import {CSSTransition, SwitchTransition} from 'react-transition-group';
import './App.css';
import './font.css';

const Electron = window.require('electron');
const ipcRenderer = Electron.ipcRenderer;

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
}));

const oneTheme = createMuiTheme({
  palette: {
    secondary: {
      main: '#b7b946',
    },
    primary: {
      main: '#003349',
    },
  },
  typography: {
    fontFamily: "montserrat-regular, Arial",
  },
});

function CancelDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        style={{float: "right"}}
        disableFocusRipple
        disableRipple
        disableTouchRipple
        onClick={props.handleClickOpen}>
        Cancel  
      </Button>
      <Dialog
        open={props.appear}
        onClose={handleClose}
        aria-labelledby="cancel-dialog-title"
        aria-describedby="cancel-dialog-description"
        PaperProps={{
          style: {borderRadius: 0}
        }}
      >
        <DialogTitle>
          Cancel Process ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to cancel the process ? All procesed data will NOT be deleted.  
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.noOnClickHandler}>No</Button>
          <Button variant="contained" 
                  disableElevation 
                  color="secondary"
                  style={{borderRadius: 0}}
                  onClick={props.yesOnClickHandler}
          >
          Yes
        </Button>
        </DialogActions>
      </Dialog> 
             
    </div>
  );
};

function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onOpenFolderHandler = () => {
    props.onOpenFolderHandler();
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={props.appear}
        onClose={props.onCloseHandler}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {borderRadius: 0}
        }}
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
          <Button onClick={onOpenFolderHandler} color="primary" style={{backgroundColor: "lightgrey", borderRadius: 0}}>
            <FolderIcon/>
            <Typography variant="body2" style={{marginLeft: 10}}>
              Open Folder
            </Typography>
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
      <Link color="inherit" >
        dsarot technology 
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function TitleComponent() {
  return (
    <div style={{margin: 'auto', marginBottom: '50px'}}>
        <div>
          <img style={{marginRight:7, display:'inline'}} 
                src={ssIconFile} alt="sslogo" width="60px"/>
          <Typography variant="h2" style={{display:'inline'}}>
            Processor
          </Typography>
        </div>
        <div style={{marginLeft: 10}} >
          <Typography style={{display: 'inline'}} variant="subtitle1">
            by
          </Typography>
          {/* <div style={{display: 'inline', width: 50, height: 20, margin: 0}}>
            
          </div> */}
          <img style={{marginLeft: 8, marginRight:'auto'}} 
                src={dsarotBlack} alt="dsarotlogo" width="140px"/>
        </div>
      </div>
  );
}

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 14,
    borderRadius: 2,
    marginTop: 7,
    marginBottom: 7,
  },
  colorPrimary: {
    backgroundColor: '#8f8b5e',
  },
  bar: {
    borderRadius: 2,
    backgroundColor: '#003349',
  },
}))(LinearProgress);

const CustomTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderRadius: 0,
      },
    },
  },
})(TextField);


function MyButton({ classes, ...other }) {  
  const { button: buttonClass, ...rippleClasses } = classes;
  return (
    <Button
      TouchRippleProps={{ classes: rippleClasses }}
      className={buttonClass}
      {...other}
    />
  );
}

const SubmitButton = withStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.primary.main,
  },
  child: {
    backgroundColor: theme.palette.secondary.main
  },
  rippleVisible: {
    opacity: 1.0,
    animation: `$enter 1000ms ${theme.transitions.easing.easeInOut}`
  },
  childLeaving: {
    opacity: 0,
    animation: `$exit 550ms ${theme.transitions.easing.easeInOut}`,
  },
  "@keyframes enter": {
    "0%": {
      transform: "scale(0)",
      opacity: 0.5
    },
    "40%": {
      transform: "scale(1)",
      opacity: 1.0
    }
  },
  '@keyframes exit': {
    '0%': {
      opacity: 1,
    },
    '100%': {
      opacity: 1,
    },
  },
}))(MyButton);


const CheckingButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(theme.palette.secondary.main),
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      boxShadow: '0 1px 3px rgba(0,0,0,0.24), 0 1px 2px rgba(0,0,0,0.24)',
    },
  },
}))(Button);

const ProgressBarButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(theme.palette.secondary.main),
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      boxShadow: '0 1px 3px rgba(0,0,0,0.24), 0 1px 2px rgba(0,0,0,0.24)',
    },
  },
}))(Button);

const ErrorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[500],
    },
    textTransform: 'none',
  },
}))(Button);



function InputDialog(props) {
  const classes = useStyles();
  var pathToProjectBuff = "";
  var pathToTrajectBuff = "";

  const [pathToProject, setPathToProject] = useState("");
  const [pathToTraject, setPathToTraject] = useState("");
  const [inputState, setInputState] = useState("waiting");
  const [checkState, setCheckState] = useState(false);
  const [receiveProcess, setReceiveProcess] = useState(false);
  const [dataOK, setDataOK] = useState(false);

  useEffect(() => {
    if(dataOK && receiveProcess){
      props.processOnClickHandler();
    }
  });

  ipcRenderer.on("dataOK", (event,arg) => {
    if(arg){
      setDataOK(true);
    }else{
      if(inputState === "checking"){
        setDataOK(false);
        setInputState("error");
        window.setTimeout(function(){
          setInputState("waiting");
        }, 2000);
      }
    }
  });

  
  const projectButtonOnClickHandler = () => {
    pathToProjectBuff = Electron.remote.dialog.showOpenDialogSync({ properties: ['openDirectory'] });
    setPathToProject(pathToProjectBuff);
  }
  const trajectButtonOnClickHandler = () => {
    pathToTrajectBuff = Electron.remote.dialog.showOpenDialogSync({ properties: ['openDirectory'] });
    setPathToTraject(pathToTrajectBuff);
  }

  const startProcessOnClickHandler = () => {

    window.setTimeout( function(){    
      
      setInputState("checking");      
      var startParams = new Object();
      startParams.projectPath = pathToProject;
      startParams.trajectoryPath = pathToTraject; 

      ipcRenderer.send("startProcess", startParams);
      
      window.setTimeout( function(){ 
        setReceiveProcess(true);
      }, 3000);

    },450);

  }
  
  const checkingOnClickHandler = () => {
    setInputState("waiting");
    ipcRenderer.send("checkingSend",true);
    props.processOnClickHandler();
  }

  const errorOnClickHandler = () => {
    setInputState("waiting");
  }

  return(
    <div className={classes.paper}>

      <TitleComponent/>
      <form className={classes.form} noValidate>
        <div className={ inputState === "checking" ? "fadeInput" : "justTextfield"}> 
          <div style={{display: 'inlineBlock'}}>
            <CustomTextField style={{ width: '70%', }}
              variant="outlined"
              margin="normal"
              id="projectfolder"
              label="Project Folder"
              name="projectfolder"
              autoFocus
              value={pathToProject}
            />
            <Button style={{  borderRadius: 0, 
                            margin: '25px 0px 25px 23px',
                            maxWidth: '80px', maxHeight: '50px', 
                            minWidth: '30px', minHeight: '30px'}} 
              variant="outlined" 
              color="primary"
              onClick={projectButtonOnClickHandler}
              disableRipple
              disableFocusRipple
            >
              Browse
            </Button>
          </div>
          <div style={{display: 'inlineBlock' }}> 
            <CustomTextField style={{ width: '70%'}}
              variant="outlined"
              margin="normal"
              name="ppkfolder"
              label="Trajectory Folder"
              type="ppkfolder"
              id="password"
              autoComplete="current-password"
              value = {pathToTraject}
            />
            <Button style={{  borderRadius: 0, 
                            margin: '25px 0px 25px 23px',
                            maxWidth: '80px', maxHeight: '50px', 
                            minWidth: '30px', minHeight: '30px'}} 
              variant="outlined"
              color="primary"
              onClick={trajectButtonOnClickHandler}
              disableRipple
              disableFocusRipple
            >
              Browse
            </Button>
          </div>

        </div>
        <div style={{position: 'relative', paddingTop: 25, paddingBottom: 0,}}>
          
          {inputState == "waiting" && (
            <div>
              <SubmitButton
                style={{borderRadius: 0}}
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                onClick={startProcessOnClickHandler}
              >
                Process
                {/* <div style={{ width:500, height:500, backgroundColor:"#b7b946", borderRadius:"100%" }}/> */}
              </SubmitButton>
            </div>
          )}
           
          {inputState == "checking" && (
            <div>
              <div className='glowContinue'/>
              <CheckingButton
                style={{borderRadius: 0,}}
                type="button"
                fullWidth
                variant="contained"
                color="secondary"
                onClick={checkingOnClickHandler}
              >
                <div className="checkData">
                  Checking Data
                </div>
                
                {/* <CheckIcon />
                <div style={{position: "absolute", width: 30, height: 25,  backgroundColor: "#b7b946", zIndex: 100}}
                    className="checkAppear"/>                           
                */}
              </CheckingButton>
            </div>
          )}

          {inputState == "error" && (  
            <div>
              <ErrorButton
                className='errorButton'
                style={{borderRadius: 0,}}
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                onClick={errorOnClickHandler}
              >
                Data not valid !
              </ErrorButton>
            </div>       
          )}

        </div>

        <Box mt={9}>
          <Copyright />
        </Box>
      </form>
    </div>
  );
}

function ProcessDialog(props) {
  const classes = useStyles();
  const progress = 50;

  const [firstRender, setFirstRender] = React.useState(true);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = React.useState(false);
  const [progressData, setProgressData] = React.useState({
                                                          percentage  : "0",
                                                          currentData : "0",
                                                          totalData   : "0",
                                                          eta         : "0",
                                                          iterSecond  : "0",
                                                        })
  
  
  useEffect(() => {
    if(firstRender){
      setFirstRender(false);
    }else{
      if( !dialogOpen ){
        props.backOnClickHandler();
      }
    }
  }, [dialogOpen]);
  
  const openFolderHandler = () => {
    ipcRenderer.send("openFolder", true);
    setDialogOpen(false);
  };

  const alertDialogCloseHandler = () => {
    setDialogOpen(false);
  };
  
  const cancelOnClickHandler = () => {
    setCancelDialogOpen(true);
  };

  const yesOnClickHandler = () => {
    ipcRenderer.send("terminateProcess", true);
    props.backOnClickHandler();
    setCancelDialogOpen(false);
  };
  
  const noOnClickHandler = () => {
    setCancelDialogOpen(false);
  };

  // let progressData = {
  //   percentage: "0",
  //   currentData: "0",
  //   totalData: "0",
  //   eta: "0",
  //   iterSecond: "0",
  // };

  ipcRenderer.on("progressData", (event,arg) => {
    setProgressData(arg);
  })

  ipcRenderer.on("processFinished", (event,arg) => {
    setDialogOpen(true);
  })

  return (
      <div className={classes.paper}>
  
        <TitleComponent/>
        <form className={classes.form} noValidate>
          <div style={{height:172}}>
            <Typography style={{margin: '40px', marginTop: 0}} component="h1" variant="h5" className="fadeOutput">
              Processing your 3D map
            </Typography>
            <Typography style={{marginTop: '10px', textAlign: 'center'}} className="fadeOutput2">
              {progressData.currentData} / {progressData.totalData}
            </Typography>
            <Typography style={{textAlign: 'center'}} className="fadeOutput2">
              {progressData.iterSecond} Frame/s
            </Typography>
            <Typography style={{textAlign: 'center'}} className="fadeOutput2">
              {progressData.eta}
            </Typography>            
          </div>
 
          <div style={{position: 'relative', paddingTop: 0, paddingBottom: 0,}}>
            <div className={'glowOnce'}/>
            <ProgressBarButton
              type="button"
              fullWidth
              variant="contained"
              color="secondary"
              // className={"progressBarButton"}
              style={{marginTop: 25, padding:6, paddingLeft:4, paddingRight: 2, borderRadius: 0}}
              // onClick={props.backOnClickHandler}
            >
              <div style={{width:"100%"}}>
                <BorderLinearProgress style={{height: 5, width:"100%", borderRadius: 0}} variant="determinate" value={parseInt(progressData.percentage)} className="rollOutput"/>
              </div>
              <Typography style={{width: '50px', marginLeft: '8px', marginRight: '5px', textAlign: 'center'}} className="fadeOutput2">
                {progressData.percentage}%
              </Typography>
            </ProgressBarButton>
            <CancelDialog appear={cancelDialogOpen} 
                          noOnClickHandler={noOnClickHandler} 
                          yesOnClickHandler={yesOnClickHandler}
                          handleClickOpen={cancelOnClickHandler}
            />

          </div>
          <AlertDialog appear={dialogOpen} 
                        onOpenFolderHandler = {openFolderHandler} 
                        onCloseHandler={alertDialogCloseHandler}/>
  
          <Box mt={9}>
            <Copyright />
          </Box>
        </form>
      </div>
    );
  };
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
