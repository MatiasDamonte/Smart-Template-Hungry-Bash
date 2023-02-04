import * as AWS from "aws-sdk";

const configuration = {
  // secretAccessKey: "j7uacGWvcCsri9w9QspywqEGSAxCHLjbyFu7HA5D",
  // accessKeyId: "AKIAVXBBB54RSF2RUKC4"
  // read-only access
  region: "ap-south-1",
  secretAccessKey: "iOxdU7GVxkOuDLeVu0SZiGlfcP/xcPg+7xtcZhuD",
  accessKeyId: "AKIAVXBBB54RYLUO6KLF"

  // set setRegion(reg) {
  //   this.region = reg;
  // },
  // set setSecretAccessKey(accessKey) {
  //   this.secretAccessKey = accessKey;
  // },
  // set setAccessKeyId(keyId) {
  //   this.accessKeyId = keyId;
  // }
  // firebase - encoded/dupicate format data
  // decode
  // set region, acces, id
};

AWS.config.update(configuration);

export default AWS;
