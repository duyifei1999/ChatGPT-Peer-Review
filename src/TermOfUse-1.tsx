import React from 'react';
import { Box, Button, Checkbox, FormHelperText, Grid, Link, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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
  overflowY: 'auto',
  overflowX: 'hidden',
  justifyContent: 'center',
};

type Props = {
  formik: any;
};

function TermOfUse({ formik }: Props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleChange = (event: any) => {
    const { checked } = event.target;
    formik.setFieldValue('termOfUse', checked);
  };

  return (
    <div>
      <Typography variant="body1" component="span" align="center">
        <Checkbox onChange={handleChange} />
        I have read and agree to abide by the
        <Link href="src/components/Form#" onClick={handleOpen}> terms of use</Link>
        .
      </Typography>
      <FormHelperText>{formik.touched.termOfUse && formik.errors.termOfUse}</FormHelperText>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid container sx={style} spacing={3}>
          <Grid item direction="row">
            <Typography
              variant="h1"
              sx={{
                fontSize: 26,
                color: 'primary.main',
              }}
            >
              Terms of Use
            </Typography>
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
          </Grid>
          <Grid item xs={11} style={{ overflowY: 'auto' }}>
            <Box sx={{ fontSize: 16 }}>
              <div>
                <div>
                  <Typography>
                    These terms and conditions are between you and The University of Melbourne and govern your use of each University website operated by or on behalf of the University.
                    In addition to these terms, other supplementar terms set out on the UoMRecruitED may apply to your access and use of this website.
                    By accessing and using the UoMRecruitED website you agree to be bound by and comply with the applicable terms.
                  </Typography>

                  <section>
                    <h2>
                      Content and copyright ownership
                    </h2>
                    <Typography>
                      Copyright in UoMRecruitED website and content on those websites is owned by the University or its third party licensors.
                      Some content on UoMRecruitED may also be subject to other intellecutal property rights held by the University or a third party.
                    </Typography>
                  </section>

                  <section>
                    <h2>
                      Use of UoMRecruitED website and content
                    </h2>
                    <Typography>
                      You may only use content on the UoMRecruitED website for non-commerical purpose.
                      Unless otherwise indicated, you may save or print out a copy of that content for your own information, research or study, provided that you:
                    </Typography>
                    <ul>
                      <li>
                        <Typography>do not modify the content from how it appears on the UoMRecruitED; and</Typography>
                      </li>
                      <li>
                        <Typography>include the copyright notice "Copyright © The University of Melbourne 1994 - 2017" on the copy.</Typography>
                      </li>
                      <li>
                        <Typography>You must not:</Typography>
                      </li>
                      <li>
                        <Typography>use the UoMRecruitED website or content for any purpose which is unlawful or does not comply with these terms or any supplementary terms;</Typography>
                      </li>
                      <li>
                        <Typography>exercise the copyright in the whole or any part of the UoMRecruitED website except as permitted by statute or with the University's prior consent;</Typography>
                      </li>
                      <li>
                        <Typography>post any content on the UoMRecruitED website that infringes a third party's intellectual property rights or is defamatory, abusive or obscene;</Typography>
                      </li>
                      <li>
                        <Typography>use automated means to retrieve information from the UoMRecruitED website without our permission, for example, 'scraping';</Typography>
                      </li>
                      <li>
                        <Typography>post or otherwise submit any software, code or routine that is harmful or interferes with the operation or activities of the UoMRecruitED website;</Typography>
                      </li>
                      <li>
                        <Typography>decompile, disassemble, or reverse-engineer the software or services relating to the UoMRecruitED website;</Typography>
                      </li>
                      <li>
                        <Typography>use the UoMRecruitED website or information on the UoMRecruitED for the purposes or generating 'spam', or submit 'spam' through the UoMRecruitED; or</Typography>
                      </li>
                      <li>
                        <Typography>
                          do anything which would impose an unreasonably large or disproportionate load on the University's networks or interfere with the University's network security.
                        </Typography>
                      </li>
                    </ul>
                  </section>