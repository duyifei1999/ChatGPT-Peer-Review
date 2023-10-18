<Grid
          item
          md={6}
          lg={6}
        >
          <CardMedia
            component="img"
            src={image}
            style={{
              objectFit: 'contain',
              display: 'grid',
              placeItems: 'center',
              width: '100%',
              maxHeight: '250px',
              backgroundColor: 'white',
            }}
          />
          <CalendarUI />
        </Grid>
        <Grid item md={6} lg={6} sx={{ pl: 0 }}>
          <Typography
            variant="h1"
            sx={{ fontSize: 26, color: 'primary.main' }}
          >
            {initValue.length ? `${initValue[0].value} ${initValue[1].value}` : ''}
          </Typography>
          <Grid
            container
          >
            <Grid
              item
              md={6}
              lg={6}
            >
              <List sx={{ width: '100%' }}>
                {initValue.slice(4, 11).map((field: TextFieldInfo) => (
                  <ListItem key={field.id} sx={{ pt: '4px', pb: '4px', pl: '0', pr: '0', width: '100%' }}>
                    <ListItemText
                      primary={field.label}
                      secondary={field.value || 'None'}
                      primaryTypographyProps={{ sx: { fontSize: 19 } }}
                      secondaryTypographyProps={{ sx: { fontSize: 17 } }}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid
              item
              sm={12}
              md={6}
              lg={6}
            >
              <List sx={{ width: '100%' }}>
                {initValue.slice(11, 14).map((field: TextFieldInfo) => (
                  <ListItem key={field.id} sx={{ pt: '4px', pb: '4px', pl: '0', pr: '0', width: '100%' }}>
                    <ListItemText
                      primary={field.label}
                      secondary={field.value || 'None'}
                      primaryTypographyProps={{ sx: { fontSize: 19 } }}
                      secondaryTypographyProps={{ sx: { fontSize: 17 } }}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={1}
            style={{ width: '250px', height: '250px' }}
          >
            <Grid item md={6} style={wordCloudStyle}>
              <div
                style={{ position: 'relative' }}
                role="button"
                tabIndex={0}
                onClick={() => setShowOptions(!showOptions)}
                onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setShowOptions(!showOptions);
                  }
                }}
              >
                <Box
                  position="absolute"
                  top={0}
                  left={10}
                  zIndex={1}
                  p={1}
                  bgcolor="white"
                  boxShadow={0}
                >
                  <Typography variant="h6">Review</Typography>
                </Box>
                <MyWordCloud currentWords={currentWords} setCurrentWords={setCurrentWords} />
              </div>
            </Grid>
            <Grid item md={6} style={reviewOptionStyle}>
              {showOptions && <ReviewOption setCurrentWords={setCurrentWords} />}
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
            <Button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                window.location.href = `mailto:${email}`;
                e.preventDefault();
                emailCount(localStorage.getItem('userId') || '');
              }}
              variant="contained"
              color="primary"
              sx={{
                mr: '16px',
                marginBottom: '10px',
                height: '5vh',
                width: '20vh',
                fontSize: '2vh',
              }}
            >
              Contact
            </Button>
          </Box>
        </Grid>
      </Grid >
    </Modal >
  );
}

export default ProfilePopupBox;
