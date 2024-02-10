
import { Button } from '@mui/material';
import TransactionTable from './components/TransactionTalbe';
import { useNavigate } from 'react-router-dom';
const Transaction = () => {
    const navigate = useNavigate();
    return (
        <>
            <Button sx={{ margin: '20px 0 0 10px' }} variant='outlined' onClick={() => navigate('/accounts')}> Back to accounts page </Button>
            <TransactionTable />
        </>
    );
};

export default Transaction;
