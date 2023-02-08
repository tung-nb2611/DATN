/* eslint-disable no-unused-vars */
import React, { useState }  from 'react'
import PropTypes from 'prop-types'
import '../../assets/css/search/month.css'

MonthFilters.propTypes = {
    onSubmit: PropTypes.func,
}
MonthFilters.defaultProps = {
    onSubmit: null,
}

function MonthFilters(props) {

    const { onSubmit } = props;
    const [month, setMonth] = useState();

    function handleChangeMonth(e) {
        const value = e.target.value;
        setMonth(value);
        const formValues = {
            month: value,
        }
        onSubmit(formValues);
    }

    return (
        <div className="filter-month">
            <form>
                <select value={month}
                    onChange={handleChangeMonth}
                    className="month-choose"
                >
                    <option value="1">&nbsp;&nbsp;&nbsp;&nbsp;Tháng 1</option>
                    <option value="2">&nbsp;&nbsp;&nbsp;&nbsp;Tháng 2</option>
                    <option value="3">&nbsp;&nbsp;&nbsp;&nbsp;Tháng 3</option>
                    <option value="4">&nbsp;&nbsp;&nbsp;&nbsp;Tháng 4</option>
                    <option value="5">&nbsp;&nbsp;&nbsp;&nbsp;Tháng 5</option>
                    <option value="6">&nbsp;&nbsp;&nbsp;&nbsp;Tháng 6</option>
                    <option value="7">&nbsp;&nbsp;&nbsp;&nbsp;Tháng 7</option>
                    <option value="8">&nbsp;&nbsp;&nbsp;&nbsp;Tháng 8</option>
                    <option value="9">&nbsp;&nbsp;&nbsp;&nbsp;Tháng 9</option>
                    <option value="10">&nbsp;&nbsp;&nbsp;&nbsp;Tháng 10</option>
                    <option value="11">&nbsp;&nbsp;&nbsp;&nbsp;Tháng 11</option>
                    <option value="12">&nbsp;&nbsp;&nbsp;&nbsp;Tháng 12</option>
                </select>
            </form>
        </div>
    )
}

MonthFilters.propTypes = {

}

export default MonthFilters

