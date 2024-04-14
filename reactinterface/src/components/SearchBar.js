import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Search2Icon } from "@chakra-ui/icons";

/**
 * Made by collin katz
 * Searches data for a string in searchfield for the input of the searcu
 * sets the filtered data using a setFilteredData function handle
 * 
 * data should be an array
 * searchField should be a field of each element of data
 * setFilteredData should be a function handle accepting an array
 */
function SearchBar({data, searchField, setFilteredData}) {

    useEffect(() => {
        filterData("")
    }, [data])

    function filterData(input) {
        if (input !== "") {
            setFilteredData(
                data.filter((item) => {
                    if (item[searchField] !== undefined && item[searchField].toLowerCase().includes(input.toLowerCase())) { // Check not undefined
                        return item;
                    } else if (item[searchField] === undefined) {
                        console.log(searchField + " is not a field of ", item);
                    }
                })
            );
        } else {
            return setFilteredData(
                data.filter((item) => {
                    return item;
                })
            );
        }
    }

    function handleChange(event) {
        filterData(event.target.value)
    }

    return (
        <div className="search-bar">
            <InputGroup>
                <InputLeftElement pointerEvents='none'>
                    <Search2Icon color='gray.300' />
                </InputLeftElement>
                <Input
                    onChange={handleChange}
                    placeholder="Search"
                />
            </InputGroup>
        </div>
    );
}

export default SearchBar;