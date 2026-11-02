
import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    Html5Qrcode,
} from "html5-qrcode";

import {
    FaCamera,
    FaCheckCircle,
    FaExclamationCircle,
    FaQrcode,
    FaTimes,
} from "react-icons/fa";

import {
    Backdrop,
    ScannerCard,
    ScannerHeader,
    ScannerTitle,
    CloseButton,
    ScannerBody,
    CameraFrame,
    CameraContainer,
    ScannerIcon,
    ScannerHeading,
    ScannerDescription,
    ResultCard,
    ResultIcon,
    ResultContent,
    ResultLabel,
    ResultValue,
    ScannerFooter,
    StatusMessage,
    RetryButton,
} from "./AttendanceScanner.styles";

const SCANNER_ELEMENT_ID =
    "attendance-qr-reader";

const AttendanceScanner = ({
    isOpen,
    onClose,
    onScan,
    scannedMember = null,
    scanError = "",
    isCheckingIn = false,
    checkInSuccess = false,
    onConfirm,
    onReset,
}) => {
    const scannerRef =
        useRef(null);

    const isStartingRef =
        useRef(false);

    const hasScannedRef =
        useRef(false);

    const [
        scannerError,
        setScannerError,
    ] = useState("");

    const [
        isScanning,
        setIsScanning,
    ] = useState(false);

    const stopScanner =
        async () => {
            const scanner =
                scannerRef.current;

            if (!scanner) {
                return;
            }

            try {
                if (
                    scanner.isScanning
                ) {
                    await scanner.stop();
                }

                await scanner.clear();
            } catch (error) {
                console.error(
                    "FAILED TO STOP QR SCANNER:",
                    error,
                );
            } finally {
                scannerRef.current =
                    null;

                setIsScanning(false);
            }
        };

    const startScanner =
        async () => {
            if (
                !isOpen ||
                isStartingRef.current ||
                scannerRef.current ||
                scannedMember
            ) {
                return;
            }

            isStartingRef.current =
                true;

            hasScannedRef.current =
                false;

            setScannerError("");

            try {
                const scanner =
                    new Html5Qrcode(
                        SCANNER_ELEMENT_ID,
                    );

                scannerRef.current =
                    scanner;

                await scanner.start(
                    {
                        facingMode:
                            "environment",
                    },
                    {
                        fps: 10,
                        qrbox: {
                            width: 250,
                            height: 250,
                        },
                        aspectRatio: 1,
                    },
                    async (
                        decodedText,
                    ) => {
                        if (
                            hasScannedRef.current
                        ) {
                            return;
                        }

                        hasScannedRef.current =
                            true;

                        await stopScanner();

                        onScan?.(
                            decodedText.trim(),
                        );
                    },
                    () => {},
                );

                setIsScanning(true);
            } catch (error) {
                console.error(
                    "QR SCANNER FAILED TO START:",
                    error,
                );

                scannerRef.current =
                    null;

                setIsScanning(false);

                setScannerError(
                    "Unable to access the camera. Please allow camera access and try again.",
                );
            } finally {
                isStartingRef.current =
                    false;
            }
        };

    const handleRetry =
        async () => {
            setScannerError("");

            onReset?.();

            await stopScanner();

            hasScannedRef.current =
                false;

            window.setTimeout(
                () => {
                    startScanner();
                },
                100,
            );
        };

    useEffect(() => {
        if (!isOpen) {
            stopScanner();

            return undefined;
        }

        if (
            scannedMember ||
            checkInSuccess
        ) {
            stopScanner();

            return undefined;
        }

        const timer =
            window.setTimeout(
                () => {
                    startScanner();
                },
                100,
            );

        return () => {
            window.clearTimeout(
                timer,
            );

            stopScanner();
        };
    }, [
        isOpen,
        scannedMember,
        checkInSuccess,
    ]);

    if (!isOpen) {
        return null;
    }

    // =====================================
    // SUCCESS
    // =====================================

    if (checkInSuccess) {
        return (
            <Backdrop>
                <ScannerCard>
                    <ScannerHeader>
                        <ScannerTitle>
                            <FaQrcode />

                            <span>
                                Attendance Recorded
                            </span>
                        </ScannerTitle>

                        <CloseButton
                            type="button"
                            onClick={
                                onClose
                            }
                            aria-label="Close scanner"
                        >
                            <FaTimes />
                        </CloseButton>
                    </ScannerHeader>

                    <ScannerBody>
                        <ResultCard $success>
                            <ResultIcon>
                                <FaCheckCircle />
                            </ResultIcon>

                            <ResultContent>
                                <ResultLabel>
                                    Check-in successful
                                </ResultLabel>

                                <ResultValue>
                                    {scannedMember?.firstName}{" "}
                                    {scannedMember?.lastName}
                                </ResultValue>
                            </ResultContent>
                        </ResultCard>

                        <ScannerHeading>
                            Attendance recorded
                        </ScannerHeading>

                        <ScannerDescription>
                            This member has been
                            successfully checked in
                            for the current service.
                        </ScannerDescription>

                        <ScannerFooter>
                            <RetryButton
                                type="button"
                                onClick={
                                    onClose
                                }
                            >
                                Done
                            </RetryButton>
                        </ScannerFooter>
                    </ScannerBody>
                </ScannerCard>
            </Backdrop>
        );
    }

    const hasResult =
        Boolean(scannedMember);

    return (
        <Backdrop>
            <ScannerCard>
                <ScannerHeader>
                    <ScannerTitle>
                        <FaQrcode />

                        <span>
                            Scan Attendance
                        </span>
                    </ScannerTitle>

                    <CloseButton
                        type="button"
                        onClick={onClose}
                        aria-label="Close scanner"
                        disabled={
                            isCheckingIn
                        }
                    >
                        <FaTimes />
                    </CloseButton>
                </ScannerHeader>

                <ScannerBody>
                    {/* =========================
                        CAMERA
                    ========================== */}

                    {!hasResult && (
                        <>
                            <CameraFrame>
                                <CameraContainer
                                    id={
                                        SCANNER_ELEMENT_ID
                                    }
                                />

                                {!isScanning &&
                                    !scannerError && (
                                        <ScannerIcon>
                                            <FaCamera />
                                        </ScannerIcon>
                                    )}
                            </CameraFrame>

                            <ScannerHeading>
                                Scan member QR code
                            </ScannerHeading>

                            <ScannerDescription>
                                Position the member's
                                QR code inside the
                                frame.
                            </ScannerDescription>

                            {scannerError && (
                                <ResultCard>
                                    <ResultIcon
                                        $error
                                    >
                                        <FaExclamationCircle />
                                    </ResultIcon>

                                    <ResultContent>
                                        <ResultLabel>
                                            Camera error
                                        </ResultLabel>

                                        <ResultValue>
                                            {
                                                scannerError
                                            }
                                        </ResultValue>
                                    </ResultContent>
                                </ResultCard>
                            )}

                            {scanError && (
                                <ResultCard>
                                    <ResultIcon
                                        $error
                                    >
                                        <FaExclamationCircle />
                                    </ResultIcon>

                                    <ResultContent>
                                        <ResultLabel>
                                            QR not recognized
                                        </ResultLabel>

                                        <ResultValue>
                                            {
                                                scanError
                                            }
                                        </ResultValue>
                                    </ResultContent>
                                </ResultCard>
                            )}
                        </>
                    )}

                    {/* =========================
                        MEMBER CONFIRMATION
                    ========================== */}

                    {hasResult && (
                        <>
                            <ResultCard
                                $success
                            >
                                <ResultIcon>
                                    <FaCheckCircle />
                                </ResultIcon>

                                <ResultContent>
                                    <ResultLabel>
                                        Member found
                                    </ResultLabel>

                                    <ResultValue>
                                        {
                                            scannedMember.firstName
                                        }{" "}
                                        {
                                            scannedMember.lastName
                                        }
                                    </ResultValue>
                                </ResultContent>
                            </ResultCard>

                            <ScannerHeading>
                                {isCheckingIn
                                    ? "Recording attendance..."
                                    : "Confirm attendance"}
                            </ScannerHeading>

                            <ScannerDescription>
                                {isCheckingIn
                                    ? "Please wait while attendance is being recorded."
                                    : "Confirm that this is the member you want to check in for the current service."}
                            </ScannerDescription>

                            {/* =========================
                                CHECK-IN ERROR
                            ========================== */}

                            {scanError && (
                                <ResultCard>
                                    <ResultIcon
                                        $error
                                    >
                                        <FaExclamationCircle />
                                    </ResultIcon>

                                    <ResultContent>
                                        <ResultLabel>
                                            Check-in failed
                                        </ResultLabel>

                                        <ResultValue>
                                            {
                                                scanError
                                            }
                                        </ResultValue>
                                    </ResultContent>
                                </ResultCard>
                            )}

                            <ScannerFooter>
                                <RetryButton
                                    type="button"
                                    onClick={
                                        handleRetry
                                    }
                                    disabled={
                                        isCheckingIn
                                    }
                                >
                                    Scan again
                                </RetryButton>

                                <RetryButton
                                    type="button"
                                    onClick={
                                        onConfirm
                                    }
                                    disabled={
                                        isCheckingIn
                                    }
                                >
                                    {isCheckingIn
                                        ? "Checking in..."
                                        : "Confirm check-in"}
                                </RetryButton>
                            </ScannerFooter>
                        </>
                    )}
                </ScannerBody>

                {!hasResult && (
                    <ScannerFooter>
                        <StatusMessage>
                            {isScanning
                                ? "Camera active · Ready to scan"
                                : "Starting camera..."}
                        </StatusMessage>
                    </ScannerFooter>
                )}
            </ScannerCard>
        </Backdrop>
    );
};

export default AttendanceScanner;
