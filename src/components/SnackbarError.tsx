import { Snackbar } from '@mui/material';
import { useFruits } from '../context/fruits';

const SnackbarError: React.FC = () => {
  const [{ error }, { clearError }] = useFruits();

  if (error) {
    return (
      <Snackbar
        open={!!error}
        autoHideDuration={5000}
        onClose={clearError}
        message={error}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    );
  }

  return null;
};

export default SnackbarError;
