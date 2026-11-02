import styled from "styled-components";

const Grid = styled.div`
  width: 100%;

  display: grid;

  grid-template-columns: repeat(4, minmax(0, 1fr));

  gap: 12px;

  margin-bottom: 18px;

  /* =================================
       Tablet
    ================================== */

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));

    gap: 10px;
  }

  /* =================================
       Mobile
    ================================== */

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));

    gap: 8px;

    margin-bottom: 14px;
  }

  /* =================================
       Very Small Phones
    ================================== */

  @media (max-width: 360px) {
    gap: 7px;
  }
`;

export default Grid;
