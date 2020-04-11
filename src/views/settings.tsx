import React from 'react';
import { Link } from 'react-router-dom';

// currency codes
import currencyCodes from '../data/currencyCodes';

import { SettingsPage as SettingTypes } from '../types';

function SettingsPage(props: SettingTypes) {
  return (
    <div>
      <header>
        <h2>Settings</h2>
        <Link className="btn btn-cross btn-unstyled" to="/">
          x
        </Link>
      </header>
      <fieldset>
        <label htmlFor="period">Budget period:</label>
        <select
          name="period"
          id="period"
          onChange={(event) => props.setBudgetPeriod(event.currentTarget.value)}
        >
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </fieldset>
      <fieldset>
        <label htmlFor="currency">Budget currency:</label>
        <input
          type="text"
          name="currency"
          id="currency"
          list="currencyCodes"
          defaultValue={props.budgetCurrency}
          onChange={(event) =>
            props.setBudgetCurrency(event.currentTarget.value)
          }
        />
        <datalist id="currencyCodes">
          {currencyCodes.map((code) => (
            <option value={code} key={code} />
          ))}
        </datalist>
      </fieldset>
      <fieldset>
        <label htmlFor="storage">Preferred Storage Type</label>
        <select
          name="storage"
          id="storage"
          onChange={(event) =>
            props.setStorageMethod(event.currentTarget.value)
          }
          defaultValue={props.storageMethod}
        >
          <option value="none">None</option>
          <option value="local">Local Storage</option>
          <option value="session">Session Storage</option>
        </select>
      </fieldset>
      <p>
        <small>
          <em>* All changes are saved automatically.</em>
        </small>
      </p>
    </div>
  );
}
export default SettingsPage;
