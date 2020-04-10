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

  // this effect will be responsible for updating items if budgetItems or storageMethod changes
  useEffect(() => {
    if (storageMethod === 'session') {
      // save items in sessionStorage
      window.sessionStorage.setItem(
        'budget-app',
        JSON.stringify({ oldItems: budgetItems })
      );
      // remove duplicate data in localStorage
      window.localStorage.removeItem('budget-app');
    } else if (storageMethod === 'local') {
      // save in localStorage
      window.localStorage.setItem(
        'budget-app',
        JSON.stringify({
          oldItems: budgetItems,
        })
      );
      // remove duplicate items in session storage
      window.sessionStorage.removeItem('budget-app');
    } else if (storageMethod === 'none') {
      // remove everything
      window.sessionStorage.removeItem('budget-app');
      window.localStorage.removeItem('budget-app');
    }
  }, [budgetItems, storageMethod]);

  // last effect, run if setting specific things change, budgetPeriod, budgetCurrency, budgetAmount, storageMethod..
  useEffect(() => {
    if (storageMethod === 'session') {
      // save new settings to session storage
      window.sessionStorage.setItem(
        'budget-app-settings',
        JSON.stringify({
          oldBudgetPeriod: budgetPeriod,
          oldBudgetCurrency: budgetCurrency,
          oldBudgetAmount: budgetAmount,
          oldStorageMethod: storageMethod,
        })
      );
      // remove duplicate info in localStorage
      window.localStorage.removeItem('budget-app-settings');
    } else if (storageMethod === 'local') {
      window.localStorage.setItem(
        'budget-app-settings',
        JSON.stringify({
          oldBudgetPeriod: budgetPeriod,
          oldBudgetCurrency: budgetCurrency,
          oldBudgetAmount: budgetAmount,
          oldStorageMethod: storageMethod,
        })
      );
      // remove from session-storage
      window.sessionStorage.removeItem('budget-app-settings');
    } else if (storageMethod === 'none') {
      // Remove all previous data from both storages
      window.localStorage.removeItem('budget-app-settings');
      window.sessionStorage.removeItem('budget-app-settings');
    }
  }, [budgetAmount, budgetCurrency, budgetPeriod, storageMethod]);

  return (
    <div className="app">
      <Router>
        <Switch>
          {/* HOMEPAGE */}
          <Route exact path="/">
            <HomePage
              budgetItems={budgetItems}
              budgetAmount={budgetAmount}
              budgetCurrency={budgetCurrency}
              budgetPeriod={budgetPeriod}
              setBudgetItems={setBudgetItems}
              storageMethod={storageMethod}
            />
          </Route>
          {/* Add settings */}
          <Route path="/settings">
            <SettingsPage
              budgetPeriod={budgetPeriod}
              budgetCurrency={budgetCurrency}
              budgetAmount={budgetAmount}
              storageMethod={storageMethod}
              setBudgetPeriod={setBudgetPeriod}
              setBudgetCurrency={setBudgetCurrency}
              setBudgetAmount={setBudgetAmount}
              setStorageMethod={setStorageMethod}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default AppRouter;
