import {
  Table,
  Row,
  HeaderRow,
  Cell,
  Title,
} from "./FollowUpHistory.styles";


const FollowUpHistory = ({
  followUps = [],
}) => {


  return (

    <div>


      <Title>
        Follow Up History
      </Title>



      <Table>


        <HeaderRow>


          <Cell>
            Type
          </Cell>


          <Cell>
            Assigned To
          </Cell>


          <Cell>
            Status
          </Cell>


          <Cell>
            Date
          </Cell>


        </HeaderRow>





        {
          followUps.map((item) => (


            <Row
              key={item._id}
            >



              <Cell>

                {item.type}

              </Cell>





              <Cell>

                {
                  item.createdBy

                    ?

                    `${item.createdBy.firstName || ""} ${item.createdBy.lastName || ""}`

                    :

                    "System"
                }

              </Cell>





              <Cell>

                {item.status}

              </Cell>





              <Cell>

                {
                  item.scheduledDate

                    ?

                    new Date(
                      item.scheduledDate
                    )
                      .toLocaleDateString()

                    :

                    "-"
                }

              </Cell>



            </Row>


          ))

        }



      </Table>


    </div>

  );


};


export default FollowUpHistory;