import React, { useState } from "react";
import BudgetTotal from "../components/budget-total";
import ItemList from "../components/item-list";
import AddBudgetItem from "../components/add-budget-item";
import IconSettings from "../components/icon-settings";
import { HomePageType, BudgetItemObject } from "../types";

function HomePage(props: HomePageType) {
  const [budgetPaid, setBudgetPaid] = useState<number>(0);
  const [showAddItem, setShowAddItem] = useState<boolean>(false);
  return (
    <div>
      <h1>Home page!</h1>
    </div>
  );
}

export default HomePage;
