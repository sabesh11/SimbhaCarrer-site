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
import { Alert, IconButton, InputAdornment, TextField } from '@mui/material';
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
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
    Dialog,
    Drawer,





} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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
                    <Toolbar sx={{ mt: 2, fontFamily: '"Baskervville SC", serif' }}>
                        <Typography variant="h4" noWrap component="div" style={{ fontFamily: '"Baskervville SC", serif' }}>
                            Applied Candidates
                        </Typography>

                    </Toolbar>
                </AppBar>

                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
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
                                        <TableCell align="center" sx={{ color: 'black' }} style={{ fontWeight: '700', fontFamily: '"Baskervville SC", serif', }}><Badge pill className='p-2 border rounded' sx={{ backgroundColor: '#f6f6f6' }} style={{ fontSize: '12.5px' }}>
                                            {row.status}
                                        </Badge></TableCell>
                                        <TableCell align="center"><DescriptionIcon sx={{ color: 'yellowgreen', cursor: 'pointer' }}
                                            onClick={() => { handleResume(row) }} />&nbsp;&nbsp;&nbsp;&nbsp;<BlockIcon sx={{ color: 'red', cursor: 'pointer' }} />&nbsp;&nbsp;&nbsp;&nbsp;
                                            <CheckCircleIcon sx={{ color: 'green', cursor: 'pointer' }} />
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
                <div style={{ padding: '20px' }}>
                    <Typography variant="body1" style={{ fontWeight: 500, fontSize: '17px' }}>
                        Applied for:
                    </Typography>
                    <Badge
                        // badgeContent={}
                        color="primary"
                        sx={{ padding: '8px', fontSize: '17px', fontWeight: 700 }}
                    />
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
            {rows.map((row, index) => (
                <div className="row justify-content-center mt-5" key={index}>
                    <div className="col-10 ">
                        <Card sx={{ minWidth: 100 }}>
                            <CardContent style={{ display: 'flex' }}>
                                <Avatar alt="User Image" src={`http://localhost:5000/application/image/${row.image}`} sx={{ width: 50, height: 50, textAlign: 'center' }} onClick={() => {
                                    handleShow(row.image)
                                }} />&nbsp;&nbsp;&nbsp;
                                <Typography variant="h5" component="div" style={{ fontFamily: '"Baskervville SC", serif', }}>
                                    {row.applicant}
                                </Typography><br></br>


                            </CardContent>

                            <CardActions sx={{ mb: 1 }}>
                                <button class="btn w-100 text-white" type="button" style={{ backgroundColor: 'yellowgreen ', display: 'flex', alignItems: 'center' }} > <DescriptionIcon style={{ marginRight: '8px' }} />Resume</button>

                                <button class="btn w-100 text-white" type="button" style={{ backgroundColor: 'red', display: 'flex', alignItems: 'center' }} ><BlockIcon style={{ marginRight: '8px' }} />Rejected</button>


                            </CardActions>


                        </Card>
                    </div>
                </div>
            ))}
        </div>

        <ToastContainer />
    </>
);
}
