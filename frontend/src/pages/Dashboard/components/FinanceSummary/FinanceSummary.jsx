import {
    FaArrowUp,
    FaArrowDown,
    FaWallet,
} from "react-icons/fa";


import {
    FinanceContainer,
    FinanceHeader,
    FinanceTitle,
    FinanceGrid,
    FinanceItem,
    FinanceLabel,
    FinanceValue,
    FinanceIcon,
    BalanceCard,
} from "./FinanceSummary.styles";




const FinanceSummary = ({
    finance = {},
}) => {


    return (

        <FinanceContainer>


            <FinanceHeader>


                <FinanceTitle>

                    Finance Overview

                </FinanceTitle>


            </FinanceHeader>







            <FinanceGrid>




                <FinanceItem>


                    <FinanceIcon>

                        <FaArrowUp />

                    </FinanceIcon>




                    <div>


                        <FinanceLabel>

                            Total Income

                        </FinanceLabel>



                        <FinanceValue>

                            ₦
                            {
                                (
                                    finance.income || 0
                                )
                                    .toLocaleString("en-NG")
                            }

                        </FinanceValue>


                    </div>


                </FinanceItem>









                <FinanceItem>


                    <FinanceIcon>

                        <FaArrowDown />

                    </FinanceIcon>




                    <div>


                        <FinanceLabel>

                            Total Expenses

                        </FinanceLabel>



                        <FinanceValue>

                            ₦
                            {
                                (
                                    finance.expenses || 0
                                )
                                    .toLocaleString("en-NG")
                            }

                        </FinanceValue>


                    </div>


                </FinanceItem>









                <BalanceCard>


                    <FinanceIcon>

                        <FaWallet />

                    </FinanceIcon>




                    <div>


                        <FinanceLabel>

                            Available Balance

                        </FinanceLabel>



                        <FinanceValue>

                            ₦
                            {
                                (
                                    finance.balance || 0
                                )
                                    .toLocaleString("en-NG")
                            }

                        </FinanceValue>


                    </div>


                </BalanceCard>





            </FinanceGrid>




        </FinanceContainer>

    );

};



export default FinanceSummary;