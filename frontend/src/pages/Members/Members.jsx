import {
    useEffect,
    useState,
} from "react";

import {
    FaUserPlus,
} from "react-icons/fa";


import {
    MembersContainer,
    Header,
    HeaderContent,
    Title,
    Description,
    AddButton,
    Content,
    ErrorBox,
} from "./Members.styles";


import MemberStats from "./components/MemberStats/MemberStats";
import MemberFilters from "./components/MemberFilters/MemberFilters";
import MemberTable from "./components/MemberTable/MemberTable";
import MemberProfile from "./components/MemberProfile/MemberProfile";


import AddMemberModal from "./components/AddMemberModal/AddMemberModal";
import EditMemberModal from "./components/EditMemberModal/EditMemberModal";
import ConfirmDeactivateModal from "./components/ConfirmDeactivateModal/ConfirmDeactivateModal";


import membersService from "../../services/memberService";

import Loader from "../../components/ui/Loader/Loader";



const Members = () => {


    const [
        members,
        setMembers,
    ] = useState([]);



    const [
        loading,
        setLoading,
    ] = useState(true);



    const [
        error,
        setError,
    ] = useState("");



    const [
        selectedMember,
        setSelectedMember,
    ] = useState(null);



    const [
        showAddModal,
        setShowAddModal,
    ] = useState(false);



    const [
        editMember,
        setEditMember,
    ] = useState(null);



    const [
        deactivateMember,
        setDeactivateMember,
    ] = useState(null);



    const [
        filters,
        setFilters,
    ] = useState({

        search: "",

        status: "",

        gender: "",

        membershipStatus: "",

        engagement: "",

    });





    const loadMembers = async () => {

        try {


            setLoading(true);

            setError("");



            const response =
                await membersService.getMembers();



            const memberList =

                response?.data?.members ||

                response?.members ||

                [];



            setMembers(memberList);



        } catch (error) {


            setError(

                error.response?.data?.message ||

                "Unable to load members."

            );


        } finally {


            setLoading(false);


        }

    };






    useEffect(() => {

        loadMembers();

    }, []);







    const handleCreateMember = async (memberData) => {


        await membersService.createMember(
            memberData
        );


        await loadMembers();


    };








    const handleUpdateMember = async (
        id,
        memberData
    ) => {


        await membersService.updateMember(
            id,
            memberData
        );


        setEditMember(null);


        await loadMembers();


    };









    const handleDeactivateMember = async () => {


        if (!deactivateMember)
            return;



        await membersService.deactivateMember(

            deactivateMember._id

        );



        setDeactivateMember(null);


        setSelectedMember(null);



        await loadMembers();


    };









    const handleReactivateMember = async (member) => {


        await membersService.reactivateMember(

            member._id

        );



        setSelectedMember(null);



        await loadMembers();


    };








    if (loading) {


        return (

            <Loader text="Loading members..." />

        );

    }








    if (error) {


        return (

            <ErrorBox>

                {error}

            </ErrorBox>

        );

    }







    const activeMembers =

        members.filter(

            member => member.isActive

        ).length;







    const inactiveMembers =

        members.filter(

            member => !member.isActive

        ).length;







    const newMembersThisMonth =

        members.filter(member => {


            if (!member.createdAt)

                return false;



            const created =
                new Date(member.createdAt);



            const now =
                new Date();



            return (

                created.getMonth() === now.getMonth()

                &&

                created.getFullYear() === now.getFullYear()

            );


        }).length;









    const engagedMembers =

        members.filter(

            member =>

                member.attendanceCount > 0

        ).length;









    const filteredMembers =

        members.filter((member) => {



            const search =

                filters.search.toLowerCase();





            const fullName =

                `${member.firstName || ""} ${member.lastName || ""}`

                    .toLowerCase();






            const matchesSearch =

                fullName.includes(search)

                ||

                member.email?.toLowerCase()

                    .includes(search)

                ||

                member.phone?.toLowerCase()

                    .includes(search);









            const matchesStatus =


                filters.status === ""

                    ?

                    true

                    :

                    filters.status === "active"

                        ?

                        member.isActive

                        :

                        !member.isActive;









            const matchesGender =


                filters.gender === ""

                    ?

                    true

                    :

                    member.gender?.toLowerCase()

                    === filters.gender;









            const matchesMembershipStatus =


                filters.membershipStatus === ""

                    ?

                    true

                    :

                    member.membershipStatus

                    === filters.membershipStatus;









            const matchesEngagement =


                filters.engagement === ""

                    ?

                    true

                    :



                    filters.engagement === "ENGAGED"

                        ?

                        member.attendanceCount > 0



                        :



                        filters.engagement === "ACTIVE"

                            ?

                            member.isActive && member.attendanceCount > 0



                            :



                            member.attendanceCount === 0;










            return (

                matchesSearch

                &&

                matchesStatus

                &&

                matchesGender

                &&

                matchesMembershipStatus

                &&

                matchesEngagement

            );



        });









    return (


        <MembersContainer>



            <Header>


                <HeaderContent>


                    <Title>

                        Members

                    </Title>



                    <Description>

                        Manage church members and track member growth.

                    </Description>



                </HeaderContent>






                <AddButton

                    onClick={() => setShowAddModal(true)}

                >


                    <FaUserPlus />


                    Add Member



                </AddButton>




            </Header>









            <Content>



                <MemberStats


                    total={members.length}


                    active={activeMembers}


                    inactive={inactiveMembers}


                    newThisMonth={newMembersThisMonth}


                    engaged={engagedMembers}



                />







                <MemberFilters


                    filters={filters}


                    setFilters={setFilters}



                />







                <MemberTable


                    members={filteredMembers}


                    onView={setSelectedMember}



                />




            </Content>









            {
                selectedMember && (


                    <MemberProfile


                        member={selectedMember}



                        onClose={() =>

                            setSelectedMember(null)

                        }




                        onEdit={(member) => {


                            setEditMember(member);


                            setSelectedMember(null);


                        }}






                        onDeactivate={(member) => {


                            setDeactivateMember(member);


                        }}







                        onReactivate={

                            handleReactivateMember

                        }



                    />


                )

            }









            {
                showAddModal && (


                    <AddMemberModal


                        onClose={() =>

                            setShowAddModal(false)

                        }



                        onSuccess={

                            handleCreateMember

                        }


                    />


                )

            }









            {
                editMember && (


                    <EditMemberModal


                        member={editMember}



                        onClose={() =>

                            setEditMember(null)

                        }





                        onSuccess={

                            handleUpdateMember

                        }



                    />


                )

            }









            {
                deactivateMember && (


                    <ConfirmDeactivateModal


                        member={deactivateMember}




                        onClose={() =>

                            setDeactivateMember(null)

                        }





                        onConfirm={

                            handleDeactivateMember

                        }



                    />


                )

            }







        </MembersContainer>


    );

};




export default Members;