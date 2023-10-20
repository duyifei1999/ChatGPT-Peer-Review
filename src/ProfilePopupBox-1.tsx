import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Grid, List, ListItem, ListItemText, Modal, Typography, IconButton } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import CalendarUI from 'src/components/CalendarUI/CalendarUI';
import { fieldFullNameConveter } from '../../common/functions/fieldFullNameConveter';
import { emailCount, getStudentProfile } from '../../utils/schoolsApi';
import {
  availableMatch,
  courseMatch,
  courseProgressMatch, learningAreaMatch,
  locationsMatch,
  skillMatch,
} from '../../common/FieldsMatches/studentProfileFieldsMatch';

const style = {
  position: 'absolute' as 'absolute',
  top: { xs: '60%', sm: '53%', md: '50%', lg: '50%' },
  left: { xs: '55%', sm: '52%', md: '51%', lg: '51%' },
  height: { xs: '90%', sm: '90%' },
  maxHeight: '750px',
  maxWidth: '1173px',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '7px',
  p: 4,
  paddingTop: { xs: 0, sm: 4 },
  overflowY: 'auto',
  overflowX: 'hidden',
  justifyContent: 'center',
};

interface TextFieldInfo {
  id: string;
  label: string;
  value: string;
}

type JsonObject = {
  [key: string]: string;
};

const fieldName = ['firstName', 'lastName', 'preferredName',
  'email', 'pronouns', 'studentNumber', 'course',
  'courseProgression', 'currentLocation', 'work_with_children',
  'otherSkillExperience', 'locationOption', 'learningAreas',
  'available'];

const fieldMatch: JsonObject = {
  firstName: 'First name:',
  lastName: 'Last name:',
  preferredName: 'Preferred name:',
  email: 'Email address:',
  pronouns: 'Pronouns:',
  studentNumber: 'UoM student number:',
  course: 'Course:',
  courseProgression: 'Course progression:',
  currentLocation: 'Current location:',
  work_with_children: 'Work with children:',
  otherSkillExperience: 'Skills:',
  locationOption: 'Location:',
  learningAreas: 'Learning areas:',
  available: 'Available to:',
  image: 'Image',
};

async function fetchUserData(id: number) {
  const response = getStudentProfile(id.toString());
  const { data } = await response;
  const fields = fieldName.map((name) => ({ id: name, label: fieldMatch[name], value: data[name] }));
  fields[6].value = courseMatch[fields[6].value];
  fields[7].value = courseProgressMatch[fields[7].value];
  fields[8].value = locationsMatch[fields[8].value];
  const skills = fieldFullNameConveter(fields[10].value, skillMatch);
  fields[10].value = skills;
  const locations = fieldFullNameConveter(fields[11].value, locationsMatch);
  fields[11].value = locations;
  const areas = fieldFullNameConveter(fields[12].value, learningAreaMatch);
  fields[12].value = areas;
  const availables = fieldFullNameConveter(fields[13].value, availableMatch);
  fields[13].value = availables;
  if (data.work_with_children === true) {
    fields[9].value = 'Yes';
  } else { fields[9].value = 'No'; }
  fields.splice(5, 1);
  console.log(data.availableTime);
  return [fields, data.image, data.email, data.availableTime];
}

interface Props {
  open: boolean,
  handleClose: any,
  id: number,
}

function ProfilePopupBox({ open, handleClose, id }: Props) {
  console.log('id is:', id);
  const [initValue, setInitValue] = useState<TextFieldInfo[]>([]);
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [availableTime, setavailableTime] = useState('');
  useEffect(() => {
    fetchUserData(id)
      .then((list) => {
        setInitValue(list[0]);
        setImage(list[1]);
        setEmail(list[2]);
        setavailableTime(list[3]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // // console.log(initValue[13] + id.toString());
  // const availableTime = initValue[13];
  // // console.log(availableTime);
  // console.log('1');
  // console.log(initValue);
  // console.log('2');
  // initValue.pop();
  // console.log(initValue);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Grid container sx={style} spacing={3}>
        <Button
          onClick={handleClose}
          sx={{
            position: 'sticky',
            top: '0',
            pt: 0,
            height: '8%',
            width: '90%',
            zIndex: 1,
            display: { xs: 'block', sm: 'none', md: 'none', lg: 'none' },
          }}
        >
          <ExpandMoreIcon />
        </Button>
        <Button
          onClick={handleClose}
          sx={{
            position: 'absolute' as 'absolute',
            top: 0,
            pt: 3,
            pb: 3,
            pr: 5,
            pl: 5,
            right: '0%',
            zIndex: 1,
            display: { xs: 'none', sm: 'block', md: 'block', lg: 'block' },
          }}
        >
          <CloseIcon />
        </Button>