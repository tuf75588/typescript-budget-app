import React from "react";
import BudgetItem from "./budget-item";
import { BudgetList, BudgetItemObject } from "../types";
function ItemList(props: BudgetList) {
  return (
    <div className="budget-list">
      {props.budgetItems.map((item: BudgetItemObject) => {
        return (
          <BudgetItem
            budgetCurrency={props.budgetCurrency}
            budgetItem={item}
            key={item.id}
            handleItemRemove={props.handleItemRemove}
            handleItemUpdate={props.handleItemUpdate}
          />
        );
      })}
    </div>
  );
}
export default ItemList;
