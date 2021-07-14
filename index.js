const http = require("http");
//var callfile = require("child_process");

const resolvePost = (req) =>
  new Promise((resolve) => {
    let chunk = "";
    req.on("data", (data) => {
      chunk += data;
    });
    req.on("end", () => {
      resolve(JSON.parse(chunk));
    });
  });

  function run_cmd(cmd, args, callback) {
    var spawn = require('child_process').spawn;
    var child = spawn(cmd, args);
    var resp = "";

    child.stdout.on('data', function(buffer) { resp += buffer.toString(); });
    child.stdout.on('end', function() { callback (resp) });
}

http
  .createServer(async (req, res) => {
    console.log("receive request");
    console.log(req.url);
    if (req.method === "POST" && req.url === "/") {
      console.log("if true");
      const data = await resolvePost(req);
      //const projectDir = path.resolve(`./${data.repository.name}`)
      //deleteFolderRecursive(projectDir)

      let giturl = data.repository.html_url;

      console.log('next callfile',giturl)

      //callfile.execFile("autobuild.sh", ["giturl", giturl]);

      run_cmd('sh', ['./autobuild.sh'], function(text){ console.log(text) });

      res.end("ok");
    }
    console.log("if else");
  })
  .listen(3020, () => {
    console.log("server is ready");
  });
