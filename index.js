const http = require("http");
var callfile = require("child_process");

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

      console.log('next callfile')

      callfile.execFile("deploy.sh", ["giturl", giturl]);

      res.end("ok");
    }
    console.log("if else");
  })
  .listen(3020, () => {
    console.log("server is ready");
  });
