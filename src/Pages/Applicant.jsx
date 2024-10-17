import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Alert, IconButton, InputAdornment, MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect } from 'react';
import moment from 'moment';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Bar from '../Bar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Badge } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Modal from 'react-bootstrap/Modal';
import DescriptionIcon from '@mui/icons-material/Description';
import BlockIcon from '@mui/icons-material/Close';
import VerifiedIcon from '@mui/icons-material/Verified';
import {
    Dialog,
    Drawer,





} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import Swal from 'sweetalert2'

const drawerWidth = 280;

export default function JobPanel() {


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const [rows, setrows] = useState([])
    const [showResume, setShowResume] = useState(false);
    const [modelImage, setModalImage] = useState()
    const [documentUrl, setDocumentUrl] = useState()

    const jobtypes = [
        {
            value: 'Full-time',
            label: 'Full-time',
        },
        {
            value: 'Part-time',
            label: 'Part-time',
        },
        ,

    ];

    const jobTitleList = [
        "Software Developer", "IT Support Specialist", "System Admin", "Network Engineer", "Database Administrator",
        "Database Administrator", "DevOps Engineer", "Cloud Architect", "Cybersecurity Analyst", "Technical Support Engineer",
        "IT Project Manager", "Full-Stack Developer", "IT Consultant", "Front End Developer", "Back End Developer", "IT Operations Manager",
        "IT Analyst", "Machine Learning Engineer", "Python Developer", "Java Developer", "Nodejs Developer", "Content Writer", "Blog Writer",
        "Content Editor", "HR Manager", "YouTube Content Creator", "Telecaller", "Sales & Marketing", "Tutor"
    ];

const status=['shortlisted', 'Selected', 'attended', 'rejected','not-attended','not-responding','pending']
    useEffect(() => {
        getAplicantDetails();
    }, [])

    const getAplicantDetails = () => {
        axios.get('http://localhost:5000/application/getAllApplicant')
            .then(response => {
                setrows(response.data)
                console.log(rows);

            })
    }

    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const formattedDay = day < 10 ? '0' + day : day;
        const formattedMonth = month < 10 ? '0' + month : month;
        return `${formattedDay}-${formattedMonth}-${year}`;
    }


    const handleShow = (image) => {
        setModalImage(image)
        setShow(true)
    };

    const handleResume = async (data) => {
        setShowResume(true)

       setDocumentUrl(data.resume)
    }
const handleClosee = () => {
    setShowResume(false)
}

const selectedCandidate = (candidateId) => {
    axios.post(`http://localhost:5000/application//setApplicantStatusSelected/${candidateId}`)
    .then(response => {
       
        console.log(response);
        Swal.fire({
            title: "Selected!",
            text: "Candidate has been selected Successfully!",
            icon: "success"
          });
        getAplicantDetails();

    })
}

const rejectedCandidate = (candidateId) => {
    axios.post(`http://localhost:5000/application//setApplicantStatusRejected/${candidateId}`)
    .then(response => {
       
        console.log(response);
        Swal.fire({
            title: "Rejected!",
            text: "Candidate has been Rejected!",
            icon: "error"
          });
        getAplicantDetails();

    })
}


