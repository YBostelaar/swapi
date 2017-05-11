module.exports = (html = '') => (
    `
        <meta charset="utf-8">
        <title>React Redux Boilerplate</title>
        ${html ? '<link rel="stylesheet" type="text/css" href="style.css">' : ''}
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet">

        <div id="app">${html}</div>
        <script src="${html ? '' : '/dist/'}bundle.js"></script>
    `
);
