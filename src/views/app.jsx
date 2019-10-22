const React = require("react");
const classes = require("classnames");
const DefaultLayout = require("./layouts/default");

const Header = ({ userScreenName }) => (
    <header className="header">
        <h1>Moi {userScreenName}</h1>
        <p>
            Tässä on sinun velat. Muista että maksamisen jälkeen voi kestää jonkin
            aikaa ennenkuin maksun suoritus näkyy sivuilla.
        </p>
    </header>
);

const PaymentDetailsRow = ({ text, content }) => (
    <tr className="payment-details-row">
        <td>{text}</td>
        <td className="payment-details-row__value">{content}</td>
    </tr>
);

const PaymentDetails = () => (
    <section className="payment-details">
        <h2 className="payment-details__header">Maksutiedot</h2>
        <table className="payment-details__table">
            <tbody>
                <PaymentDetailsRow text="Tilinumero" content="FI89 7997 7995 1312 86" />
                <PaymentDetailsRow text="Saaja" content="TKO-äly ry" />
                <PaymentDetailsRow
                    text="Viitenumero"
                    content={<i>Velan viitenumero</i> /*lol just <i> it */}
                />
            </tbody>
        </table>
    </section>
);

/** @param {Debt} props*/
const DebtListItem = ({ event, amount, refnum }) => (
    <li className="debt-list-item">
        <p className="debt-list-item__title">{event}</p>

        <dl className="debt-list-item__content">
            <div className="debt-list-item__spec">
                <dt className="debt-list-item__spec-title">Hinta</dt>
                <dl className="debt-list-item__spec-value">{`${amount}€`}</dl>
            </div>

            <div className="debt-list-item__spec">
                <dt className="debt-list-item__spec-title">Viitenumero</dt>
                <dl className="debt-list-item__spec-value">{refnum}</dl>
            </div>
        </dl>

        <div className="debt-list-item__complain">
            <a
                className="debt-list-item__complain-button"
                href="http://t.me/jaloviina"
                rel="noopener noreferrer"
                target="_blank"
            >
        Valita
            </a>
        </div>
    </li>
);

/** @param {{debts: Debt[], isPaid?: boolean}} props */
const DebtList = ({ debts, isPaid }) => (
    <ul className={classes("debt-list", { "debt-list--paid": isPaid })}>
        {debts.map(debt => (
            <DebtListItem key={debt.refnum} {...debt} />
        ))}
    </ul>
);

/** @param {{debts: Debt[]}} props */
const Debts = ({ debts }) => (
    <section className="debts">
        <h2 className="debts__header">Velat</h2>
        <DebtList debts={debts} />
    </section>
);

/** @param {{debts: Debt[]}} */
const Paid = ({ debts }) => (
    <section className="paid">
        <h2 className="paid__header">Maksettu</h2>
        <DebtList isPaid={true} debts={debts} />
    </section>
);

module.exports = function app({ debt, userScreenName }) {
    const paid = debt.filter(_ => _.payed === 1);
    const unpaid = debt.filter(_ => _.payed !== 1);

    return (
        <DefaultLayout>
            <div className="app">
                <main className="app__container">
                    <Header userScreenName={userScreenName} />
                    <PaymentDetails />
                    <Debts debts={unpaid} />
                    <Paid debts={paid} />
                </main>
            </div>
        </DefaultLayout>
    );
};
