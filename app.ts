import { exec } from 'child_process';
import { app, BrowserWindow } from 'electron';

import * as json from './data.json';

interface AppData {
  name: string;
  description: string;
  url: string;
  platform: "windows" | "linux" | "mac";
  install: "true" | "false";
  start: "true" | "false";
  desktop: "true" | "false";
}

const data = json as AppData;

function init() {
  let url: string;
  if (!/^https?:\/\//.test(data.url)) url = "http://" + data.url;
  else url = data.url;

  new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    title: data?.name || "Electrify",
  }).loadURL(url)
}

app.whenReady().then(() => {
  init();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) init();
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
})