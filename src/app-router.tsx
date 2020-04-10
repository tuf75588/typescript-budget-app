import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from './views/home';
import SettingsPage from './views/settings';

// budget item type object
import { BudgetItemObject } from './types';

function AppRouter() {
  // application states
  const [budgetItems, setBudgetItems] = useState<BudgetItemObject[]>([]);
  const [budgetPeriod, setBudgetPeriod] = useState<string>('monthly');
  const [budgetCurrency, setBudgetCurrency] = useState<string>('USD');
  const [budgetAmount, setBudgetAmount] = useState<number>(2500);
  const [storageMethod, setStorageMethod] = useState<string>('none');

  useEffect(() => {
    if (
      window &&
      window.sessionStorage &&
      window.sessionStorage.getItem('budget-app-settings') !== null &&
      window.sessionStorage.getItem('budget-app-settings')!.length > 0
    ) {
      const recoveredSessionStorage = window.sessionStorage.getItem(
        'budget-app-settings'
      );
      if (recoveredSessionStorage) {
        const {
          oldBudgetPeriod,
          oldBudgetCurrency,
          oldBudgetAmount,
          oldStorageMethod,
        } = JSON.parse(recoveredSessionStorage);

        // update all our states
        setBudgetPeriod(oldBudgetPeriod);
        setBudgetCurrency(oldBudgetCurrency);
        setBudgetAmount(oldBudgetAmount);
        setStorageMethod(oldStorageMethod);
      }
    } else if (
      window &&
      window.localStorage &&
      window.localStorage.getItem('budget-app-settings') !== null &&
      window.localStorage.getItem('budget-app-settings')!.length > 0
    ) {
      // Of if there are any existing data for settings in localStorage
      // Get data from localStorage
      const recoveredSettings = window.localStorage.getItem(
        'budget-app-settings'
      );

      // If storage contains any data process them
      if (recoveredSettings) {
        // Get all recovered state data
        const {
          oldBudgetPeriod,
          oldBudgetCurrency,
          oldBudgetAmount,
          oldStorageMethod,
        } = JSON.parse(recoveredSettings);

        // Update all settings
        setBudgetPeriod(oldBudgetPeriod);
        setBudgetCurrency(oldBudgetCurrency);
        setBudgetAmount(oldBudgetAmount);
        setStorageMethod(oldStorageMethod);
      }
    }

    // now check for existing items in our budge list, first we did personal user settings
    if (
      window &&
      window.sessionStorage &&
      window.sessionStorage.getItem('budget-app') !== null &&
      window.sessionStorage.getItem('budget-app')!.length > 0
    ) {
      // if this check passes, there are some items in session storage
      const recoveredItems = window.sessionStorage.getItem('budget-app');
      if (recoveredItems) {
        const { oldItems } = JSON.parse(recoveredItems);
        setBudgetItems(oldItems);
      }
    } else if (
      window &&
      window.localStorage &&
      window.localStorage.getItem('budget-app') !== null &&
      window.localStorage.getItem('budget-app')!.length > 0
    ) {
      // Of if there are any existing data for items in localStorage
      // Get items data from localStorage
      const recoveredItems = window.localStorage.getItem('budget-app');

      // If there are any items to be recovered
      if (recoveredItems) {
        // Extract recovered items data
        const { oldItems } = JSON.parse(recoveredItems);

        // Update budgetItems state
        setBudgetItems(oldItems);
      }
    }
    // run on the initial render only
  }, []);
}
