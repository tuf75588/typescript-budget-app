import React from "react";
import { SingleBudgetItem } from "../types";
import IconBin from "./icon-bin";

function BudgetItem(props: SingleBudgetItem) {
  return (
    <div className="budget-item">
      <div className="budget-item-paid">
        {/* checkbox to mark item as paid or unpaid */}
        <input type="checkbox" className="custom-checkbox-checkbox" />
      </div>
    </div>
  );
}
export default BudgetItem;
