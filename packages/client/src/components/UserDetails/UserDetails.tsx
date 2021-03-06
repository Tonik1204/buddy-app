import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';

import Avatar from 'atoms/Avatar';
import { isNewbie } from 'utils';
import { UserRole } from '@buddy-app/schema';
import { UserDetailsProps, ContactDetail } from './types';
import DICTIONARY from './dictionary';

const useStyles = makeStyles(theme => ({
  notesTextarea: {
    width: '15rem',
    minHeight: '10rem',
    borderWidth: '1px',
    borderColor: theme.palette.primary.dark,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: theme.spacing(2),
  },
  avatar: {
    width: '10rem',
  },
  label: {
    fontWeight: theme.typography.fontWeightBold,
    marginTop: theme.spacing(0.5),
  },
  detailText: {
    minHeight: '1.8rem',
  },
}));

const UserDetails: React.FC<UserDetailsProps> = props => {
  const { wrapper, avatar, notesTextarea, label, detailText } = useStyles();
  const {
    photo,
    name,
    position,
    startDate,
    email,
    phoneNumber,
    notes,
    role,
  } = props.details;

  const isNotesVisible = (role: UserRole) => isNewbie(role);

  const contactDetails: ContactDetail[] = [
    {
      title: DICTIONARY.NAME,
      value: name,
      visible: !!name,
      testId: 'contact-name',
    },
    {
      title: DICTIONARY.POSITION,
      value: position,
      visible: !!position,
      testId: 'contact-position',
    },
    {
      title: DICTIONARY.START_DATE,
      value: new Date(startDate).toLocaleDateString(),
      visible: !!startDate,
      testId: 'contact-start-date',
    },
    {
      title: DICTIONARY.EMAIL,
      value: (
        <Link href={`mailto:${email}`} component='a'>
          {email}
        </Link>
      ),
      visible: !!email,
      testId: 'contact-email',
    },
    {
      title: DICTIONARY.PHONE,
      value: phoneNumber,
      visible: !!phoneNumber,
      testId: 'contact-phone',
    },
  ];

  return (
    <Box className={wrapper} data-testid='contact-details-page'>
      <Box className={avatar}>
        <Avatar imgSrc={photo} />
      </Box>
      <Box>
        {contactDetails.map(
          ({ title, value, visible, testId }) =>
            visible && (
              <React.Fragment key={testId}>
                <Typography component='p' className={label}>
                  {title}
                </Typography>

                <Typography
                  component='p'
                  data-testid={testId}
                  className={detailText}>
                  {value}
                </Typography>
              </React.Fragment>
            )
        )}
        {isNotesVisible(role as UserRole) && (
          <>
            <Typography component='p' className={label}>
              Notes
            </Typography>
            <TextareaAutosize className={notesTextarea} value={notes || ''} />
          </>
        )}
      </Box>
    </Box>
  );
};

export default UserDetails;
