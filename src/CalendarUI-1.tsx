import {
  Box, Paper, Button, Card, FormControlLabel, Grid, List, ListItem, ListItemText, Switch, Typography,
  Icon, IconButton, Table, TableHead, TableRow, TableCell, TableBody,
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
import RectangleIcon from '@mui/icons-material/Rectangle';
import getRolesFromJwt from 'src/common/functions/getRolesFromJwt';

interface DayButtonProps {
  day: number;
  onSelect: (day: number) => void;
  timePeriod: 'morning' | 'afternoon' | 'full day' | null;
  open: boolean;
  color: string | null;
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
  id: number | null;
}

function CalendarUI({ id }: CalendarUIProps) {
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

  const changeMonth = (offset: number) => {
    setDate(new Date(date.setMonth(date.getMonth() + offset)));
    setSelectedColors({});
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

  const handleSave = () => {
    if (tempColor && selectedDate !== null) {
      setSelectedColors((prevColors) => ({
        ...prevColors,
        [selectedDate]: tempColor,
      }));
      setSelectedTimePeriods((prevTimePeriods) => ({
        ...prevTimePeriods,
        [selectedDate]: tempTimePeriod,
      }));
    }
    setOpen(false);
  };

  const handleClose = () => {
    if (selectedColor && selectedDate) {
      setSelectedColors((prevColors) => ({
        ...prevColors,
        [selectedDate]: selectedColor,
      }));
    }
    setOpen(false);
    setSelectedColor(null);
  };

  const renderDays = () => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const startDay = startOfMonth.getDay();

    const days = [];
    let dayCount = 1;

    for (let i = 0; i < 6; i += 1) {
      const week = [];
      for (let j = 0; j < 7; j += 1) {
        if ((i === 0 && j < startDay) || dayCount > daysInMonth) {
          week.push(<TableCell key={j} />);
        } else {
          week.push(
            <DayButton
              key={j}
              day={dayCount}
              onSelect={handleDateClick}
              open={open}
              color={selectedColors[dayCount]}
              timePeriod={selectedTimePeriods[dayCount] || null}
            />,
          );
          dayCount += 1;
        }
      }
      days.push(<TableRow key={i}>{week}</TableRow>);
    }
    return days;
  };