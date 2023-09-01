const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, "public")));

// 存储分片文件的目录
const chunkDir = "chunks/";

app.post("/upload", upload.single("file"), (req, res) => {
  const { file } = req;

  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  // 处理分片上传
  const chunkIndex = req.body.chunk;
  const totalChunks = req.body.chunks;
  const fileExtension = req.body.fileExtension; // 获取传递的后缀名

  // 创建分片存储目录
  if (!fs.existsSync(chunkDir)) {
    fs.mkdirSync(chunkDir);
  }

  // 将分片保存到分片目录中
  const chunkPath = path.join(chunkDir, `chunk-${chunkIndex}`);
  fs.writeFileSync(chunkPath, fs.readFileSync(file.path));

  // 如果所有分片已上传，合并分片
  if (parseInt(chunkIndex) === parseInt(totalChunks) - 1) {
    const destPath = path.join("uploads", `file.${fileExtension}`);
    const chunkPaths = [];

    for (let i = 0; i < totalChunks; i++) {
      chunkPaths.push(path.join(chunkDir, `chunk-${i}`));
    }

    // 合并分片
    fs.writeFileSync(
      destPath,
      Buffer.concat(chunkPaths.map((chunkPath) => fs.readFileSync(chunkPath)))
    );
    res.send("File uploaded successfully.");
  } else {
    res.send("Chunk uploaded successfully.");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
