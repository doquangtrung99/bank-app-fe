import { ACCOUNT_TYPE, IAccountItem } from "../../constant";
import "./AccountListItem.css";

interface Props {
  account: IAccountItem;
}

const AccountListItem = ({ account }: Props) => {
  return (
    <tr id={`row-${account.accountId}-${account.userId}`}>
      <td>{account.accountId}</td>
      <td>{account.userId}</td>
      <td>{account.type === ACCOUNT_TYPE.CURRENT ? "Current" : "Savings"}</td>
      <td>{account.balance}</td>
      <td className="start">
        <button disabled={account.type === ACCOUNT_TYPE.CURRENT}>Start</button>
      </td>
    </tr>
  );
};

export default AccountListItem;
