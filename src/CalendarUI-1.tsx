import {
  Box, Paper, Button, Card, FormControlLabel, Grid, List, ListItem, ListItemText, Switch, Typography,
  Icon, IconButton, Table, TableHead, TableRow, TableCell, TableBody,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  Radio, RadioGroup, FormControl, FormLabel,
} from '@mui/material';
import React, { useEffect, useState, useCallback } from 'react';
import { all } from 'axios';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';
import { StatusCodes } from 'http-status-codes';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import RectangleIcon from '@mui/icons-material/Rectangle';
import getRolesFromJwt from 'src/common/functions/getRolesFromJwt';
import { getProfile, editProfile } from '../../utils/studentApi';
import {
  EMAIL_EXISTS_ERROR,
  INTERNAL_SERVER_ERROR,
  USERNAME_PASSWORD_MISMATCH_ERROR,
} from '../../common/constants/ErrorMessages';

interface DayButtonProps {
  day: number;
  onSelect: (day: number) => void;
  timePeriod: 'morning' | 'afternoon' | 'full day' | null;
  open: boolean;
  color: string | null;
}

// ... [previous code for enums and interfaces here]
enum AvailabilityType {
  ONLINE = 'online',
  ONSITE = 'onsite',
  NOT_AVAILABLE = 'not_available',
}

enum TimeOfDay {
  MORNING = 'morning',
  AFTERNOON = 'afternoon',
}

// A day's availability for a student
interface DayAvailability {
  morning: AvailabilityType;
  afternoon: AvailabilityType;
}

// Structure to represent a month's availability for a student
type MonthAvailability = Record<number, DayAvailability>;

// Structure to represent a year's availability for a student
type YearAvailability = Record<number, MonthAvailability>;

class StudentAvailability {
  private data: Record<number, YearAvailability> = {};

  constructor(jsonData?: string) {
    if (jsonData) {
      this.data = JSON.parse(jsonData).availability;
    }
  }

  // Set availability for a specific day, month, year, and time
  setAvailability(year: number, month: number, day: number, time: TimeOfDay, availability: AvailabilityType) {
    if (!this.data[year]) {
      this.data[year] = {};
    }

    if (!this.data[year][month]) {
      this.data[year][month] = {};
    }

    if (!this.data[year][month][day]) {
      this.data[year][month][day] = {
        morning: AvailabilityType.NOT_AVAILABLE,
        afternoon: AvailabilityType.NOT_AVAILABLE,
      };
    }

    this.data[year][month][day][time] = availability;
  }

  // Retrieve availability for a specific day, month, year, and time
  getAvailability(year: number, month: number, day: number, time: TimeOfDay): AvailabilityType {
    return this.data[year] && this.data[year][month] && this.data[year][month][day]
      ? this.data[year][month][day][time]
      : AvailabilityType.NOT_AVAILABLE;
  }

  // Convert the availability data to a JSON string
  toJSON(): string {
    return JSON.stringify({
      availability: this.data,
    });
  }
}

function getButtonBackgroundStyle(color: string | null, timePeriod: 'morning' | 'afternoon' | 'full day' | null) {
  if (!color) return 'inherit';

  if (timePeriod === 'morning') {
    return `linear-gradient(to bottom, ${color} 50%, transparent 50%, transparent`;
  }

  if (timePeriod === 'afternoon') {
    return `linear-gradient(to top, ${color} 50%, transparent 50%, transparent`;
  }

  return color;
}

function DayButton({ day, onSelect, timePeriod, open, color }: DayButtonProps) {
  return (
    <TableCell align="center" width="auto" style={{ padding: '10px 0px' }}>
      <Button
        onClick={() => onSelect(day)}
        style={{
          padding: '8px 4px',
          background: getButtonBackgroundStyle(color, timePeriod),
        }}
      >
        {day}
      </Button>
    </TableCell>
  );
}

interface CalendarUIProps {
  id: number;
  availableTime: string;
}

