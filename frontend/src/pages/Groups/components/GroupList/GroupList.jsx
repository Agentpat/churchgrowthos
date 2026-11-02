import GroupCard from "../GroupCard/GroupCard";


import {
  Container,
  Grid,
  EmptyCard,
  LoaderCard,
  Skeleton,
} from "./GroupList.styles";




const GroupList = ({
  groups = [],
  loading,
}) => {



  if (loading) {


    return (

      <Container>

        <Grid>

          {
            [1, 2, 3, 4, 5, 6].map((item) => (

              <LoaderCard key={item}>

                <Skeleton />

                <Skeleton small />

                <Skeleton />

              </LoaderCard>

            ))
          }

        </Grid>

      </Container>

    );


  }





  if (!groups.length) {


    return (

      <EmptyCard>

        <h3>
          No groups yet
        </h3>


        <p>
          Create ministries, departments, units,
          and fellowships to start organizing members.
        </p>


      </EmptyCard>

    );


  }





  return (

    <Container>


      <Grid>


        {
          groups.map((group) => (


            <GroupCard

              key={group._id}

              group={group}

            />


          ))
        }


      </Grid>


    </Container>

  );

};



export default GroupList;