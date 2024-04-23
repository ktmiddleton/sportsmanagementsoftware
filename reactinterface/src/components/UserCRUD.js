import React, { useEffect, useState } from "react";
import { useUser } from "./UserContext";
import axios from "axios";
import { ButtonGroup, HStack, Heading, IconButton, Table, Tbody, Td, Text, Tfoot, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import SearchBar from "./SearchBar";
import EditFormButton from "./permissions/EditFormButton";
import DeleteFormButton from "./permissions/DeleteFormButton";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import CreateUserButton from "./permissions/CreateUserButton";
import EditUserButton from "./permissions/EditUserButton";
import DeleteUserButton from "./permissions/DeleteUserButton";

function UserCRUD() {

    const { user, loadUserData, userHasGroup, userHasPerm } = useUser();

    // const [formInfo, setFormInfo] = useState([]);

    const [userInfo, setUserInfo] = useState([]);
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
        if (userHasPerm("can_create_users")) {
            axios.get(
                `http://localhost:8000/user/allusers/?token=${localStorage.getItem("token")}`
            )
            .then((response) => {
                console.log(response.data);
                setUserInfo(response.data.data);
                setPageData(response.data.pages);
            })
            .catch((error) => {
                console.log("Error getting user forms");
                console.log(error);
            })
        }
    }, [user]);

    return (
        <div id="user-crud">
            <VStack
                alignItems={"stretch"}
            >
            {userHasPerm("can_view_users") ?
                <>
                    <Heading
                        color="brand.black"
                        textAlign="left"
                        m="1rem"
                    >
                        User Administration
                    </Heading>
                    <HStack
                        width="100%"
                    >
                        <CreateUserButton />
                        {/* <SearchBar data={formInfo} searchField={"name"} setFilteredData={setFilterFormInfo} /> */}
                        <SearchBar mode="server" endpoint={`user/allusers/?token=${localStorage.getItem("token")}`} setFilteredData={setUserInfo} setPageData={setPageData} page={pageNumber} modelType="data" />
                    </HStack>
                    <Table size="lg">
                        <Thead>
                            <Tr>
                                <Th>Id</Th>
                                <Th>First Name</Th>
                                <Th>Last Name</Th>
                                <Th>Username</Th>
                                <Th>Email</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {console.log(userInfo)}
                            {userInfo?.map( (item) => {
                                return (
                                    <Tr>
                                        <Td>{item.id}</Td>
                                        <Td>{item.first_name}</Td>
                                        <Td>{item.last_name}</Td>
                                        <Td>{item.username}</Td>
                                        <Td>{item.email}</Td>
                                        <Td>
                                            <ButtonGroup>
                                                <EditUserButton username={item.username} email={item.email} first_name={item.first_name} last_name={item.last_name}/>
                                                <DeleteUserButton username={item.username}/>
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

export default UserCRUD;