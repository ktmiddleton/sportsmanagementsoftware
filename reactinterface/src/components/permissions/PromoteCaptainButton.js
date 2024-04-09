import React from "react";
import { DeleteIcon } from '@chakra-ui/icons';
import { Button, IconButton, Tooltip, useDisclosure } from "@chakra-ui/react";
import { useUser } from "../UserContext";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteClubSportForm from "./forms/DeleteClubSportForm";
import PromoteCaptainForm from "./forms/PromoteCaptainForm";

const PERM_NAME = "can_promote_captain";

function PromoteCaptainButton({ teamData }) {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { user, loadUserData, userHasGroup, userHasPerm, userInClubTeam, userCaptainingTeam } = useUser();

    function buttonClick() {
        if (userHasPerm(PERM_NAME)) {
            onOpen();
        }
    }

    return (
        // In short, the user must either be an admin or must be a captain OF THIS TEAM in order to promote other users to captain
        userHasGroup("admin") || (userHasPerm(PERM_NAME) && userCaptainingTeam(teamData.id)) ?
            <div className="promote-captain-button">
                <Tooltip hasArrow label='Promote User to Captain' bg='gray.300' color='black'>
                    <Button
                        m="1rem"
                        aria-label="Add"
                        leftIcon={<PersonAddIcon />}
                        isRound={true}
                        size="lg"
                        bg="brand.brightGreen"
                        onClick={() => buttonClick()} // Define your click event handler
                    >
                        Add Captain
                    </Button>
                </Tooltip>
                <PromoteCaptainForm teamData={teamData} isOpen={isOpen} onClose={onClose} />
            </div>
        :
            <></>
    );
}

export default PromoteCaptainButton;