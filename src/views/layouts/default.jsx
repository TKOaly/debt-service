const React = require('react')

module.exports = function DefaultLayout(props) {
  return (
    <h1ml>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {props.children}
      </body>
    </h1ml>
  )
}