import {
  FaBell,
  FaBars,
} from "react-icons/fa";


import {
  useAuth,
} from "../../../context/AuthContext";


import {
  HeaderContainer,
  LeftSection,
  MenuButton,
  PageTitle,
  ChurchName,
  RightSection,
  NotificationButton,
  ProfileCard,
  Avatar,
  UserInfo,
  UserName,
  UserRole,
} from "./Header.styles";



const Header = ({
  onMenuClick,
}) => {



  const {
    user,
  } = useAuth();




  return (

    <HeaderContainer>



      <LeftSection>



        <MenuButton

          onClick={onMenuClick}

        >

          <FaBars />

        </MenuButton>





        <div>


          <PageTitle>

            Dashboard

          </PageTitle>



          <ChurchName>

            {user?.church?.name || "Your Church"}

          </ChurchName>


        </div>



      </LeftSection>






      <RightSection>



        <NotificationButton>

          <FaBell />

        </NotificationButton>





        <ProfileCard>



          <Avatar>

            {
              user?.firstName

                ? user.firstName.charAt(0)

                : "A"
            }


          </Avatar>





          <UserInfo>


            <UserName>

              {
                user?.firstName || "Admin User"
              }

            </UserName>



            <UserRole>

              {
                user?.role || "Administrator"
              }

            </UserRole>


          </UserInfo>



        </ProfileCard>




      </RightSection>



    </HeaderContainer>

  );

};



export default Header;