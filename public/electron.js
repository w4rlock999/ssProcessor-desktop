const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
const { ipcMain, webContents } = require('electron');

var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var execSync = require('child_process').execSync;

let mainWindow;

let childPythonProcess;
let progressDataMsg = new Object();

function createWindow() {
        mainWindow = new BrowserWindow({ 
            width: 900, 
            height: 680, 
            webPreferences: {
                nodeIntegration: true,
            },
            icon: path.join(__dirname, 'assets/icons/png/100x100.png')
        });
        mainWindow.loadURL(isDev? "http://localhost:3000": `file://${path.join(__dirname, "../build/index.html")}`);
        mainWindow.webContents.openDevTools();
        mainWindow.on("closed", () => (mainWindow = null));
    }

app.on("ready", createWindow);
app.on("window-all-closed", () => { if (process.platform !== "darwin") {app.quit(); }});
app.on("activate", () => { if (mainWindow === null) {createWindow(); }});

ipcMain.on("startProcess", (event,arg) => {
    console.log("start process received");
    
    const projectPath = arg.projectPath;
    const trajectoryPath = arg.trajectoryPath;
    // console.log(startParams);

    childPythonProcess = spawn('python',['C:\\Users\\w4rlo\\Documents\\Workspace\\ppk_mapper\\ppk_winV2.py', projectPath, trajectoryPath]);

    childPythonProcess.stdout.setEncoding('utf8');
    childPythonProcess.stderr.setEncoding('utf8');

    childPythonProcess.stdout.on('data', (data) => {
        var pythonProcessOutput = data;
        console.log(pythonProcessOutput);

        if(pythonProcessOutput.includes("process_start")){
            console.log("data OK!");
            mainWindow.webContents.send("dataOK", true);    
        }

    });

    childPythonProcess.stderr.on('data', (data)=>{
        // console.log(`${data}` );
        // var pythonProcessProgress = "";
        var pythonProcessProgress = data;

        if(pythonProcessProgress.includes("%")){
            var percentPos  = pythonProcessProgress.search('%');
            var slashPos    = pythonProcessProgress.search('/');
            var openBrPos   = pythonProcessProgress.search('\\[');
            var closeBrPos  = pythonProcessProgress.search(']');
            var commaPos    = pythonProcessProgress.search(',');

            var percentage  = pythonProcessProgress.substring(percentPos-3, percentPos);
            var currentData = pythonProcessProgress.substring(percentPos+14, slashPos);
            var totalData   = pythonProcessProgress.substring(slashPos+1, openBrPos-1);
            var eta         = pythonProcessProgress.substring(openBrPos+7, commaPos);
            var iterSecond  = pythonProcessProgress.substring(commaPos+1, closeBrPos-4);

            console.log(`${percentage} ${currentData} ${totalData} ${eta} ${iterSecond} `);
        
            progressDataMsg.percentage      = percentage;
            progressDataMsg.currentData     = currentData;
            progressDataMsg.totalData       = totalData;
            progressDataMsg.eta             = eta;
            progressDataMsg.iterSecond      = iterSecond;
            
            mainWindow.webContents.send("progressData", progressDataMsg);    

            // console.log(pythonProcessProgress);
        }
    });

    childPythonProcess.stdout.on('close', (code)=> {
        console.log(`process finished ${code}`)

        if(code){
            console.log("process success ");
        }else{
            console.log("process failed ");
            mainWindow.webContents.send("dataOK", false);
        }
    });
    
    

    // Dummy dataOK code below:
    // setTimeout( function(){
    //     mainWindow.webContents.send("dataOK", true);
    //     console.log("dataok sent");
    // },500);
    
    // ipcMain.send("dataOK", true)
});

