const { Storage } = require('@google-cloud/storage');

const myProjectId = 'photostorage-224716';

const storage = new Storage({
  projectId: myProjectId,
  keyFilename: './storage.json',
});

exports.getObjects = async (req, res) => {
  function findDuplicates(theFolders) {
    // Sort out all duplications
    // push remaining folders to result array
    const result = [];
    theFolders.forEach((element, index) => {
      // Find if there is a duplicate or not
      if (theFolders.indexOf(element, index + 1) > -1) {
        // Find if the element is already in the result array or not
        if (result.indexOf(element) === -1) {
          // pa pa push it real good ....... to the results array
          result.push(element);
        }
      }
    });
    // send to frontend
    res.json(result);
  }

  // sort through array to find only the folders
  function sortFolders(folderList) {
    const foldersSorted = [];
    folderList.files.forEach((folder) => {
      // break apart files from folders
      const stringSplit = folder.split('/')[0];
      // push folders to array
      foldersSorted.push(stringSplit);
    });
    // send to function to remove duplicates
    findDuplicates(foldersSorted);
  }

  // Gets ALL items in bucket
  const bucketName = `${req.params.bucketName}`;
  // the get
  const [files] = await storage.bucket(bucketName).getFiles();
  const bucketObjects = {
    bucket: bucketName,
    files: [],
  };
  files.forEach((file) => {
    bucketObjects.files.push(file.name);
  });
  // send to sorter to get folders
  sortFolders(bucketObjects);
};

exports.getFileObjects = async (req, res) => {
  const bucketName = req.params.storage;
  const thePrefix = `${req.params.name}/`;
  const delimiter = '/';

  function getMetaFile(filename) {
    const nameOfBucket = storage.bucket(bucketName);
    const file = nameOfBucket.file(`${thePrefix}${filename}`);
    const dataToSendBack = [];

    file.get().then((data) => {
      // console.log(data[0].metadata);
      dataToSendBack.push({ meta: data[0].metadata, name: filename });
      // res.json(file.metadata);
      console.log(dataToSendBack);
      res.json(dataToSendBack);
    }).catch((error) => {
      console.log(error);
    });
  }

  function sortFiles(objectList) {
    // const filesSorted = [];
    objectList.forEach((file) => {
      // Breaks off the prefix
      const stringSplit = file.split('/')[1];
      // push it to temp array
      // filesSorted.push(stringSplit);
      if (stringSplit !== '') {
        getMetaFile(stringSplit);
      }
    });
  }

  const options = {
    prefix: thePrefix,
  };

  if (delimiter) {
    options.delimiter = delimiter;
  }
  // Lists files in the bucket, filtered by a prefix
  const [files] = await storage.bucket(bucketName).getFiles(options);
  const filesToSort = [];
  files.forEach((file) => {
    filesToSort.push(file.name);
  });
  sortFiles(filesToSort);
};
