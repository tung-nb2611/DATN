import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import '../../assets/css/pagination/pagination.css'

Pagination.prototype = {
    pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func,
}

Pagination.defaultProps = {
    onPageChange: null,
};

export default function Pagination(props) {
    const { pagination, onPageChange } = props;
    const { page, limit, totalRows } = pagination
    const totalPages = Math.ceil(totalRows / limit);
    const pageNumbers = [];
    const [pageCC, setPageCC] = useState(page);
    for (let i = 1; i <= Math.ceil(totalPages); i++) {
        pageNumbers.push(i)
    }

    function nextPage (){
        setPageCC(pageCC + 1)
    }

    function privewPage (){
        setPageCC(pageCC - 1)
    }

    function changePage (number){
        setPageCC(number)
    }

    return (
        <div style={{ display: "flex", width: "600px", margin: "auto" }}>
            <ul id="page-numbers">
                <li>
                    <button
                        disabled={pageCC <= 1}
                        onClick={() => privewPage()}
                        // onClick={() => setPageCC(pageCC - 1)}
                    >
                        Prev
                    </button>
                </li>
                {
                    pageNumbers.map(number => {
                        if (pageCC === number) {
                            return (
                                <li key={number} id={number} className="active">
                                    <button style={{ background: "#bbbbbb" }}>{number}</button>
                                </li>
                            )
                        }
                        else {
                            return (
                                <li key={number} id={number} onClick={() => changePage(number)} >
                                {/*<li key={number} id={number} onClick={() => setPageCC(number)} >*/}
                                    <button>{number}</button>
                                </li>
                            )
                        }
                    })
                }
                <li>
                    <button
                        disabled={pageCC >= totalPages}
                        onClick={() => nextPage()}
                        // onClick={() => setPageCC(pageCC + 1)}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </div>
    )
}
