import React from "react";


const SearchForm = (props) => {
    return (
        <div>
        <section className="search-form">
            <form>
             <input
                type="text"
                onChange={props.handleInputChange}
                value={props.setQuery}
                name="name"
                tabIndex="0"
                placeholder="Search"
            />
            </form>
        </section>
        </div>
    )
}

export default SearchForm;