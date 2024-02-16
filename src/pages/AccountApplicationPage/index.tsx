
import { Accordion, Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { styled } from '@mui/material/styles';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';

import { AccountService } from "../../services";
import useTrigger from "../../hooks/useTrigger";
import useGlobal from "../../hooks/useGlobal";
import { toast } from 'react-toastify'
import { User } from "../../interfaces";
import { ContentAccordian } from "./components/ContentAccordian";

export enum AccountType {
    SAVINGS = 'SAVINGS',
    CURRENT = 'CURRENT'
}

interface Account {
    id: string
    userId: string
    accountNumber: string
    type: AccountType.SAVINGS | AccountType.CURRENT
    balance: number
}
const Account = () => {

    const [currentAccount, setCurrentAccount] = useState<Account>({} as Account);
    const [savingsAccount, setSavingsAccount] = useState<Account>({} as Account);
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const { loading, trigger } = useTrigger();
    const { user, setUser } = useGlobal();
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentAccount(user?.currentAccounts || {});
        setSavingsAccount(user?.savingsAccounts || {});
    }, [user])

    const handleChange = (panel: string) => (_: React.SyntheticEvent, newExpanded: boolean) => {

        if (panel === 'panel1' && checkObjectIsEmty(currentAccount)) {
            return setExpanded(newExpanded ? panel : false);
        }

        return setExpanded(newExpanded ? panel : false);
    };

    const checkObjectIsEmty = (object: Account | {}) => {
        return Object.keys(object).length > 0
    }

    const handleCreateAccount = async (type: 'CURRENT' | 'SAVINGS') => {
        try {
            const res: any = await trigger(AccountService.create(type, user.id))
            if (res && type === 'CURRENT') {
                setCurrentAccount(res)
                setUser((prev: User) => ({ ...prev, currentAccounts: res }))

            } else if (type === 'SAVINGS') {
                setSavingsAccount(res)
                setUser((prev: User) => ({ ...prev, savingsAccounts: res }))
            };
            toast.success('Create account successfully');
        } catch (error) {
            console.log('ERROR', error);
            toast.error('Create account unsuccessfully');
        }

    }

    const havingAccount = (account = {}) => {
        return Object.keys(account).length > 0
    }

    const renderCaret = (account = {}, panel: string) => {
        if (Object.keys(account).length > 0) {
            if (expanded === panel) {
                return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <i className="fa-solid fa-caret-down"></i>
                </Box>
            }

            return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <i className="fa-solid fa-caret-up"></i>
            </Box>
        }

        return null
    }

    const AccordionSummary = styled((props: AccordionSummaryProps) => (
        <MuiAccordionSummary
            {...props}
        />
    ))(({ theme }) => ({
        backgroundColor: 'rgba(255, 255, 255, 1)',
        flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
        },
        '& .MuiAccordionSummary-content': {
            marginLeft: theme.spacing(1),
        },
    }));


    return (
        <>
            <Button sx={{ margin: '20px 0 10px 10px' }} variant='outlined' onClick={() => navigate('/home')}> Back to home page </Button>
            <Grid>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" >
                        <Typography width={'100%'}>
                            Current Account Number
                            {currentAccount?.accountNumber ? ' : ' + currentAccount?.accountNumber : null}
                            {havingAccount(currentAccount)
                                ? null
                                : (
                                    <Button
                                        onClick={() => handleCreateAccount('CURRENT')}
                                        variant="outlined"
                                        data-testid="btn-create-current-account"
                                        sx={{ fontSize: '15px', ml: '10px', background: '#F0F0F0' }}
                                    >
                                        {loading ? <CircularProgress size={24} /> : '+'}
                                    </Button>
                                )
                            }
                        </Typography>
                        {renderCaret(currentAccount, 'panel1')}
                    </AccordionSummary>
                    <ContentAccordian
                        title="Total Balance"
                        balance={currentAccount?.balance}
                    />
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" >
                        <Typography width={'100%'}>
                            Savings Account Number
                            {savingsAccount?.accountNumber ? ' : ' + savingsAccount?.accountNumber : null}
                            {havingAccount(savingsAccount)
                                ? (
                                    <Button
                                        size="small"
                                        onClick={() => navigate('/transaction')}
                                        variant="outlined"
                                        sx={{ fontSize: '15px', ml: '10px', background: '#F0F0F0' }}
                                    >
                                        Transfer
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => handleCreateAccount('SAVINGS')}
                                        variant="outlined"
                                        data-testid="btn-create-savings-account"
                                        sx={{ fontSize: '15px', ml: '10px', background: '#F0F0F0' }}
                                    >
                                        {loading ? <CircularProgress size={24} /> : '+'}
                                    </Button>
                                )
                            }
                        </Typography>
                        {renderCaret(savingsAccount, 'panel2')}
                    </AccordionSummary>
                    <ContentAccordian
                        title="Total Savings"
                        balance={savingsAccount?.balance}
                    />
                </Accordion>
            </Grid>
        </>
    )
}
export default Account