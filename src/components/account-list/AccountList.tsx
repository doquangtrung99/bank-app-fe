import { Props } from "../../interfaces";
import AccountListItem from "../account-list-item/AccountListItem";
import "./AccountList.css";


const AccountList = ({ accountList }: Props) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th id="acountId">Account ID</th>
            <th id="userId">UserId</th>
            <th id="type">Type</th>
            <th id="balance">Balance</th>
            <th id="action">Transaction</th>
          </tr>
        </thead>
        <tbody>
          {accountList &&
            accountList.length > 0 &&
            accountList.map((account, index) => {
              return <AccountListItem key={index} account={account} />;
            })}
        </tbody>
      </table>
    </div>
  );
};

export default AccountList;
