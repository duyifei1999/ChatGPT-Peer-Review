const signupResponse = await editProfile(
  id.toString() || '',
  jsonObj,
  localStorage.getItem('accessToken') || '',
);
console.log('signupResponse: ', signupResponse);
if (signupResponse.status === StatusCodes.OK) {
  setWarning({
    shown: false,
    message: '',
  });
  setSucces({
    shown: true,
    message: 'Your profile has been updated.',
  });
  // window.location.reload();
  // setTimeout(() => {
  //   navigate('/');
  // }, 3000);
} else {
  const errorMsg = signupResponse.data.message;
  console.log('error is:', errorMsg);
}
} catch (error: any) {
  if (error.response) {
    if (error.response.status >= StatusCodes.INTERNAL_SERVER_ERROR) {
      setWarning({
        shown: true,
        message: INTERNAL_SERVER_ERROR,
      });
    }
    if (error.response.status === StatusCodes.CONFLICT) {
      setWarning({
        shown: true,
        message: EMAIL_EXISTS_ERROR,
      });
    }
    if (error.response.status === StatusCodes.UNAUTHORIZED) {
      setWarning({
        shown: true,
        message: USERNAME_PASSWORD_MISMATCH_ERROR,
      });
    }
  } else {
    setWarning({
      shown: true,
      message: 'Oops! Something went wrong.',
    });
  }
}
}, []);

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
    fetchUserData().then((userData) => {
      console.log('month is', date.getMonth());
      const ogAvailableTime = userData.availableTime;
      let availableType: AvailabilityType;
      if (tempColor === '#45f253') {
        availableType = AvailabilityType.ONSITE;
        console.log('onsite');
      } else if (tempColor === '#2D7DF6') {
        availableType = AvailabilityType.ONLINE;
        console.log('online');
      } else {
        availableType = AvailabilityType.NOT_AVAILABLE;
        console.log('not available');
      }
      let timeOfDay: TimeOfDay;
      let allDay = false;
      if (tempTimePeriod === 'morning') {
        timeOfDay = TimeOfDay.MORNING;
        allDay = false;
      } else if (tempTimePeriod === 'afternoon') {
        timeOfDay = TimeOfDay.AFTERNOON;
        allDay = false;
      } else {
        timeOfDay = TimeOfDay.MORNING;
        allDay = true;
      }
      const studentAvailablity = new StudentAvailability(ogAvailableTime);
      if (allDay) {
        studentAvailablity.setAvailability(date.getFullYear(), date.getMonth(), selectedDate, TimeOfDay.AFTERNOON, availableType);
      }
      studentAvailablity.setAvailability(date.getFullYear(), date.getMonth(), selectedDate, timeOfDay, availableType);
      // console.log('studentAvailablity is', studentAvailablity);
      const updatedUserData = { ...userData, availableTime: studentAvailablity.toJSON() };
      submitForm(updatedUserData);
    });
  }
  setOpen(false);
  console.log('selectedDate', selectedDate);
  console.log('tempColor', tempColor);
};

const handleClose = () => {
  console.log('closing');
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

return (
  <div style={{
    margin: '15px',
    padding: 0,
    boxSizing: 'border-box',
    fontSize: '2vm',
    width: 'auto',
    height: 'auto',
    backgroundColor: '#FFFFFF',
    userSelect: 'none',
    display: 'grid',
    placeItems: 'center',
  }}
  >

    <Paper elevation={3} style={{ overflowX: 'auto', width: '100%', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div>
          <IconButton onClick={() => changeMonth(-1)}><ArrowCircleUpIcon /></IconButton>
          <IconButton onClick={() => changeMonth(1)}><ArrowCircleDownIcon /></IconButton>
        </div>
        <Box display="flex" padding="8px 0px">
          <RectangleIcon style={{ color: '#45f253', padding: '0px 2px' }} />
          <Typography variant="body1" style={{ padding: '0px 2px' }}>OnSite</Typography>
          <RectangleIcon style={{ color: '#2D7DF6', padding: '0px 2px' }} />
          <Typography variant="body1" style={{ padding: '0px 2px' }}>Online</Typography>
          <Icon style={{
            background: 'linear-gradient(to bottom, #45f253 50%, transparent 50%, transparent)',
            width: '20px',
            height: '16px',
            margin: '4px 0px',
            padding: '0px 2px',
          }}
          />
          <Typography variant="body1" style={{ padding: '0px 2px' }}>Morning</Typography>
          <RectangleIcon style={{
            color: 'transparent',
            background: 'linear-gradient(to top, #45f253 50%, transparent 50%, transparent)',
            width: '20px',
            height: '16px',
            margin: '4px 0px',
            padding: '0px 2px',
          }}
          />
          <Typography variant="body1" style={{ padding: '0px 2px' }}>Afternoon</Typography>
        </Box>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={7}>
              {date.toLocaleString('default', { month: 'long' })}
              {date.getFullYear()}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ width: 'auto' }}>
          {renderDaysOfWeek()}
          {renderDays()}
        </TableBody>
      </Table>

      {(userRole === 'student' && open) && (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Status Change</DialogTitle>
          <DialogContent>
            <DialogContentText style={{ textAlign: 'center' }}>
              {selectedDate}
              {' '}
              {date.toLocaleString('default', { month: 'long' })}
              {' '}
              {date.getFullYear()}
            </DialogContentText>
            <FormControl component="fieldset" style={{ marginRight: '32px' }}>
              <FormLabel component="legend">Work Type:</FormLabel>
              <RadioGroup
                aria-label="color"
                name="color"
                value={tempColor}
                onChange={(event) => setTempColor(event.target.value)}
              >
                <FormControlLabel value="#45f253" control={<Radio />} label="OnSite" />
                <FormControlLabel value="#2D7DF6" control={<Radio />} label="Online" />
                <FormControlLabel value="inherit" control={<Radio />} label="None" />
              </RadioGroup>
            </FormControl>
            <FormControl component="fieldset" style={{ marginLeft: '32px' }}>
              <FormLabel component="legend">Time Period:</FormLabel>
              <RadioGroup
                aria-label="timePeriod"
                name="timePeriod"
                value={tempTimePeriod}
                onChange={(event) => setTempTimePeriod(event.target.value as 'morning' | 'afternoon' | 'full day')}
              >
                <FormControlLabel value="morning" control={<Radio />} label="Morning" />
                <FormControlLabel value="afternoon" control={<Radio />} label="Afternoon" />
                <FormControlLabel value="full day" control={<Radio />} label="Full Day" />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Paper>
  </div>
);
}
