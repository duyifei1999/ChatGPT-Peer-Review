import {
  Box, Paper, Button, Card, FormControlLabel, Grid, List, ListItem, ListItemText, Switch, Typography,
  IconButton, Table, TableHead, TableRow, TableCell, TableBody,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  Radio, RadioGroup, FormControl, FormLabel,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';
import { StatusCodes } from 'http-status-codes';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import CalendarUI from 'src/components/CalendarUI/CalendarUI';
import { getProfile, setPublish } from '../../utils/studentApi';
import Notification from '../ProfileView/StudentProfilePage/Notification';
import { blackLight, blueDark, blackDark } from '../../app/color';
import { availableMatch, courseMatch, courseProgressMatch, learningAreaMatch, locationsMatch, skillMatch } from '../../common/FieldsMatches/studentProfileFieldsMatch';
import { fieldFullNameConveter } from '../../common/functions/fieldFullNameConveter';

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
  'courseProgression', 'currentLocation', 'workWithChildren',
  'otherSkillExperience', 'locationOption', 'learningAreas',
  'available', 'image'];
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
  workWithChildren: 'Work with children:',
  otherSkillExperience: 'Skills:',
  locationOption: 'Location:',
  learningAreas: 'Learning areas:',
  available: 'Available to:',
  image: 'Image',
  modifiedTime: 'Last modified:',
};

let image: string;

async function fetchUserData() {
  const response = getProfile(localStorage.getItem('userId') || '');
  const { data } = await response;
  image = data.image;
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
  if (data.workWithChildren === true) {
    fields[9].value = 'Yes';
  } else { fields[9].value = 'No'; }
  return [fields, data.isPublic, data.modifiedTime];
}

function TimeTable() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [fieldInfo, setInfo] = useState<TextFieldInfo[]>([]);

  useEffect(() => {
    fetchUserData()
      .then((list) => {
        setInfo(list[0]);
        setLoading(list[1]);
        const givenTimestamp = new Date(list[2]);
        const currentTimestamp = new Date();
        const sixMonthsFromNow = new Date(givenTimestamp);
        sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
      })
      .catch((error) => {
        if (error.response.status >= StatusCodes.NOT_ACCEPTABLE) {
          localStorage.clear();
          navigate('/login');
        }
      });
  }, [navigate]);
  return (
    <Grid
      container
      sx={{
        padding: '16px',
        minHeight: '100vh',
        height: 'auto',
        minWidth: '365px',
        justifyContent: 'center',
      }}
    >
      <Grid
        item
        sm={12}
        md={4}
        lg={4}
        sx={{ height: 'auto', margin: '0 !important', padding: '0 !important', width: '100% !important' }}
      >
        <Box
          sx={{
            padding: '16px',
            width: 'auto',
            height: '98.5%',
          }}
        >
          <Card
            sx={{
              padding: '16px',
              minWidth: '343px',
              height: '100%',
            }}
          >
            <Typography
              variant="h1"
              sx={{ fontSize: 26, color: 'primary.main' }}
            >
              Preview
            </Typography>
            <Card sx={{
              mt: 2,
              minWidth: '300px',
              maxWidth: '300px',
              margin: '24px auto',
            }}
            >
              <br />
              <CardMedia
                component="img"
                src={image}
                style={{
                  objectFit: 'contain',
                  height: '300px',
                  backgroundColor: 'white',
                }}
              />
              <CardContent sx={{ backgroundColor: 'white', height: '150px', overflowY: 'auto', overflowX: 'hidden' }}>
                <Typography variant="body1" color={blueDark}>
                  {`${fieldInfo.at(0)?.value.toString()} ${fieldInfo.at(1)?.value.toString()}`}
                </Typography>
                <Typography variant="h6" color={blackDark}>
                  {fieldInfo.at(12)?.value}
                </Typography>
                <Typography
                  variant="body2"
                  color={blackLight}
                  sx={{
                    minWidth: '266px',
                    maxWidth: '266px',
                  }}
                >
                  {fieldInfo.at(13)?.value}
                </Typography>
              </CardContent>
            </Card>
            <Box sx={{ display: 'flex', justifyContent: 'center', height: 'fit-content ', marginTop: '50px', marginBottom: '20px' }}>
              <FormControlLabel
                sx={{
                  display: 'block',
                  mr: '16px',
                }}
                control={(
                  <Switch
                    checked={loading}
                    onChange={() => {
                      setLoading(!loading);
                      setPublish(localStorage.getItem('userId') || '');
                    }}
                    name="loading"
                    color="primary"
                  />
                )}
                label="Published"
              />
            </Box>
          </Card>
        </Box>
      </Grid>
      <Grid
        item
        sm={12}
        md={8}
        lg={8}
        sx={{ height: 'auto', margin: '0 !important', padding: '0 !important', width: '100% !important' }}
      >
        <Box
          sx={{
            padding: '16px',
            height: '98.5%',
            width: 'auto',
          }}
        >
          <Card
            sx={{
              padding: '16px',
              minWidth: '343px',
              height: '100%',
            }}
          >
            <Typography
              variant="h1"
              sx={{ fontSize: 26, color: 'primary.main' }}
            >
              TimeTable
            </Typography>
            <CalendarUI />
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
}

export default TimeTable;
