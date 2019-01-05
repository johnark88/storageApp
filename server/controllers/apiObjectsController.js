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
  const nameOfBucket = storage.bucket(bucketName);


  function sortFiles(objectList) {
    const temp = [];
    let allTheData = [];
    objectList.forEach((item) => {
      // Breaks off the prefix
      const stringSplit = item.split('/')[1];
      if (stringSplit !== '') {
        const file = nameOfBucket.file(`${thePrefix}${stringSplit}`);

        const getMetaPromise = file.getMetadata();
        getMetaPromise.then((data) => {
          console.log(data[0], 'data');
          temp.push({ meta: data[0], name: stringSplit });
        })
          .then(() => {
            console.log(temp, ' temmopp 2');
            allTheData = temp;
            res.json(allTheData);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      // console.log(allTheData, 'all ');
      // return new Promise((resolve, reject) => {
      //   file.getMetadata((err, metadata, apiResponse) => {
      //     if (err) {
      //       reject(err);
      //     } else {
      //       temp.push({ meta: metadata, name: stringSplit });
      //       resolve(res.json(temp));
      //     }
      //   });
      // });
      // file.getMetadata().then((data) => {
      //   const metadata = data[0];
      //   console.log(metadata);
      // }).then((metadata) => {
      //   res.json(metadata);
      // });
      // console.log(temp, 'post');
      // file.get().then((data) => {
      //   // temp.push({ meta: data[0].metadata, name: stringSplit });
      // }).catch((error) => {
      //   console.log(error);
      // });
      // file.getMetadata(function(err, metadata, apiResponse) {
      //   temp.push({ meta: metadata, name: stringSplit });
      //   res.json(temp)
      // });
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
