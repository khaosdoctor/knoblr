# Knoblr ![NodeJs Dependencies](https://david-dm.org/khaosdoctor/knoblr.svg)

 Knoblr is a simple logging library to help node developers.

 It basically adds a funcionality of displaying three tips of logs:

 - Warns
 - Errors
 - Info

 Very simple. And it comes along with a timestamp and color codes!

 ## Installing

 Just do a `npm install --save knoblr`

 ## Using

 In your file require the logger:

 ```js
 const log = require('knoblr');
 ```

 Then you can use like this:

 ```js
 const log = require('knoblr');

 log.warn('This is a warn text');
 log.error('This is an error text');
 log.info('This is an info text');
 ```

 This will be the output:

![Log output](assets/sc.png)

