const http = require('http')
const childProcess = require('child_process')
const fs = require('fs')

const GIT_DIR = '/code'
const GIT_REPO = process.env.GIT_REPO

fs.mkdir(GIT_DIR, (err) => {if(err) console.log(err)})
let dir = childProcess.execSync(`ls -a1 ${GIT_DIR} | wc -l`).toString()
if (Number(dir) <= 2) {
  // clone
  childProcess.execSync(`git clone ${GIT_REPO} /code`)
}

function gitPull(dirName) {
  childProcess.exec(`cd ${dirName} && git pull`)
  console.log('pulled ' + GIT_REPO)
}

http.createServer((req, res) => {
  gitPull(GIT_DIR)
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('OK\n')
}).listen(80)