return (
    <>
        <div className='d-md-block d-none'>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`,
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                        color: 'black'
                    }}
                >
                    <Toolbar sx={{ mt: 3, fontFamily: '"Baskervville SC", serif', }}>
                        <Typography variant="h4" noWrap component="div" style={{ fontFamily: '"Baskervville SC", serif',width:'500px' }}>
                            Applied Candidates
                        </Typography>
<div className='justify-content-end w-100 row mt-2 me-3' ><div className='col-4'> <TextField 
                            id="outlined-basic"
                             label="filter by status" 
                             fullWidth
                             select
                             size='small'
                           
                            name='status'
                          
                            slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                {/* <WorkIcon /> */}
                                            </InputAdornment>
                                        ),
                                    },
                                }} variant="outlined" >
                                   {status.map((option) => (
            <MenuItem key={option} value={option}>
              {option }
            </MenuItem> ))}
                                  </TextField></div><div className='col-4'><TextField 
                            id="outlined-basic"
                             label="Filter by job" 
                             fullWidth
                             size='small'
                             select
                            
                            name='status'
                           
                            slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                {/* <WorkIcon /> */}
                                            </InputAdornment>
                                        ),
                                    },
                                }} variant="outlined" >
                                   {jobTitleList.map((option) => (
            <MenuItem key={option} value={option}>
              {option }
            </MenuItem> ))}
                                  </TextField></div></div>
                    </Toolbar>
                </AppBar>

                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3,mt:5 }}
                >
                    <Toolbar />
                    <TableContainer component={Paper} sx={{ mt: 5 }}>
                        <Table sx={{ minWidth: 650, boxShadow: 'none', border: 'none', }} aria-label="simple table">
                            <TableHead sx={{ backgroundColor: '#f4f4f4', color: 'black' }}>
                                <TableRow >
                                    <TableCell sx={{ color: 'black' }} align='center' style={{ fontFamily: '"Baskervville SC", serif' }} >Profile</TableCell>
                                    <TableCell align="center" sx={{ color: 'black' }} style={{ fontFamily: '"Baskervville SC", serif' }}>Name</TableCell>
                                    <TableCell align="center" sx={{ color: 'black' }} style={{ fontFamily: '"Baskervville SC", serif' }}>Contact</TableCell>
                                    <TableCell align="center" sx={{ color: 'black' }} style={{ fontFamily: '"Baskervville SC", serif' }}>Role</TableCell>
                                    <TableCell align="center" sx={{ color: 'black' }} style={{ fontFamily: '"Baskervville SC", serif' }}>Applied Date</TableCell>
                                    <TableCell align="center" sx={{ color: 'black' }} style={{ fontFamily: '"Baskervville SC", serif' }}>Status</TableCell>
                                    <TableCell align="center" sx={{ color: 'black' }} style={{ fontFamily: '"Baskervville SC", serif' }}>Actions</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" align='center' style={{ fontFamily: '"Baskervville SC", serif', fontWeight: '550' }}>

                                            <Avatar alt="User Image" src={`http://localhost:5000/application/image/${row.image}`} sx={{ width: 50, height: 50, textAlign: 'center', cursor: 'pointer' }} onClick={() => {
                                                handleShow(row.image)
                                            }} />
                                        </TableCell>
                                        <TableCell align="center" style={{ fontFamily: '"Baskervville SC", serif', fontWeight: '750', }}>
                                            {row.applicant}
                                        </TableCell>
                                        <TableCell align="center" sx={{ color: 'grey' }} style={{ fontWeight: '750', fontFamily: '"Baskervville SC", serif' }}>{row.mobilenumber}</TableCell>
                                        <TableCell align="center" sx={{ color: 'grey' }} style={{ fontFamily: '"Baskervville SC", serif', fontWeight: '750' }}>{row.job.jobTitle}</TableCell>
                                        <TableCell align="center" style={{ color: 'green', fontWeight: '750', fontFamily: '"Baskervville SC", serif' }}> {formatDate(row.createdAt)}</TableCell>
                                        <TableCell align="center" sx={{color: 
      row.status === 'pending' ? 'black' :
      row.status === 'Selected' ? 'green' :
      row.status === 'rejected' ? 'red' : '#f6f6f6', }} style={{ fontWeight: '700', fontFamily: '"Baskervville SC", serif', }}><Badge pill className='p-2 border rounded' sx={{ backgroundColor: '#f6f6f6' }} style={{ fontSize: '12.5px' }}>
                                            {row.status}
                                        </Badge></TableCell>
                                        <TableCell align="center">
                                        {
                                             row.status === 'pending'?
                                             <div>
                                             <DescriptionIcon sx={{ color: 'yellowgreen', cursor: 'pointer' }}
                                            onClick={() => { handleResume(row) }} />&nbsp;&nbsp;&nbsp;&nbsp;<BlockIcon sx={{ color: 'red', cursor: 'pointer' }} onClick={()=>{ rejectedCandidate(row._id)}} />&nbsp;&nbsp;&nbsp;&nbsp;
                                            <VerifiedIcon sx={{ color: 'green', cursor: 'pointer' }} onClick={()=>{ selectedCandidate(row._id)}}/>
                                            </div> :<div></div>
                                        }
                                        {
                                             row.status === 'Selected' ? <div><DescriptionIcon sx={{ color: 'yellowgreen', cursor: 'pointer' }}
                                             onClick={() => { handleResume(row) }} />&nbsp;&nbsp;&nbsp;&nbsp;<PersonIcon sx={{ color: 'blue', cursor: 'pointer' }}  />&nbsp;&nbsp;&nbsp;&nbsp;
                                             
                                             </div> :<div></div>
                                        }
                                        {
                                            
                                             row.status === 'rejected' ?<div> <DescriptionIcon sx={{ color: 'yellowgreen', cursor: 'pointer' }}
                                             onClick={() => { handleResume(row) }} />
                                             
                                             </div> :<div></div>
                                        }
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Box>

            </Box>
        </div>


        <Modal show={show} onHide={handleClose} size="sm" style={{ marginTop: '100px' }}>


            <img src={`http://localhost:5000/application/image/${modelImage}`} alt="" />
        </Modal>

        <Dialog
            open={showResume}
            onClose={handleClose}
            fullWidth={true}
            maxWidth="md"
        >
            <Drawer
                variant="persistent"
                anchor="left"
                open={showResume}
                PaperProps={{
                    style: { width: 500, backgroundColor: 'white' },
                }}
            >
                <div style={{ padding: '20px',display:'flex',justifyContent:'end' }}>
                    {/* <Typography variant="body1" style={{ fontWeight: 500, fontSize: '17px' }}>
                        Applied for:
                    </Typography>&nbsp;&nbsp;&nbsp;
                    <Typography
                        
                        pill
                       
                        sx={{ fontSize: '17px', fontWeight: 700,backgroundColor:'red',borderRadius:'20px',padding:'5px' }}
                    >software developer</Typography> */}
                    <IconButton
                        onClick={handleClosee}
                        style={{ float: 'right' }}
                    >
                        <CloseIcon />
                    </IconButton>
                </div>

                <Typography
                    variant="h4"
                    style={{ fontWeight: 600, paddingLeft: '20px', paddingTop: '10px' }}
                >

                </Typography>

                <Card>
                    <iframe
                        src={`http://localhost:5000/application/resume/${documentUrl}`}
                        width="100%"
                        height="600px"
                        frameBorder="0"
                        title="Resume Document"
                    />
                </Card>
            </Drawer>
        </Dialog>

        {/* mobile view */}
        <div className='d-md-none d-block'>
            <Bar />
            <Toolbar sx={{ mt: 2, fontFamily: '"Baskervville SC", serif' }}>
                        <Typography variant="h6" noWrap component="div" style={{ fontFamily: '"Baskervville SC", serif' }}>
                            Applied Candidates
                        </Typography>

                    </Toolbar>
            {rows.map((row, index) => (
                <div className="row justify-content-center mt-3 " key={index}>
                    <div className="col-11 mb-1">
                        <Card sx={{ minWidth: 100,p:1 }}>
                            <CardContent style={{ display: 'flex' }}>
                                <Avatar alt="User Image" src={`http://localhost:5000/application/image/${row.image}`} sx={{ width: 50, height: 50, textAlign: 'center' }} onClick={() => {
                                    handleShow(row.image)
                                }} />&nbsp;&nbsp;&nbsp;
                                <Typography variant="h5" component="div" style={{ fontFamily: '"Baskervville SC", serif', }}>
                                    {row.applicant}
                                </Typography><br></br>

                                
                    <Badge pill className='p-1 border rounded' sx={{color: 
      row.status === 'pending' ? 'black' :
      row.status === 'Selected' ? 'green' :
      row.status === 'rejected' ? 'red' : '#f6f6f6',backgroundColor: '#f6f6f6' }} style={{ fontFamily: '"Baskervville SC", serif',marginLeft:'100px',marginBottom:'40px',fontWeight:550 }}>
                                            {row.status}
                                        </Badge>
                            </CardContent>

                          {row.status === 'Selected'?<CardActions sx={{ mb: 1 }}>
                                <button class="btn w-100 text-white" type="button" style={{ backgroundColor: 'yellowgreen ', display: 'flex', alignItems: 'center' }} > &nbsp;&nbsp;&nbsp;<DescriptionIcon style={{ marginRight: '8px' }} />Resume</button>

                                <button class="btn w-100 text-white" type="button" style={{ backgroundColor: '#007bff', display: 'flex', alignItems: 'center' }} > &nbsp;&nbsp;&nbsp;<PersonIcon style={{ marginRight: '8px' }} />Add User</button>


                            </CardActions>
                           : <CardActions sx={{ mb: 1 }}>
                                <button class="btn w-100 text-white" type="button" style={{ backgroundColor: 'green ', display: 'flex', alignItems: 'center' }} onClick={()=>{selectedCandidate(row._id)}}> &nbsp;&nbsp;&nbsp;<VerifiedIcon style={{ marginRight: '8px' }} />Selected</button>

                                <button class="btn w-100 text-white" type="button" style={{ backgroundColor: 'red', display: 'flex', alignItems: 'center' }} onClick={()=>{ rejectedCandidate(row._id)}}> &nbsp;&nbsp;&nbsp;<BlockIcon style={{ marginRight: '8px' }} />Rejected</button>


                            </CardActions>
                        }  

                        </Card>
                    </div>
                </div>
            ))}
        </div>

        <ToastContainer />
    </>
);
}
