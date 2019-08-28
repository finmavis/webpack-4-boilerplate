const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminSvgo = require('imagemin-svgo');
const imageminWebp = require('imagemin-webp');

(async() => {
  /**
   * Start Optimized jpg images
   */
  await imagemin(
    ['./build/assets/**/*.jpg'], {
      destination: './build/assets/',
      plugins: [
        imageminMozjpeg({ quality: 75, progressive: true })
      ]
    },
  );
  console.log("JPEG Images optimized!");

  /**
   * Start Optimized png images
   */
  await imagemin(
    ['./build/assets/**/*.png'], {
      destination: './build/assets/',
      plugins: [
        imageminPngquant({ quality: [0.75, 0.75] })
      ]
    }
  );
  console.log('PNG Images optimized!');

  /**
   * Start Optimized svg images
   */
  await imagemin(
    ['./build/assets/**/*.svg'], {
      destination: './build/assets/',
      plugins: [
        imageminSvgo({
          options: {
            cleanupAttrs: true,
            inlineStyles: true,
            removeDoctype: true,
            removeXMLProcInst: true,
            removeComments: true,
            removeMetadata: true,
            removeTitle: true,
            removeDesc: true,
            removeUselessDefs: true,
            removeXMLNS: false,
            removeEditorsNSData: true,
            removeEmptyAttrs: true,
            removeHiddenElems: true,
            removeEmptyText: true,
            removeEmptyContainers: true,
            removeViewBox: false,
            cleanupEnableBackground: true,
            minifyStyles: true,
            convertStyleToAttrs: true,
            removeUnknownsAndDefaults: true,
            removeUselessStrokeAndFill: true,
            removeUnusedNS: true,
            cleanupIDs: true,
            moveElemsAttrsToGroup: true,
            moveGroupAttrsToElems: true,
            collapseGroups: true,
            removeRasterImages: true,
            mergePaths: true,
            sortAttrs: true,
            removeScriptElement: true,
          }
        })
      ]
  });
  console.log('SVG optimized!');

  /**
   * Start convert jpg and png images to webp
   */
  await imagemin(
    ['./build/assets/**/*.{jpg,png}'], {
      destination: './build/assets/',
      plugins: [
        imageminWebp({ quality: 75 })
      ]
  })
  console.log('Success convert all images to webp!');
})();