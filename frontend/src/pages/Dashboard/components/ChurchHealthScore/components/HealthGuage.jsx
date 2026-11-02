import {
  GaugeContainer,
  Circle,
  ProgressCircle,
  Score,
  Status,
} from "./HealthGuage.styles";


const HealthGauge = ({
  score = 0,
  status = "Unknown",
}) => {


  const radius = 70;

  const circumference =
    2 * Math.PI * radius;


  const progress =
    circumference -
    (score / 100) * circumference;



  return (

    <GaugeContainer>


      <Circle>

        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="transparent"
          stroke="rgba(148,163,184,.2)"
          strokeWidth="14"
        />


        <ProgressCircle

          cx="90"

          cy="90"

          r={radius}

          strokeDasharray={circumference}

          strokeDashoffset={progress}

        />

      </Circle>




      <Score>

        {score}%

      </Score>





      <Status>

        {status}

      </Status>



    </GaugeContainer>

  );

};


export default HealthGauge;