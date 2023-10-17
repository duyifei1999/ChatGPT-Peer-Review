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

                  <section>
                    <h2>
                      Content and copyright ownership
                    </h2>
                    <Typography>
                      Where the University determines that content or links on the UoMRecruitED website do not comply with its terms or applicable laws we may
                      immediately remove that content and block the relevant user's access to the UoMRecruitED website without notice.
                    </Typography>
                    <Typography>
                      You can report a copyright problem or non-compliant content on the UoMRecruitED website by emailing
                      {' '}
                      <Link href="mailto:copyright-office@unimelb.edu.au">
                        copyright-office@unimelb.edu.au
                      </Link>
                      .Please include your name, address, phone number and email address in the request, along with a description of the problem,
                      the copyright owner and (where applicable) your capacity to act on their behalf, and any supporting information that might be of assistance.
                    </Typography>
                  </section>

                  <section>
                    <h2>
                      Liability
                    </h2>
                    <Typography>
                      To the extent permitted by law:
                    </Typography>
                    <ul>
                      <li>
                        <Typography>
                          all conditions, warranties, guarantees, rights, remedies, liabilities or other terms that may be implied or conferred by statute,
                          custom or the general law that impose any liability or obligation on the University in relation to the UoMRecruitED website or its
                          content are expressly excluded under these and any supplementary terms; and
                        </Typography>
                      </li>
                      <li>
                        <Typography>
                          the University has no liability to you or anyone else (including in negligence) for any type of loss, however incurred,
                          in connection with your use of the UoMRecruitED website or its content, including (without limitation) loss of profits, loss of revenue,
                          loss of goodwill, loss of customers, loss of or damage to reputation, loss of capital, downtime costs, loss under or in relation to any other contract,
                          loss of data, loss of use of data or any direct, indirect, economic, special or consequential loss, harm, damage, cost or expense (including legal fees).
                        </Typography>
                      </li>
                    </ul>
                  </section>

                  <section>
                    <h2>
                      Governing law and compliance
                    </h2>
                    <Typography>
                      You must comply with all laws applicable to your access and use of the UoMRecruitED website.
                      If you access the UoMRecruitED website from outside Australia you must comply with all laws in that country which apply to that access and use.
                    </Typography>
                    <Typography>
                      These terms, the supplementary terms and your use of each University website are governed by the laws of the State of Victoria,
                      Australia and you irrevocably and unconditionally submit to the exclusive jurisdiction of the courts of Victoria, Australia.
                    </Typography>
                  </section>

                  <section>
                    <h2>
                      Changes to Terms
                    </h2>
                    <Typography>
                      We may change these terms and any supplementary terms on the UoMRecruitED websit at any time without notice to you.
                    </Typography>
                    <Typography>
                      If there are inconsistencies between these terms and any supplementary terms, these terms will take precedence unless otherwise indicated.
                    </Typography>
                  </section>

                  <section>
                    <h2>
                      Privacy policy
                    </h2>
                    <Typography>
                      We deal with personal information in accordance with the University's
                      {' '}
                      <Link href="https://policy.unimelb.edu.au/MPF1104/">
                        privacy policy
                      </Link>
                      .Please see our website privacy statement  for further information.
                    </Typography>
                  </section>
                </div>
              </div>
              <div>
                <footer style={{ textAlign: 'center', color: '#0572e1' }}>
                  <Typography>Copyright © The University of Melbourne 2023</Typography>
                </footer>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
}

export default TermOfUse;
