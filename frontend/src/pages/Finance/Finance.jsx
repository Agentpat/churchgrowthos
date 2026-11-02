import {
    useState,
} from "react";

import Loader from "../../components/ui/Loader/Loader";

import FinanceHeader from "./components/FinanceHeader";
import FinanceStats from "./components/FinanceStats";
import FinanceTabs from "./components/FinanceTabs";
import OfferingsTable from "./components/OfferingTable";
import ExpenseTable from "./components/ExpenseTable";

import CreateOfferingModal from "./components/CreateOfferingModal";
import CreateExpenseModal from "./components/CreateExpenseModal";
import TransactionDetailsModal from "./components/TransctionDetailsModal";
import EditOfferingModal from "./components/EditOfferingModal";
import DeleteTransactionModal from "./components/DeleteTransactionModal";
import EditExpenseModal from "./components/EditExpenseModal";

import FinanceOverview from "./components/FinanceOverview";
import FinanceAnalyticsFilters from "./components/FinanceAnalyticsFilters";

import useFinance from "./components/hooks/useFinance";

import {
    MembersContainer as FinanceContainer,
    Content,
    ErrorBox,
} from "../Members/Members.styles";


const Finance = () => {

    // =====================================
    // Finance Data
    // =====================================

    const {
        summary,

        analytics,

        analyticsFilters,

        offerings,

        expenses,

        services,

        // =================================
        // Offering Pagination
        // =================================

        offeringPagination,

        changeOfferingPage,

        // =================================
        // Analytics Filters
        // =================================

        applyAnalyticsFilters,

        clearAnalyticsFilters,

        // =================================
        // Loading / Error
        // =================================

        loading,

        error,

        // =================================
        // Offering Actions
        // =================================

        createOffering,

        updateOffering,

        deleteOffering,

        // =================================
        // Expense Actions
        // =================================

        createExpense,

        updateExpense,

        deleteExpense,

        // =================================
        // Reload
        // =================================

        reload,

    } = useFinance();


    // =====================================
    // Active Section
    // =====================================

    const [
        activeSection,
        setActiveSection,
    ] = useState(
        "overview",
    );


    // =====================================
    // Selected Transaction
    // =====================================

    const [
        selectedTransaction,
        setSelectedTransaction,
    ] = useState(null);


    // =====================================
    // Transaction Details Modal
    // =====================================

    const [
        showTransactionDetails,
        setShowTransactionDetails,
    ] = useState(false);


    // =====================================
    // Create Offering Modal
    // =====================================

    const [
        showCreateOffering,
        setShowCreateOffering,
    ] = useState(false);


    // =====================================
    // Create Expense Modal
    // =====================================

    const [
        showCreateExpense,
        setShowCreateExpense,
    ] = useState(false);


    // =====================================
    // Edit Offering Modal
    // =====================================

    const [
        showEditOffering,
        setShowEditOffering,
    ] = useState(false);


    // =====================================
    // Delete Transaction Modal
    // =====================================

    const [
        showDeleteTransaction,
        setShowDeleteTransaction,
    ] = useState(false);


    const [
        deleteTransactionType,
        setDeleteTransactionType,
    ] = useState(
        "offering",
    );


    // =====================================
    // Edit Expense Modal
    // =====================================

    const [
        showEditExpense,
        setShowEditExpense,
    ] = useState(false);


    // =====================================
    // Close Transaction Details
    // =====================================

    const closeTransactionDetails = () => {

        setShowTransactionDetails(
            false,
        );

        setSelectedTransaction(
            null,
        );

    };


    // =====================================
    // Close Edit Offering
    // =====================================

    const closeEditOffering = () => {

        setShowEditOffering(
            false,
        );

        setSelectedTransaction(
            null,
        );

    };


    // =====================================
    // Close Edit Expense
    // =====================================

    const closeEditExpense = () => {

        setShowEditExpense(
            false,
        );

        setSelectedTransaction(
            null,
        );

    };


    // =====================================
    // Close Delete Modal
    // =====================================

    const closeDeleteTransaction = () => {

        setShowDeleteTransaction(
            false,
        );

        setSelectedTransaction(
            null,
        );

    };


    // =====================================
    // Loading
    // =====================================

    if (loading) {

        return (
            <Loader
                text="Loading finance..."
            />
        );

    }


    // =====================================
    // Error
    // =====================================

    if (error) {

        return (
            <ErrorBox>
                {error}
            </ErrorBox>
        );

    }


    // =====================================
    // Render
    // =====================================

    return (

        <FinanceContainer>

            {/* =================================
                Finance Header
            ================================== */}

            <FinanceHeader

                onRecordOffering={() => {

                    setShowCreateOffering(
                        true,
                    );

                }}


                onRecordExpense={() => {

                    setShowCreateExpense(
                        true,
                    );

                }}

            />


            {/* =================================
                Finance Statistics
            ================================== */}

            <FinanceStats

                summary={
                    summary
                }

                offerings={
                    offerings
                }

                expenses={
                    expenses
                }

            />


            {/* =================================
                Finance Navigation
            ================================== */}

            <FinanceTabs

                activeSection={
                    activeSection
                }

                onChange={
                    setActiveSection
                }

            />


            <Content>

                {/* =================================
                    Overview
                ================================== */}

                {activeSection ===
                    "overview" && (

                        <section>

                            {/* =================================
                                Analytics Filters
                            ================================== */}

                            <FinanceAnalyticsFilters

                                startDate={
                                    analyticsFilters?.startDate ||
                                    ""
                                }

                                endDate={
                                    analyticsFilters?.endDate ||
                                    ""
                                }

                                onApply={
                                    applyAnalyticsFilters
                                }

                                onClear={
                                    clearAnalyticsFilters
                                }

                                loading={
                                    loading
                                }

                            />


                            {/* =================================
                                Finance Overview
                            ================================== */}

                            <FinanceOverview

                                summary={
                                    summary
                                }

                                analytics={
                                    analytics
                                }

                                offerings={
                                    offerings
                                }

                                expenses={
                                    expenses
                                }

                            />

                        </section>

                    )}


                {/* =================================
                    Offerings
                ================================== */}

                {activeSection ===
                    "offerings" && (

                        <section>

                            <h2>
                                Offerings
                            </h2>


                            <OfferingsTable

                                offerings={
                                    offerings
                                }


                                pagination={
                                    offeringPagination
                                }


                                onPageChange={
                                    changeOfferingPage
                                }


                                onView={(
                                    offering,
                                ) => {

                                    setSelectedTransaction(
                                        offering,
                                    );

                                    setShowTransactionDetails(
                                        true,
                                    );

                                }}


                                onEdit={(
                                    offering,
                                ) => {

                                    setSelectedTransaction(
                                        offering,
                                    );

                                    setShowEditOffering(
                                        true,
                                    );

                                }}


                                onDelete={(
                                    offering,
                                ) => {

                                    setSelectedTransaction(
                                        offering,
                                    );

                                    setDeleteTransactionType(
                                        "offering",
                                    );

                                    setShowDeleteTransaction(
                                        true,
                                    );

                                }}

                            />

                        </section>

                    )}


                {/* =================================
                    Expenses
                ================================== */}

                {activeSection ===
                    "expenses" && (

                        <section>

                            <h2>
                                Expenses
                            </h2>


                            <ExpenseTable

                                expenses={
                                    expenses
                                }


                                onView={(
                                    expense,
                                ) => {

                                    setSelectedTransaction(
                                        expense,
                                    );

                                    setShowTransactionDetails(
                                        true,
                                    );

                                }}


                                onEdit={(
                                    expense,
                                ) => {

                                    setSelectedTransaction(
                                        expense,
                                    );

                                    setShowEditExpense(
                                        true,
                                    );

                                }}


                                onDelete={(
                                    expense,
                                ) => {

                                    setSelectedTransaction(
                                        expense,
                                    );

                                    setDeleteTransactionType(
                                        "expense",
                                    );

                                    setShowDeleteTransaction(
                                        true,
                                    );

                                }}

                            />

                        </section>

                    )}

            </Content>


            {/* =================================
                Create Offering Modal
            ================================== */}

            <CreateOfferingModal

                isOpen={
                    showCreateOffering
                }


                onClose={() =>
                    setShowCreateOffering(
                        false,
                    )
                }


                onSubmit={async (
                    offeringData,
                ) => {

                    try {

                        await createOffering(
                            offeringData,
                        );

                        setShowCreateOffering(
                            false,
                        );

                    } catch (
                    error
                    ) {

                        console.error(
                            "FINANCE: OFFERING CREATION FAILED:",
                            error,
                        );

                        throw error;

                    }

                }}


                services={
                    services
                }

            />


            {/* =================================
                Create Expense Modal
            ================================== */}

            <CreateExpenseModal

                isOpen={
                    showCreateExpense
                }


                onClose={() =>
                    setShowCreateExpense(
                        false,
                    )
                }


                onSubmit={async (
                    expenseData,
                ) => {

                    try {

                        await createExpense(
                            expenseData,
                        );

                        setShowCreateExpense(
                            false,
                        );

                    } catch (
                    error
                    ) {

                        console.error(
                            "FINANCE: EXPENSE CREATION FAILED:",
                            error,
                        );

                        throw error;

                    }

                }}


                services={
                    services
                }

            />


            {/* =================================
                Transaction Details
            ================================== */}

            <TransactionDetailsModal

                isOpen={
                    showTransactionDetails
                }


                transaction={
                    selectedTransaction
                }


                onClose={
                    closeTransactionDetails
                }

            />


            {/* =================================
                Edit Offering
            ================================== */}

            <EditOfferingModal

                isOpen={
                    showEditOffering
                }


                offering={
                    selectedTransaction
                }


                services={
                    services
                }


                onClose={
                    closeEditOffering
                }


                onSubmit={async (
                    offeringData,
                ) => {

                    if (
                        !selectedTransaction?._id
                    ) {
                        return;
                    }


                    try {

                        await updateOffering(
                            selectedTransaction._id,
                            offeringData,
                        );

                        closeEditOffering();

                    } catch (
                    error
                    ) {

                        console.error(
                            "UPDATE OFFERING FAILED:",
                            error,
                        );

                        throw error;

                    }

                }}

            />


            {/* =================================
                Delete Transaction
            ================================== */}

            <DeleteTransactionModal

                isOpen={
                    showDeleteTransaction
                }


                transaction={
                    selectedTransaction
                }


                type={
                    deleteTransactionType
                }


                onClose={
                    closeDeleteTransaction
                }


                onConfirm={async () => {

                    if (
                        !selectedTransaction?._id
                    ) {
                        return;
                    }


                    try {

                        if (
                            deleteTransactionType ===
                            "offering"
                        ) {

                            await deleteOffering(
                                selectedTransaction._id,
                            );

                        } else {

                            await deleteExpense(
                                selectedTransaction._id,
                            );

                        }


                        closeDeleteTransaction();

                    } catch (
                    error
                    ) {

                        console.error(
                            "DELETE TRANSACTION FAILED:",
                            error,
                        );

                        throw error;

                    }

                }}

            />


            {/* =================================
                Edit Expense
            ================================== */}

            <EditExpenseModal

                isOpen={
                    showEditExpense
                }


                expense={
                    selectedTransaction
                }


                services={
                    services
                }


                onClose={
                    closeEditExpense
                }


                onSubmit={async (
                    expenseData,
                ) => {

                    if (
                        !selectedTransaction?._id
                    ) {
                        return;
                    }


                    try {

                        await updateExpense(
                            selectedTransaction._id,
                            expenseData,
                        );

                        closeEditExpense();

                    } catch (
                    error
                    ) {

                        console.error(
                            "UPDATE EXPENSE FAILED:",
                            error,
                        );

                        throw error;

                    }

                }}

            />

        </FinanceContainer>

    );

};


export default Finance;