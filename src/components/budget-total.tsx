import React from "react";
import { BudgetTotal as Amount } from "../types";

function BudgetTotal(props: Amount) {
  return (
    <div className="budget-total">
      <h2>
        <span className="budget-period">You props.budgetperiod</span>{" "}
        <span className="budget-label">budget:</span>
        <span className="budget-total-edit-later">
          an expression will go here
        </span>
      </h2>
    </div>
  );
}

export default BudgetTotal;
