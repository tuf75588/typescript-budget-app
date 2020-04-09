import React, { useState, useEffect } from "react";
import BudgetTotal from "../components/budget-total";
import ItemList from "../components/item-list";
import AddBudgetItem from "../components/add-budget-item";
import IconSettings from "../components/icon-settings";
import { HomePageType, BudgetItemObject } from "../types";

function HomePage(props: HomePageType) {
  const [budgetPaid, setBudgetPaid] = useState<number>(0);
  const [showAddItem, setShowAddItem] = useState<boolean>(false);

  const handleStorageType = (
    task: "get" | "update",
    newState: BudgetItemObject[]
  ) => {
    if (props.storageMethod === "local") {
      if (task === "update") {
        window.localStorage.setItem("budget-app", JSON.stringify(newState));
      } else {
        const recoveredState = window.localStorage.getItem("budget-app");
        if (recoveredState) {
          props.setBudgetItems(JSON.parse(recoveredState));
        }
      }
    } else if (props.storageMethod === "session") {
      if (task === "update") {
        // overwrite items in session storage
        window.sessionStorage.setItem("budget-app", JSON.stringify(newState));
      } else {
        // if there's already data in session storage
        const recoveredSessionStorage = window.sessionStorage.getItem(
          "budget-app"
        );
        // falsy check
        if (recoveredSessionStorage) {
          props.setBudgetItems(JSON.parse(recoveredSessionStorage));
        }
      }
    }
  };

  const handleItemUpdate = (
    value: string,
    itemProperty: string,
    id: string
  ) => {
    const newBudgetCopy: BudgetItemObject[] = [...props.budgetItems];
    switch (itemProperty) {
      case "isPaid":
        newBudgetCopy.find(
          (item: BudgetItemObject) => item.id === id
        )!.isPaid = !newBudgetCopy.find(
          (item: BudgetItemObject) => item.id === id
        )!.isPaid;
        break;
      case "price":
        // Find 'price' property and update it with new value
        newBudgetCopy.find(
          (item: BudgetItemObject) => item.id === id
        )!.price = parseInt(value, 10);
        break;
      case "title":
        // Find 'title' property and update it with new value
        newBudgetCopy.find(
          (item: BudgetItemObject) => item.id === id
        )!.title = value;
        break;
    }

    props.setBudgetItems(newBudgetCopy);

    handleStorageType("update", newBudgetCopy);
  };

  useEffect(() => {
    let costs = 0;

    // iterate over items and add price to total cost
    props.budgetItems.forEach((item: BudgetItemObject) => {
      if (item.isPaid) {
        costs += item.price;
      }
    });
    setBudgetPaid(costs);
    // sync the callback with this prop
  }, [props.budgetItems]);
  return (
    <div>
      <h1>Home page!</h1>
    </div>
  );
}

export default HomePage;
