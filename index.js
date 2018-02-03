const getPixels = require("get-pixels");
const images = require("images");

// 图片地址
const imgPath = process.argv[2] || '';
// 输出图片大小
const distSize = Number(process.argv[3]) || 100;

if (!imgPath) {
  console.log('使用图片地址作为参数');
  return;
}

const regResultArr = imgPath.match(/(.+)\.([^.]+)/) || [];
const [ , imageName, imageType ] = regResultArr;
const tinyImagePath = `${imageName}-${distSize}.${imageType}`;

const GREAD = 'MNHQ&OC?7>!:-;.'
const POS = 255 / GREAD.length;

images(imgPath)
    .size(distSize)
    .save(tinyImagePath);

getPixels(tinyImagePath, function(err, pixels) {
  if(err) {
    console.log("Bad image path")
    return;
  }

  let str = '';

  const width = pixels.shape[0];
  const height = pixels.shape[1];

  for(let i = 0; i < height; i++){
      for(let j = 0; j < width; j++){
          const r = pixels.get(j, i, 0);
          const g = pixels.get(j, i, 1);
          const b = pixels.get(j, i, 2);

          const grr = r * 0.299 + g * 0.587 + b * 0.114;
          str += GREAD.charAt(Math.round(grr / POS));
      }

      str += '\n';
  }

  console.log(str);
})
