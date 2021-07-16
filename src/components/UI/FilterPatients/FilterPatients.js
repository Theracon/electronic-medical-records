import React from "react";
import styles from "./FilterPatients.module.css";

class FilterPatients extends React.Component {
  render() {
    let filterDisplay = null;
    if (this.props.show) {
      filterDisplay = (
        <React.Fragment>
          <div>
            <button>all patients</button>
          </div>
          <div>
            <select>
              <option value="male">M</option>
              <option value="female">F</option>
            </select>
            <button>filter by gender</button>
          </div>
          <div>
            <input type="number" placeholder="From" />
            <input type="number" placeholder="To" />
            <button>filter by age</button>
          </div>
          <div>
            <input type="number" placeholder="From" />
            <input type="number" placeholder="To" />
            <button>filter by BMI</button>
          </div>
        </React.Fragment>
      );
    }
    return (
      <div className={styles.Container}>
        <div>
          <i className="fas fa-filter" onClick={this.props.toggle}></i>
        </div>
        {filterDisplay}
      </div>
    );
  }
}

export default FilterPatients;
