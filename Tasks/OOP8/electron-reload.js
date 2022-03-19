// The MIT License (MIT)

// Copyright (c) 2015 Yan Foto

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// Modified https://github.com/yan-foto/electron-reload/blob/master/main.js to return watcher in
// elecronReload().

const { app } = require('electron');
const chokidar = require('chokidar');
const fs = require('fs');
const { spawn } = require('child_process');

const appPath = app.getAppPath();
const ignoredPaths = /node_modules|[/\\]\./;
// Main file poses a special case, as its changes are
// only effective when the process is restarted (hard reset)
// We assume that electron-reload is required by the main
// file of the electron application
const mainFile = module.parent.filename;

/**
 * Creates a callback for hard resets.
 *
 * @param {string} eXecutable path to electron executable
 * @param {string} hardResetMethod method to restart electron
 * @param {string[]} eArgv arguments passed to electron
 * @param {string[]} aArgv arguments passed to the application
 * @returns {function} handler to pass to chokidar
 */
const createHardresetHandler = (eXecutable, hardResetMethod, eArgv, aArgv) => () => {
  // Detaching child is useful when in Windows to let child
  // live after the parent is killed
  const args = (eArgv || []).concat([appPath]).concat(aArgv || []);
  const child = spawn(eXecutable, args, {
    detached: true,
    stdio: 'inherit',
  });
  child.unref();
  // Kamikaze!

  // In cases where an app overrides the default closing or quiting actions
  // firing an `app.quit()` may not actually quit the app. In these cases
  // you can use `app.exit()` to gracefully close the app.
  if (hardResetMethod === 'exit') {
    app.exit();
  } else {
    app.quit();
  }
};
module.exports = function elecronReload(glob, options = {}) {
  const browserWindows = [];
  const watcher = chokidar.watch(
    glob,
    Object.assign({ ignored: [ignoredPaths, mainFile] }, options)
  );

  // Callback function to be executed:
  // I) soft reset: reload browser windows
  const softResetHandler = () =>
    browserWindows.forEach((bw) => bw.webContents.reloadIgnoringCache());
  // II) hard reset: restart the whole electron process
  const eXecutable = options.electron;
  const hardResetHandler = createHardresetHandler(
    eXecutable,
    options.hardResetMethod,
    options.electronArgv,
    options.appArgv
  );

  // Add each created BrowserWindow to list of maintained items
  app.on('browser-window-created', (e, bw) => {
    browserWindows.push(bw);

    // Remove closed windows from list of maintained items
    bw.on('closed', function () {
      const i = browserWindows.indexOf(bw); // Must use current index
      browserWindows.splice(i, 1);
    });
  });

  // Enable default soft reset
  watcher.on('change', softResetHandler);

  // Preparing hard reset if electron executable is given in options
  // A hard reset is only done when the main file has changed
  if (eXecutable) {
    if (!fs.existsSync(eXecutable)) {
      throw new Error('Provided electron executable cannot be found or is not exeecutable!');
    }

    const hardWatcher = chokidar.watch(
      mainFile,
      Object.assign({ ignored: [ignoredPaths] }, options)
    );

    if (options.forceHardReset === true) {
      // Watch every file for hard reset and not only the main file
      hardWatcher.add(glob);
      // Stop our default soft reset
      watcher.close();
    }

    hardWatcher.once('change', hardResetHandler);
  }

  return watcher;
};
