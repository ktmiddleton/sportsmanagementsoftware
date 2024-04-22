import React, { useEffect, useState } from "react";
import { useUser } from "./UserContext";
import axios from "axios";
import { ButtonGroup, HStack, Heading, IconButton, Table, Tbody, Td, Text, Tfoot, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import CreateFormButton from "./permissions/CreateFormButton";
import SearchBar from "./SearchBar";
import EditFormButton from "./permissions/EditFormButton";
import DeleteFormButton from "./permissions/DeleteFormButton";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

function FormCRUD() {

    const { user, loadUserData, userHasGroup, userHasPerm } = useUser();

    const [formInfo, setFormInfo] = useState([]);

    const [filterFormInfo, setFilterFormInfo] = useState([]);
    const [pageData, setPageData] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    

    function incrementPage() {
        if (!(pageData.end_index >= pageData.count)) {
            setPageNumber(pageNumber + 1);
        }
    }

    function decrementPage() {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    }

    useEffect(() => {
        if (userHasPerm("can_create_forms")) {
            axios.get(
                `http://localhost:8000/forms/?token=${localStorage.getItem("token")}&info=1`
            )
            .then((response) => {
                console.log(response.data);
                setFormInfo(response.data.forms);
                setPageData(response.data.pages);
            })
            .catch((error) => {
                console.log("Error getting user forms");
                console.log(error);
            })
        }
    }, [user]);

    return (
        <div id="form-crud">
            <VStack
                alignItems={"stretch"}
            >
            {userHasPerm("can_read_forms") ?
                <>
                    <Heading
                        color="brand.black"
                        textAlign="left"
                        m="1rem"
                    >
                        Admin Forms
                    </Heading>
                    <HStack
                        width="100%"
                    >
                        <CreateFormButton />
                        {/* <SearchBar data={formInfo} searchField={"name"} setFilteredData={setFilterFormInfo} /> */}
                        <SearchBar mode="server" endpoint={`forms/?token=${localStorage.getItem("token")}&info=1`} setFilteredData={setFilterFormInfo} setPageData={setPageData} page={pageNumber} modelType="forms" />
                    </HStack>
                    <Table size="lg">
                        <Thead>
                            <Tr>
                                <Th>Id</Th>
                                <Th>Form Name</Th>
                                <Th>Form Assigned On</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {filterFormInfo.map( (item) => {
                                return (
                                    <Tr>
                                        <Td>{item.id}</Td>
                                        <Td>{item.name}</Td>
                                        <Td>
                                            <Text>{item.clubsport_join ? "Joining Club Sport" : ""}</Text>
                                            <Text>{item.class_join ? "Joining Class" : ""}</Text>
                                            <Text>{item.intramural_team_join ? "Joining Intramural Team" : ""}</Text>
                                        </Td>
                                        <Td>
                                            <ButtonGroup>
                                                <EditFormButton formData={item} />
                                                <DeleteFormButton pk={item.id} />
                                            </ButtonGroup>
                                        </Td>
                                    </Tr>
                                )
                            })}
                        </Tbody>
                        <Tfoot>
                            <HStack>
                                <IconButton
                                    m="1rem"
                                    aria-label="Previous Page"
                                    icon={<ChevronLeftIcon />}
                                    isRound={true}
                                    size="lg"
                                    bg="gray.300"
                                    onClick={() => decrementPage()} // Define your click event handler
                                />
                                {pageData ? <Text>Showing {pageData.start_index}-{pageData.end_index} of {pageData.count}</Text> : <></>}
                                <IconButton
                                    m="1rem"
                                    aria-label="Next Page"
                                    icon={<ChevronRightIcon />}
                                    isRound={true}
                                    size="lg"
                                    bg="gray.300"
                                    onClick={() => incrementPage()} // Define your click event handler
                                />
                            </HStack>
                        </Tfoot>
                    </Table>
                </>
            :
                <></>
            }
            </VStack>
        </div>
    );

}

export default FormCRUD;