import {
  FaUserPlus,
  FaEdit,
  FaCalendarCheck,
  FaPhone,
} from "react-icons/fa";


import {
  Timeline,
  TimelineItem,
  IconWrapper,
  Content,
  ActivityTitle,
  ActivityDescription,
  DateText,
  Line,
} from "./ActivityTimeline.styles";


const icons = {

  created: <FaUserPlus />,

  updated: <FaEdit />,

  attendance:
    <FaCalendarCheck />,

  followup:
    <FaPhone />,

};



const ActivityTimeline = ({
  activities = [],
}) => {


  return (

    <Timeline>


      {
        activities.map(
          (activity, index) => (

            <TimelineItem
              key={activity.id}
            >


              <IconWrapper>

                {
                  icons[activity.type]
                }


              </IconWrapper>



              {
                index !== activities.length - 1
                &&
                <Line />
              }



              <Content>


                <ActivityTitle>

                  {activity.title}

                </ActivityTitle>



                <ActivityDescription>

                  {activity.description}

                </ActivityDescription>



                <DateText>

                  {
                    activity.date
                      ?
                      new Date(
                        activity.date
                      )
                        .toLocaleDateString()
                      :
                      "-"
                  }

                </DateText>


              </Content>


            </TimelineItem>

          )
        )
      }


    </Timeline>

  );

};


export default ActivityTimeline;