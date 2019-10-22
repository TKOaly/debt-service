const React = require("react");

module.exports = function DefaultLayout(props) {
    return (
        <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" type="text/css" href="/public/main.css" />
            </head>
            <body>{props.children}</body>
        </html>
    );
};
