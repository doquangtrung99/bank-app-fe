import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, CircularProgress, Grid, Modal, TextField, Typography } from '@mui/material';
import useGlobal from '../../../hooks/useGlobal';
import { useState } from 'react';
import { Form, Formik } from 'formik';
import FormItem from '../../../components/FormItem';
import { withdrawValidation } from '../../../validations/withdraw.validation';
import { depositValidation } from '../../../validations/deposit.validation';
import { transferValidation } from '../../../validations/transfer.validation';
import { TransactionService } from '../../../services';
import useTrigger from '../../../hooks/useTrigger';

import { toast } from 'react-toastify'

enum ModalType {
    Withdraw = 'withdraw',
    Deposit = 'deposit',
    Transfer = 'transfer',
}

export default function TransactionTable() {

    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const { user } = useGlobal();
    const { loading, trigger } = useTrigger();

    const rows = [
        createData(user?.currentAccounts?.accountNumber || '', user?.savingsAccounts?.accountNumber || '', ''),
    ];

    function createData(
        currentAccount: any,
        savingsAccount: any,
        action: any,
    ) {
        return { currentAccount, savingsAccount, action };
    }
    const style = {
        position: 'absolute' as 'absolute',
        top: '25%',
        left: '50%',
        transform: 'translate(-50%, -25%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: '10px',
        boxShadow: 24,
        p: 4,
    };

    const handleEvent = (event: ModalType.Withdraw | ModalType.Deposit | ModalType.Transfer) => {
        setOpen(true);
        setModalType(event);
    }

    const handleTransaction = async (transactionType: string, accountType: string, values: any) => {
        const transactionData = {
            accountId: user[`${accountType}Accounts`].id,
            type: accountType.toLocaleUpperCase() as 'CURRENT' | 'SAVINGS',
            amountMoney: +values.amount
        };
        try {
            const resTransaction = await trigger((TransactionService as any)[transactionType](transactionData, user.id));

            if (resTransaction) {
                toast.success(`${transactionType.charAt(0).toUpperCase() + transactionType.slice(1)} successfully`);
            }
        } catch (error) {
            console.log(error);
            toast.error(`${transactionType.charAt(0).toUpperCase() + transactionType.slice(1)} unsuccessfully`);
        }
    };

    const handleSubmit = async (values: any) => {

        switch (modalType) {
            case ModalType.Withdraw:
                await handleTransaction(ModalType.Withdraw, 'current', values);
                break;
            case ModalType.Deposit:
                await handleTransaction(ModalType.Deposit, 'savings', values);
                break;
            case ModalType.Transfer:
                const transferData = {
                    sender: {
                        accountId: user.savingsAccounts.id,
                        type: 'SAVINGS' as 'SAVINGS',
                    },
                    receiver: {
                        accountNumber: +values.receiver,
                        type: 'CURRENT' as 'CURRENT',
                    },
                    amountMoney: +values.amount
                };

                try {
                    const resTransfer = await trigger(TransactionService.transfer(transferData, user.id));
                    if (resTransfer) {
                        toast.success('Transfer successfully');
                    }
                } catch (error) {
                    console.log(error);
                    toast.error('Transfer unsuccessfully');
                }
                break;
        }

        setModalType('');
        setOpen(false);
    };

    const renderForm = (initialValues: { amount: number | null }, validation: any, content: string) => {
        return <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validation}
        >
            <Form data-testid={`form-${content}`}>
                <FormItem
                    as={TextField}
                    name='amount'
                    label='Amount Of Money: '
                    type='text'
                />
                <Button
                    onClick={() => handleEvent(content.toLowerCase() as ModalType.Withdraw | ModalType.Deposit)}
                    type="submit"
                    variant="outlined"
                    color="primary"
                >
                    {loading ? <CircularProgress size={24} /> : content}
                </Button>
            </Form>
        </Formik>
    }

    const renderContentModal = () => {
        switch (modalType) {
            case ModalType.Withdraw:
                return <Box sx={style}>
                    {renderForm({ amount: null },
                        withdrawValidation,
                        ModalType.Withdraw
                    )}
                </Box>;
            case ModalType.Deposit:
                return <Box sx={style}>
                    {renderForm({ amount: null },
                        depositValidation,
                        ModalType.Deposit
                    )}
                </Box >;
            case ModalType.Transfer:

                return <Box sx={style}>
                    <Formik
                        initialValues={{
                            amount: null,
                            receiver: null
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={transferValidation}
                    >
                        <Form data-testid={`form-transfer`}>
                            <FormItem
                                as={TextField}
                                name='amount'
                                label='Amount Of Money: '
                                type='text'
                            />
                            <FormItem
                                as={TextField}
                                name='receiver'
                                label='Account number of receiver: '
                                type='text'
                            />
                            <Button
                                onClick={() => handleEvent(ModalType.Transfer)}
                                type="submit"
                                variant='contained'
                            >
                                {loading ? <CircularProgress size={24} /> : 'Transfer'}
                            </Button>
                        </Form >
                    </Formik>
                </Box>;
            default:
                return <></>;
        }
    }

    const renderActionButton = (
        accountType: string,
        actionType: (ModalType.Deposit | ModalType.Withdraw | ModalType.Transfer),
        label: string
    ) => {
        return (
            user?.[`${accountType}Accounts`]?.accountNumber ? (
                <Button
                    onClick={() => handleEvent(actionType)}
                    size="small"
                    variant={'contained'}
                    data-testid={actionType.toLowerCase()}
                >
                    {label}
                </Button>
            ) : null
        );
    };

    return (
        <Grid item container paddingTop={"50px"} margin="0 auto" lg={10} md={8} sm={10} xs={10}>
            <TableContainer component={Paper} >
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Current Account</TableCell>
                            <TableCell>Savings Account</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.currentAccount}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" >
                                    <Typography display={"inline-block"} marginRight={"10px"} >
                                        {row.currentAccount}
                                    </Typography>
                                    {renderActionButton('current', ModalType.Withdraw, 'Withdraw')}
                                </TableCell>
                                <TableCell >
                                    <Typography display={"inline-block"} marginRight={"10px"} >
                                        {row.savingsAccount}
                                    </Typography>
                                    {renderActionButton('savings', ModalType.Deposit, 'Deposit')}
                                </TableCell>
                                <TableCell >
                                    {renderActionButton('savings', ModalType.Transfer, 'Transfer')}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                keepMounted
                open={open}
                onClose={() => {
                    setOpen(false);
                    setModalType('');
                }}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                {renderContentModal()}
            </Modal>
        </Grid >
    );
}