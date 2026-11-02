import {
  NavLink,
} from "react-router-dom";


import {
  SidebarContainer,
  LogoSection,
  LogoIcon,
  BrandText,
  Navigation,
  NavGroup,
  GroupTitle,
  NavItem,
  NavIcon,
  NavLabel,
} from "./Sidebar.styles";


import {
  FaChartPie,
  FaUsers,
  FaUserFriends,
  FaCalendarCheck,
  FaClipboardList,
  FaMoneyBillWave,
  FaUserShield,
  FaCog,
  FaLayerGroup,
} from "react-icons/fa";



const menuGroups = [

  {
    title: "Overview",

    items: [

      {
        label: "Dashboard",
        path: "/",
        icon: FaChartPie,
      },

    ],
  },


  {
    title: "Church Operations",

    items: [

      {
        label: "Members",
        path: "/members",
        icon: FaUsers,
      },


      {
        label: "Visitors",
        path: "/visitors",
        icon: FaUserFriends,
      },


      {
        label: "Attendance",
        path: "/attendance",
        icon: FaCalendarCheck,
      },


      {
        label: "Services",
        path: "/services",
        icon: FaClipboardList,
      },


      // NEW
      {
        label: "Groups",
        path: "/groups",
        icon: FaLayerGroup,
      },

    ],
  },


  {
    title: "Management",

    items: [

      {
        label: "Finance",
        path: "/finance",
        icon: FaMoneyBillWave,
      },


      {
        label: "Staff",
        path: "/staff",
        icon: FaUserShield,
      },


      {
        label: "Settings",
        path: "/settings",
        icon: FaCog,
      },

    ],
  },

];



const Sidebar = ({
  mobile = false,
  close,
}) => {


  const handleNavigation = () => {

    if (mobile && close) {

      close();

    }

  };



  return (

    <SidebarContainer
      mobile={mobile}
    >


      <LogoSection>


        <LogoIcon>
          C
        </LogoIcon>


        <BrandText>
          ChurchOS
        </BrandText>


      </LogoSection>




      <Navigation>


        {
          menuGroups.map((group) => (


            <NavGroup
              key={group.title}
            >


              <GroupTitle>

                {group.title}

              </GroupTitle>




              {
                group.items.map((item) => {


                  const Icon = item.icon;



                  return (

                    <NavItem

                      key={item.path}

                      as={NavLink}

                      to={item.path}

                      end={
                        item.path === "/"
                      }

                      onClick={
                        handleNavigation
                      }

                    >


                      <NavIcon>

                        <Icon />

                      </NavIcon>



                      <NavLabel>

                        {item.label}

                      </NavLabel>


                    </NavItem>

                  );


                })
              }


            </NavGroup>


          ))
        }


      </Navigation>



    </SidebarContainer>

  );

};


export default Sidebar;