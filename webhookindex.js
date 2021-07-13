const http = require("http")
const {execSync} = require("child_process")
const fs = require("fs")
const path = require("path")

// 递归删除目录
function deleteFolderRecursive(path) {
    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file) {
            const curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

const resolvePost = req =>
    new Promise(resolve => {
        let chunk = "";
        req.on("data", data => {
            chunk += data;
        });
        req.on("end", () => {
            resolve(JSON.parse(chunk));
        });
    });

http.createServer(async (req, res) => {
    console.log('receive request')
    console.log(req.url)
    if (req.method === 'POST' && req.url === '/') {
      const data = await resolvePost(req);
      const projectDir = path.resolve(`./${data.repository.name}`)
     deleteFolderRecursive(projectDir)

     let giturl = data.repository.html_url
     
      // 拉取仓库最新代码
      execSync(`git clone `+ giturl,{
        stdio:'inherit',
    })
    

    res.end('ok')
}
}).listen(3020, () => {
    console.log('server is ready')
})
