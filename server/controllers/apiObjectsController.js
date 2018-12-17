const { Storage } = require('@google-cloud/storage');

const projectId = 'photostorage-224716';

const storage = new Storage ({
  projectId: projectId,
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
  const bucketName = req.params.bucketName;
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
  const prefix = req.params.name+'/';
  const delimiter = '/';
  // const filePrefix = bucketName+'/'+req.params.name;

  function sortFiles(objectList) {
    const filesSorted = [];
    objectList.forEach((file) => {
      // Breaks off the prefix
      const stringSplit = file.split('/')[1];
      // push it to temp array
      filesSorted.push(stringSplit);
      if (filesSorted[0] === '') {
        filesSorted.shift();
      }
    });
    res.json(filesSorted);
  }

  const options = {
    prefix: prefix,
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

// getting file meta data
exports.getMetaFile = async (req, res) => {
  const bucketName = req.params.storage+'/'+req.params.folder;
  const filename = req.params.name;
  const myBucket = storage.bucket(bucketName);
  const file = myBucket.file(filename);


  await file.getMetadata((err, metadata, apiResponse) => {
    // console.log(err);
    // console.log(metadata);
    console.log(apiResponse);
  });

  // file.getMetadata().then((data) => {
  //   const metadata = data[0];
  //   const apiResponse = data[1];
  //   console.log(metadata, ' meta');
  //   console.log(apiResponse, 'response');
  // });
};
