import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Mutation } from '@buddy-app/schema';
import { UPDATE_USER_MUTATION } from 'graphql/update-user.graphql';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useForm } from 'react-hook-form';
import AuthContainer from 'atoms/AuthContainer';
import { useDialog } from 'contexts/DialogContext';
import RoundedButton from 'atoms/RoundedButton';
import { auth } from 'utils';
import { ROUTES } from 'shared/routes';
import DICTIONARY from './dictionary';
import { FormData, ResetPasswordProps } from './types';

const MIN_PASSWORD_LENGTH = 8;

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
  },
  submit: {
    margin: theme.spacing(3, 0),
  },
}));

const ResetPassword: React.FC<ResetPasswordProps> = ({ history, match }) => {
  const classes = useStyles();
  const { register, errors, handleSubmit, setError, clearError } = useForm<
    FormData
  >();
  const { showDialog } = useDialog();
  const user = auth.getForgotPasswordUser();

  const [updateUser, { loading }] = useMutation<Partial<Mutation>>(
    UPDATE_USER_MUTATION,
    {
      onCompleted: () => {
        showDialog(DICTIONARY.DIALOG.SUCCESS_MSG, DICTIONARY.DIALOG.SUCCESS_TITLE);
        history.push(ROUTES.LOGIN);
        auth.removeForgotPasswordUser();
      },
      onError: error => {
        if (error) {
          if (error.networkError) {
            showDialog(DICTIONARY.ERRORS.NO_NETWORK);
          } else {
            showDialog(DICTIONARY.ERRORS.NO_USER_FOUND);
          }
        }
      },
    }
  );

  const onFormFocus = () => clearError('passwordConfirm');

  const onFormChange = (e: React.ChangeEvent<HTMLFormElement>) =>
    (e.target.value = e.target.value.trim());

  const onSubmit = ({ password, passwordConfirm }: FormData) => {
    if (password !== passwordConfirm) {
      return setError('passwordConfirm', 'notMatch', DICTIONARY.PASSWORD.NOT_MATCH);
    }

    updateUser({
      variables: {
        userId: (user && user.userId) || '',
        input: {
          password,
        },
      },
    });
  };

  useEffect(() => {
    if (!user || user.token !== match.params.token) {
      history.push(ROUTES.ROUTE_404);
    }
  }, [user, history, match]);

  return (
    <AuthContainer data-testid='reset-password-page' title={DICTIONARY.TITLE}>
      <form
        className={classes.form}
        data-testid='form'
        noValidate
        onFocus={onFormFocus}
        onChange={onFormChange}
        onSubmit={handleSubmit(onSubmit)}>
        <TextField
          inputProps={{ 'data-testid': 'password' }}
          inputRef={register({
            required: DICTIONARY.PASSWORD.REQUIRED,
            minLength: {
              value: MIN_PASSWORD_LENGTH,
              message: DICTIONARY.PASSWORD.INVALID,
            },
          })}
          margin={'dense'}
          fullWidth
          name='password'
          label={DICTIONARY.PASSWORD.LABEL1}
          type='password'
          autoComplete='current-password'
          error={!!errors.password}
          helperText={(errors.password && errors.password.message) || ' '}
        />
        <TextField
          inputProps={{ 'data-testid': 'passwordConfirm' }}
          inputRef={register({
            required: DICTIONARY.PASSWORD.REQUIRED,
          })}
          margin={'dense'}
          fullWidth
          name='passwordConfirm'
          label={DICTIONARY.PASSWORD.LABEL2}
          type='password'
          autoComplete='current-password'
          error={!!errors.passwordConfirm}
          helperText={
            (errors.passwordConfirm && errors.passwordConfirm.message) || ' '
          }
        />
        <RoundedButton
          data-testid='submit-button'
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          disabled={loading}
          className={classes.submit}>
          {loading ? (
            <CircularProgress
              data-testid='login-progress'
              variant={'indeterminate'}
              size={32}
            />
          ) : (
            DICTIONARY.SUBMIT
          )}
        </RoundedButton>
      </form>
    </AuthContainer>
  );
};

export default ResetPassword;
