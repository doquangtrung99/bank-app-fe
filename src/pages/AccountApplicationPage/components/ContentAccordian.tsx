import { AccordionDetails, Container, Box } from "@mui/material"
import styles from '../account.module.scss'

interface IContentAccordian {
    title: string
    balance: number
}

export const ContentAccordian = ({ title, balance }: IContentAccordian) => {
    return (
        <AccordionDetails className={styles["dashboard_main"]}>
            <Container className={styles["total_balance"]}>
                <Box paddingTop={1}>{title}</Box>
                <Container className={styles["amount_container"]}>
                    <Box className={styles["amount"]}>VND: {balance || 0}</Box>
                </Container>
            </Container>
        </AccordionDetails>
    )
}