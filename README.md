# [compressMe](https://aa-compressme.herokuapp.com/)

compressMe is a client-side image compressor that makes for an easy, non-intrusive way of compressing image files on the Web. Because it doesn't upload files to any servers, compressMe is a fast, 100% private alternative to websites like [compressor.io](https://compressor.io/) and [tinyJPG](https://tinyjpg.com/). It also doesn't impose size limits on the files you upload or try to sell you stuff. 

## Requirements
* Node `14.15.1`
* Express `4.17.1`
* Webpack `5.46.0`
* TypeScript `4.3.5`

## Run locally

Clone the repo to a local directory.

```bash
$ git clone https://github.com/jpaul121/compressMe.git
```

Use the package manager [npm](https://www.npmjs.com/) to install the repo's dependencies. 

```bash
$ npm install
```

Build the app from source using Webpack.

```bash
$ npm run build
```

Start up the Express server.

```bash
$ npm start
```

Finally, navigate to `localhost:8000` on your web browser to run the app locally on your computer. 

## Settings

### Image Quality

Determines the quality of the compressed image returned by the app. Higher quality means a larger file size, so if you want it to be smaller you should consider reducing it. 

### Max Width (px)

Sets the maximum width of the compressed image(s) produced by the app in pixels. 

### Max Height (px)

Sets the maximum height of the compressed image(s) produced by the app in pixels. 

## License
[MIT](https://choosealicense.com/licenses/mit/)