function CalendarUI({ id, availableTime }: CalendarUIProps) {
  // console.log('Value of id:', id);
  // console.log('availabletime: ', availableTime);
  const [open, setOpen] = useState(false);

  const [date, setDate] = useState(new Date());

  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const [selectedColors, setSelectedColors] = useState<Record<number, string | null>>({});

  const [tempColor, setTempColor] = useState<string | null>(null);

  const [selectedTimePeriods, setSelectedTimePeriods] = useState<Record<number, 'morning' | 'afternoon' | 'full day'>>({});

  const [tempTimePeriod, setTempTimePeriod] = useState<'morning' | 'afternoon' | 'full day'>('full day');

  const [userRole, setUserRole] = useState<'student' | 'not student'>('student');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const roles = getRolesFromJwt(token);
      if (roles[0] === 'student') {
        setUserRole('student');
      } else {
        setUserRole('not student');
      }
    }
  });

  async function fetchUserData() {
    const response = getProfile(id.toString());
    const { data } = await response;
    return data;
  }

  const changeMonth = (offset: number) => {
    setDate(new Date(date.setMonth(date.getMonth() + offset)));
    setSelectedColors({});
    fetchUserData().then((userData) => {
      console.log('month is', date.getMonth());
      const ogAvailableTime = userData.availableTime;
      const studentAvailablity = new StudentAvailability(ogAvailableTime);
      const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
      for (let day = 1; day <= daysInMonth; day += 1) {
        const morningAvailablity = studentAvailablity.getAvailability(date.getFullYear(), date.getMonth(), day, TimeOfDay.MORNING);
        const afternoonAvailablity = studentAvailablity.getAvailability(date.getFullYear(), date.getMonth(), day, TimeOfDay.AFTERNOON);
        if (morningAvailablity === AvailabilityType.ONSITE || afternoonAvailablity === AvailabilityType.ONSITE) {
          setSelectedColors((prevColors) => ({
            ...prevColors,
            [day]: '#45f253',
          }));
        } else if (morningAvailablity === AvailabilityType.ONLINE || afternoonAvailablity === AvailabilityType.ONLINE) {
          setSelectedColors((prevColors) => ({
            ...prevColors,
            [day]: '#2D7DF6',
          }));
        } else {
          setSelectedColors((prevColors) => ({
            ...prevColors,
            [day]: null,
          }));
        }
      }
      // setSelectedColors((prevColors) => ({
      //   ...prevColors,
      //   [selectedDate]: selectedColor,
      // }));
    });
  };

  const dayList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const renderDaysOfWeek = () => (
    <TableRow>
      {dayList.map((day) => (
        <TableCell style={{ padding: '10px 4px' }} width="auto" align="center" key={day}>
          {day}
        </TableCell>
      ))}
    </TableRow>
  );

  const handleDateClick = (day: number) => {
    if (userRole === 'student') {
      setSelectedDate(day);
      setTempColor(selectedColors[day] || null);
      setTempTimePeriod('full day');
      setOpen(true);
    }
  };

  const navigate = useNavigate();
  const [warning, setWarning] = useState({
    shown: false,
    message: '',
  });
  const [success, setSucces] = useState({
    shown: false,
    message: '',
  });

  const submitForm = useCallback(async (value: any) => {
    try {
      const jsonObj = {
        image: value.image,
        firstName: value.firstName,
        lastName: value.lastName,
        preferredName: value.preferredName,
        pronouns: value.pronouns,
        studentNumber: value.studentNumber,
        course: value.course,
        courseProgression: value.courseProgression,
        currentLocation: value.currentLocation,
        workWithChildren: value.workWithChild === 'Yes',
        otherSkillExperience: value.otherSkillExperience,
        locationOption: value.locationOption,
        learningAreas: value.learningAreas,
        available: value.available,
        availableTime: value.availableTime,
      };
// console.log('id is', id);
// console.log('jsonObj is', jsonObj);
// console.log('token is', localStorage.getItem('accessToken'));