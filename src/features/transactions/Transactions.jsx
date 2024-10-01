import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deposit, withdrawal, transfer } from "./transactionsSlice";
import "./transactions.scss";

/**
 * Allows users to deposit to, withdraw from, and transfer money from their account.
 */
export default function Transactions() {
  // TODO: Get the balance from the Redux store using the useSelector hook
  const balance = useSelector((state) => state.transactions.balance);
  const dispatch = useDispatch();

  const [amountStr, setAmountStr] = useState("0.00");

  /** Dispatches a transaction action based on the form submission. */
  const onTransaction = (event) => {
    event.preventDefault();
    console.log("Button Pressed!");

    // This changes depending on which button the user clicked to submit the form.
    // It will be either "deposit", "withdraw", or "transfer".
    const action = event.nativeEvent.submitter.name;
    const recipient = event.target.recipient.value;

    const amount = +amountStr;
    console.log(amount, balance);

    // TODO: Dispatch the appropriate transaction action based on `action`
    if (action === "withdraw") {
      dispatch(withdrawal(amount));
    } else if (action === "deposit") {
      dispatch(deposit(amount));
      console.log("Deposit pushed");
    } else if (action === "transfer") {
      dispatch(transfer({ amount: amount, recipient: recipient }));
      console.log(recipient);
    }
  };

  return (
    <section className="transactions container">
      <h2>Transactions</h2>
      <figure>
        <figcaption>Current Balance &nbsp;</figcaption>
        <strong>${balance}</strong>
      </figure>
      <form onSubmit={onTransaction}>
        <div className="form-row">
          <label>
            Amount
            <input
              type="number"
              inputMode="decimal"
              min={0}
              step="0.01"
              value={amountStr}
              onChange={(event) => setAmountStr(event.target.value)}
            />
          </label>
          <div>
            <button default name="deposit">
              Deposit
            </button>
            <button name="withdraw">Withdraw</button>
          </div>
        </div>
        <div className="form-row">
          <label>
            Transfer to
            <input type="text" placeholder="Recipient Name" name="recipient" />
          </label>
          <button name="transfer">Transfer</button>
        </div>
      </form>
    </section>
  );
}
