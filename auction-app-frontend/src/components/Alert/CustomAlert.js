import { Alert, Collapse, ThemeProvider } from "@mui/material";
import { useState, useEffect } from "react";
import AlertTheme from "../../Themes/AlertTheme";
import "../../assets/style/custom-alert.scss"

const CustomAlert = ({ color, title, message }) => {
    const [showAlert, setShowAlert] = useState(true);

    useEffect(() => {
        setTimeout(() => {setShowAlert(false)}, 5000);
    }, []);

    return (
        <ThemeProvider theme={AlertTheme} >
            <div className="custom-alert-container">
                <Collapse in={showAlert}>
                    <Alert
                        icon={false}
                        color={color}
                    >
                        <p className="strong">{title} &nbsp; </p>
                        <p>{message}</p>
                    </Alert>
                </Collapse>
            </div>
        </ThemeProvider>
    );
};

CustomAlert.defaultProps = {
    color: "info",
}

export default CustomAlert;