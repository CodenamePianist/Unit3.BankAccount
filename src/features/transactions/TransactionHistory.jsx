import "./transactionHistory.scss";
import { useSelector } from "react-redux";

/** Displays a table row with transaction information  */
const TransactionRow = ({
  transaction: { type, amount, balance, recipient },
}) => (
  <tr>
    <th scope="row">
      {type}
      {recipient ? `/${recipient}` : ""}
    </th>
    <td>{amount.toFixed(2)}</td>
    <td>{balance.toFixed(2)}</td>
  </tr>
);

/** Displays a table of the user's transaction history. */
export default function TransactionHistory() {
  // TODO: Get the transaction history from the Redux store using the useSelector hook
  const history = useSelector((state) => state.transactions.history);
  console.log(history);
  return (
    <section className="transactions-history container">
      <h2>Transaction History</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Type</th>
            <th scope="col">Amount</th>
            <th scope="col">Balance</th>
          </tr>
        </thead>
        <tbody>
          {history &&
            history.map((transaction, index) => {
              return <TransactionRow transaction={transaction} key={index} />;
            })}
        </tbody>
      </table>
    </section>
  );
}
