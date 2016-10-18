'use strict';

var path = require('path'),
    img = require('image-magic').size;

/**
 * Astro中间件
 * 
 * 当访问以"2x"结束的图片（如abc.jpg）时，
 * 如存在abc2x.jpg，则按原图1/2尺寸存储为abc.jpg，并返回
 */

module.exports = new astro.Middleware({
    fileType: 'img'
}, function(asset, next) {
    // 发布 abc2x.jpg时，自动发布abc.jpg
    if (asset.status == 'release' &&
        (/2x$/i).test(path.basename(asset.filePath, asset.extname))) {
        let half = asset.clone();
        half.filePath = asset.filePath.replace(/2x(\..*?)$/i, function(a, b) {
            return b
        });
        half.name = asset.name.replace(/2x(\..*?)$/i, function(a, b) {
            return b
        });
        img.createImgFrom2xWithCacheSync(half.filePath,
            path.join(asset.prjCfg.imgCache, 'img2x.json'));

        // half.debug = 1;
        half.release(function() {
            next(asset);
        });
        return;
    }
    // 访问 abc.jpg，如存在abc2x.jpg，则返回缩放1/2的abc2x.jpg
    if (img.createImgFrom2xWithCacheSync(asset.filePath,
            path.join(asset.prjCfg.imgCache, 'img2x.json'))) {
        asset.data = asset.read();
    }
    next(asset);
});