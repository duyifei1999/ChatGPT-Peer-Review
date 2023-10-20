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

export default CalendarUI;