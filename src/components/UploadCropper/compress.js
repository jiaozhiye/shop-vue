/**
 * 将图片压缩为对应尺寸
 * @param {Object} options
 * @param {String} options.img 图片的url或者base64数据
 * @param {Number} options.width 目标图片的宽度
 * @param {Number} options.height 目标图片的高度
 * @param {Number} options.quality 生成目标图片质量
 * @param {String} options.fit 图片压缩填充模式默认 scale：按比例缩放，可选 fill：按使用目标尺寸
 * @param {String} options.type 图片压缩类型默认 jpg，可选 png
 * @param {String} options.fillColor 在jpeg格式下，留白区域的填充色
 * @returns {Promise} then {width,height,img}
 */
function pictureCompress(options) {
  return new Promise((resolve, reject) => {
    if (!options.img) {
      reject(new Error('need img'));
      return;
    }
    let imgSrc = options.img,
      width = options.width || 640,
      height = options.height || 1000,
      type = options.type || 'jpg',
      quality = options.quality || 0.92,
      fillColor = options.fillColor || '#fff',
      fit = options.fit || 'scale';
    if (width <= 0 || height <= 0) {
      reject(new Error('dist width or height need > 0'));
      return;
    }
    if (!/jpg|png|jpeg/.test(type)) {
      reject(new Error('type need jpg or png!'));
      return;
    }
    let image = new Image();
    image.src = imgSrc;
    image.onload = function() {
      let distSize = getDistSize(
        {
          width: this.naturalWidth,
          height: this.naturalHeight
        },
        {
          width: width,
          height: height
        },
        fit
      );
      let imgData = compress(this, distSize.width, distSize.height, type, fillColor, quality);
      resolve({
        ...distSize,
        img: imgData
      });
    };
    image.onerror = function(err) {
      reject(err);
    };
  });
}
/**
 * 将图片转换为固定尺寸的
 * @param {Image} img 图片数据
 * @param {Number} width 转换之后的图片宽度
 * @param {Number} height 转换之后的图片高度
 * @param {String} type base64的图片类型 jpg png
 * @param {String} fillColor 填充颜色
 * @param {Number} quality 转换之后的图片质量
 */
function compress(img, width, height, type, fillColor, quality) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  let types = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png'
  };
  canvas.width = width;
  canvas.height = height;
  // 非 png 图片留白区域背景颜色填充
  if (type !== 'png') {
    ctx.fillStyle = fillColor;
    ctx.fillRect(0, 0, width, height);
  }
  ctx.drawImage(img, 0, 0, width, height);
  return canvas.toDataURL(types[type], quality);
}
/**
 * 选择源尺寸与目标尺寸比例中较小的那个，保证图片可以完全显示
 * 最大值不超过1，如果图片源尺寸小于目标尺寸，则不做处理，返回图片原尺寸
 * @param {Object} source 源图片的宽高
 * @param {Object} dist 目标图片的宽高
 */
function getDistSize(source, dist, fit) {
  if (fit === 'fill') return dist;
  let scale = Math.min(dist.width / source.width, dist.height / source.height, 1);
  return {
    width: Math.round(source.width * scale),
    height: Math.round(source.height * scale)
  };
}

export default pictureCompress;
