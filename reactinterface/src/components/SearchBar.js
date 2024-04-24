import { Button, Input, InputGroup, InputLeftElement, InputRightElement, ModalOverlay, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Search2Icon } from "@chakra-ui/icons";
import axios from "axios";

/**
 * Made by collin katz
 * Searches data for a string in searchfield for the input of the search
 * sets the filtered data using a setFilteredData function handle
 * 
 * data: should be an array
 * searchField: should be a field of each element of data
 * setFilteredData: should be a function handle accepting an array and will set the state of a variable that holds the filtered output of data
 * setPageData: should be a function handle to set page metadata {start_index, end_index, count}
 * mode: {"filter", "server"}
 * | filter = filter the data set that was passed for a search term
 * | server = makes a request to the backend passing a &search=_input_ parameter to the specified endpoint
 * endpoint: A string, like "forms/?token=${localStorage.getItem("token")}&info=1" that has a get endpoint that can recieve a '&search=_input_' parameter
 * | NOTE: Be careful when passing the endpoint and make sure to send any necessary parameters along with it since all this does is append a &search onto it
 * page: An int, uses the &page=_page number_ parameter to return multiple pages of a search
 * modelType: used to access data for different model types. Examples: form, class, etc.
 */
function SearchBar({data, searchField, setFilteredData, setPageData, mode, endpoint, page, modelType}) {

    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (mode === "filter") {
            filterData("");
        }
    }, [data])

    useEffect(() => {
        searchBackend();
    }, [page])

    function searchBackend() {
        axios.get(
            `${process.env.REACT_APP_DJANGO_SERVER_URL}/${endpoint}&search=${searchTerm}` + (page ? `&page=${page}` : "") // ensure page not undefined
        ).then((response) => {
            setFilteredData(response.data[modelType]); // TODO: Issue with endpoints, there is no reason to be returning the data from an endpoint under some field name. Change endpoints to not return data under a modeltype fieldname.
            if (response.data.pages !== undefined && setPageData !== undefined) {
                setPageData(response.data.pages);
            }
        }).catch((error) => {
            console.log("Error getting data from server");
            setFilteredData([]);
        });
    }

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
        if (mode === "filter") {
            filterData(event.target.value);
        } else if (mode === "server") {
            setSearchTerm(event.target.value);
        } else {
            console.log("Must specify mode for search bar");
        }
    }

    return (
        <div className="search-bar">
            <InputGroup>
                {mode === "filter" ?
                    <InputLeftElement pointerEvents='none'>
                        <Search2Icon color='gray.300' />
                    </InputLeftElement>
                :
                    <></>
                }
                <Input
                    onKeyUp={e=> {
                        if (e.key === 'Enter' && mode === "server") {
                            searchBackend();
                        }
                    }}
                    onChange={handleChange}
                    placeholder="Search"
                />
                {mode === "server" ?
                    <InputRightElement>
                        <Button type="submit" width="100%" m="2px" onClick={() => searchBackend()}>
                            <Search2Icon color='gray.500' />
                        </Button>
                    </InputRightElement>
                :
                    <></>
                }
            </InputGroup>
        </div>
    );
}

export default SearchBar;