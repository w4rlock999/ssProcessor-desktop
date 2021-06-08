const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
const { ipcMain, webContents } = require('electron');

var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var execSync = require('child_process').execSync;
var psTree = require('ps-tree');


let mainWindow;

let childPythonProcess;
let childKMLConverter;
let progressDataMsg = new Object();

function createWindow() {
        mainWindow = new BrowserWindow({ 
            width: 900, 
            height: 680, 
            webPreferences: {
                nodeIntegration: true,
            },
            icon: path.join(__dirname, 'assets/icons/png/128.png')
        });
        (isDev ? console.log('dev running') : mainWindow.removeMenu());
        mainWindow.loadURL(isDev? "http://localhost:3000": `file://${path.join(__dirname, "../build/index.html")}`);
        // mainWindow.webContents.openDevTools();
        mainWindow.on("closed", () => (mainWindow = null));
    }

app.on("ready", createWindow);
app.on("window-all-closed", () => { if (process.platform !== "darwin") {app.quit(); }});
app.on("activate", () => { if (mainWindow === null) {createWindow(); }});

var g_projectPath = ""

ipcMain.on("startProcess", (event,arg) => {
    console.log("start process received");
    
    const projectPath       = arg.projectPath;
    g_projectPath           = arg.projectPath;
    const trajectoryPath    = arg.trajectoryPath;


    var kmlConverterPath = path.join(__dirname, "../engine/converter/pos2kml.exe");
    var trajectoryPosFile = path.join(trajectoryPath[0],"/kmlData.pos");

    childKMLConverter = exec(`${kmlConverterPath} -a -tu ${trajectoryPosFile}`, ()=>{
        pythonProcess(projectPath, trajectoryPath);
    });

});

var pythonProcess = function(projectPath, trajectoryPath) {

    (isDev ?
    childPythonProcess = spawn('C:\\Users\\w4rlo\\Documents\\Workspace\\ppk_mapper\\dist\\ppk_winV2\\ppk_winV2.exe', 
                            [ projectPath[0], trajectoryPath[0]])
    :
    childPythonProcess = spawn(path.join(__dirname, "../engine/processor/ppk_winV2.exe"), [ projectPath[0], trajectoryPath[0]] )
    )
    childPythonProcess.stdout.setEncoding('utf8');
    childPythonProcess.stderr.setEncoding('utf8');

    childPythonProcess.stdout.on('data', (data) => {
        var pythonProcessOutput = data;
        // console.log(pythonProcessOutput);

        if(pythonProcessOutput.includes("process_start")){
            console.log("data OK!");
            mainWindow.webContents.send("dataOK", true);    
        }
        
        if(pythonProcessOutput.includes("process_finish")){
            console.log("process finished!");
            mainWindow.webContents.send("processFinished", true);    
        }

    });

    childPythonProcess.stderr.on('data', (data)=>{
        // console.log(`${data}` );
        // var pythonProcessProgress = "";
        var pythonProcessProgress = data;
        console.log(pythonProcessProgress)
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

            // console.log(`${percentage} ${currentData} ${totalData} ${eta} ${iterSecond} `);
        
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
    
    ipcMain.on("terminateProcess", (event,arg) => {
        kill(childPythonProcess.pid, 'SIGINT');
    });
    
    ipcMain.on("openFolder", (event,arg) => {
        // console.log(g_projectPath[0])
        electron.shell.openPath(g_projectPath[0]);
    });
};

var kill = function (pid, signal, callback) {
    signal = signal || 'SIGINT'
    callback = callback || function () {};
    var killTree = true;
    if (killTree) {
        psTree(pid, function (err, children) {
            [pid].concat(
                children.map(function (p) {
                    return p.PID;
                })
            ).forEach(function (tpid) {
                try { process.kill(tpid, signal) }
                catch (ex) { }
            });
            callback();
        });
    } else {
        try { process.kill(pid, signal) }
        catch (ex) { }
        callback();
    }
};

