const http = require('http')
const childProcess = require('child_process')

const GIT_DIR = '/code'
const GIT_REPO = process.env.GET_REPO

let dir = childProcess.execSync(`ls -a ${GIT_DIR}`)


function gitPull(dirname) {
  childProcess.exec(`cd ${dirname} && git pull`)
}

http.createServer((req, res) => {
  gitPull(GIT_DIR)
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('OK\n')
}).listen(80)
