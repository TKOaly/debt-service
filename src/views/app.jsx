const React = require('react')
const DefaultLayout = require('./layouts/default')

module.exports = function app({debt, userScreenName} ) {
  return (
    <DefaultLayout>
      <div style={{fontFamily: 'Arial'}}>
        <h1>Moi {userScreenName}</h1>
        <h3>Tässä on sinun velat. Muista että maksamisen jälkeen voi kestää jonkin aikaa ennenkuin maksun suoritus näkyy sivuilla. Punaisella merkityt maksut ovat maksamattomia ja vihreät maksettuja.</h3>
        <h2>Maksutiedot: </h2>
        <p>Tilinumero: FI89 7997 7995 1312 86</p>
        <p>Saaja: TKO-äly ry</p>
        <br />
        <br />
        {renderDebtTable(debt)}
      </div>
    </DefaultLayout>
  )
}

function renderDebtTable(debt) {
  const payed = debt.filter(({payed}) => payed === 1)
  const unpayed = debt.filter(({payed}) => payed !== 1)
  return (
    <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', width: '100%'}}>
      <div style={{width: '100%'}}>
        <h2>Velat:</h2>
        {unpayed.map(({event, amount, refnum}) => (
          <div style={{margin: '40px', border: 'solid 2px rgba(0,0,0,0.2)', borderRadius: '20px', padding: '2em'}}>
            <h4>{event}</h4>
            <p>Hinta: {amount}€</p>
            <p>Viitenumero: {refnum}</p>
          </div>
        ))}
      </div>
      <div style={{width: '100%'}}>
        <h2>Maksettu:</h2>
        {payed.map(({event, amount, refnum}) => (
          <div style={{margin: '40px', border: 'solid 2px rgba(0,0,0,0.2)', borderRadius: '20px', padding: '2em'}}>
            <h4>{event}</h4>
            <p>Hinta: {amount}€</p>
            <p>Viitenumero: {refnum}</p>
          </div>
        ))}
      </div>
    </div>
  )
}