import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuItem from '@mui/material/MenuItem';  
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; 
import WorkIcon from '@mui/icons-material/Work';
import CategoryIcon from '@mui/icons-material/Category'; 
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
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


const drawerWidth = 280;

export default function JobPanel() {

  const [show, setShow] = useState(false);
  const [value, setValue] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const [rows,setrows]=useState([])

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

  const jobTitleList=[
    "Software Developer", "IT Support Specialist", "System Admin", "Network Engineer", "Database Administrator",
    "Database Administrator", "DevOps Engineer", "Cloud Architect", "Cybersecurity Analyst", "Technical Support Engineer",
    "IT Project Manager", "Full-Stack Developer", "IT Consultant", "Front End Developer", "Back End Developer", "IT Operations Manager",
    "IT Analyst", "Machine Learning Engineer", "Python Developer", "Java Developer", "Nodejs Developer", "Content Writer", "Blog Writer",
    "Content Editor", "HR Manager", "YouTube Content Creator", "Telecaller", "Sales & Marketing", "Tutor"
];

const [jobData, setData]=useState({
  jobTitle:null,
  jobLocation:null,
  jobDescription:null,
  jobType:null,
  jobSalary:null,

})

const [singleJobDetail,setsingleJobDetail]=useState({
  jobTitle:null,
  jobLocation:null,
  jobDescription:null,
  jobType:null,
  jobSalary:null,
  jobId:null,
}
 )

 const [editorValue, setEditorValue] = useState('');

 const handleEditorChange = (value) => {
   setEditorValue(value);
 };

 const [jobDescriptionView,setjobDescriptionView]=useState()
 

const handleShow1 = (jobdetail) => {
  console.log(jobdetail);
  
    setsingleJobDetail({
      jobTitle:jobdetail.jobTitle,
      jobLocation:jobdetail.jobLocation,
      
      jobType:jobdetail.jobType,
      jobSalary:jobdetail.Salary,
      jobId:jobdetail._id
    });
    setjobDescriptionView(jobdetail.jobDescription)
  setShow1(true)};


const handleChange = (event) => {
  const {name,value}= event.target
  setData({...jobData,[name]:value})
      console.log(name, value);
      console.log(jobData);
}

const handleClick = () =>{
  let jobdata={
    jobTitle:jobData.jobTitle,
    jobDescription:editorValue,
    jobLocation:jobData.jobLocation,
    jobType:jobData.jobType,
    Salary:jobData.jobSalary
  }

  console.log(jobdata);
  

  axios.post('http://localhost:5000/job/addjobs',jobdata)
  .then(response => {
      toast.success("job added successful", {
          position: "top-center", 
        });
        console.log(response.data);
   setData({
    jobTitle:null,
    jobLocation:null,
    jobDescription:null,
    jobType:null,
    jobSalary:null,
  
  })     
   
  })
  .catch(error => {
    console.error('Error fetching data: ', error);
    toast.error('job added unsuccessfully',{
      position: "top-center",
  
    })
  });
}

useEffect(()=>{
  getJobDetails();
},[jobData])

const getJobDetails = () =>{
  axios.get('http://localhost:5000/job/getJobs')
  .then(response => {
    setrows(response.data)
    console.log(rows);
    
  })
}

const dateFormat=(date) =>{
  return moment(new Date(date), "YYYYMMDD").fromNow();

}
const handleDescriptionUpdate = (value) =>{
  setjobDescriptionView(value);
}

const handleUpdate = (event) => {
  const {name,value}= event.target
  setsingleJobDetail({...singleJobDetail,[name]:value})
      console.log(name, value);
      console.log(singleJobDetail);
}

const updateJobs = ()=>{
  let updateJob={
    jobTitle:singleJobDetail.jobTitle,
    jobDescription:jobDescriptionView,
    jobLocation:singleJobDetail.jobLocation,
    jobType:singleJobDetail.jobType,
    Salary:singleJobDetail.jobSalary
  }

  axios.put('http://localhost:5000/job/updatejob/'+singleJobDetail.jobId,updateJob)
  .then(response => {
    toast.success("update successful", {
        position: "top-center", 
      });
      console.log(response.data);
      getJobDetails();
      setsingleJobDetail({
  jobTitle:null,
  jobLocation:null,
  jobDescription:null,
  jobType:null,
  jobSalary:null,
  jobId:null,
})     
 
})
.catch(error => {
  console.error('Error fetching data: ', error);
  toast.error('update unsuccessfully',{
    position: "top-center",

  })
});
}

const copyToClipboard =(text) => {
  var jobUrl = 'http://localhost:5174/job/' + text
  console.log(jobUrl);
  
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(jobUrl).then(() => {
      toast.success("Link copied to clipboard", {
        position: "top-center", 
      });
    }).catch(err => {
      console.error('Could not copy text: ', err);
      toast.error('Failed to copy link',{
        position: "top-center",
    
      })
    });
  } else {
    const textArea = document.createElement('textarea');
    textArea.value = jobUrl;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      toast.success("Link copied to clipboard", {
        position: "top-center", 
      });
    } catch (err) {
      console.error('Could not copy text: ', err);
      toast.error('Failed to copy link',{
        position: "top-center",
    
      })
    }
    document.body.removeChild(textArea);
  }
}
  return (
    <>
    <div className='d-md-block d-none'>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`,
        backgroundColor: 'transparent',
        boxShadow: 'none' ,
      color:'black' }}
      >
        <Toolbar sx={{mt: 2,fontFamily:'"Baskervville SC", serif'}}>
          <Typography variant="h4" noWrap component="div" style={{fontFamily:'"Baskervville SC", serif'}}>
           All Jobs
          </Typography>
        </Toolbar>
      </AppBar>
      {/* <Drawer
      
        sx={{
          width: drawerWidth,
          backgroundColor: 'red',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
           backgroundColor:'red',
            
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <img style={{filter:'blur(2px)'}} src="data:image/jpeg;base64,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" alt="" />
        <Divider />
        <List style={{fontFamily:'"Baskervville SC", serif'}}>
          {['All jobs',  'Applicant'].map((text, index) => (
            <ListItem key={text} disablePadding style={{fontFamily:'"Baskervville SC", serif'}}>
              <ListItemButton>
                <ListItemIcon sx={{color:'white'}}>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{color:'white'}} style={{fontFamily:'"Baskervville SC", serif'}}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />

      </Drawer> */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <TableContainer component={Paper} sx={{mt: 5}}>
      <Table sx={{ minWidth: 650,boxShadow: 'none' ,border:'none', }} aria-label="simple table">
        <TableHead sx={{backgroundColor: '#f4f4f4',color:'black'}}>
          <TableRow >
            <TableCell sx={{color:'black'}} align='center'style={{fontFamily:'"Baskervville SC", serif'}} >Job Title</TableCell>
            <TableCell align="center" sx={{color:'black'}} style={{fontFamily:'"Baskervville SC", serif'}}>Location</TableCell>
            <TableCell align="center" sx={{color:'black'}} style={{fontFamily:'"Baskervville SC", serif'}}>Posted at</TableCell>
            <TableCell align="center" sx={{color:'black'}} style={{fontFamily:'"Baskervville SC", serif'}}>Actions</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align='center' style={{fontFamily:'"Baskervville SC", serif',fontWeight:'550'}}>
                {row.jobTitle}
              </TableCell>
              <TableCell align="center" style={{fontFamily:'"Baskervville SC", serif'}}>{row.jobLocation}</TableCell>
              <TableCell align="center" style={{fontFamily:'"Baskervville SC", serif'}}>{dateFormat(
row.updatedAt)}</TableCell>
              <TableCell align="center"><ContentCopyIcon  sx={{color:'red'}} onClick={()=>{copyToClipboard(row.
_id)}}/>&nbsp;&nbsp;&nbsp;&nbsp;<EditIcon sx={{color:'red'}} onClick={()=>{handleShow1(row)}}/>
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   
      </Box>
      
    </Box>
    </div>
    <Button className='mb-4 me-4 rounded-circle'  onClick={handleShow} style={{position:'fixed',bottom:'0',right:'0',backgroundColor:'red',border:'none'}}>
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
</svg>
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header className='p-0'>
        <img style={{filter:'blur(2px)'}} src="data:image/jpeg;base64,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" alt="" width={400} height={200} />
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div class="mt-4">
                            
                            <TextField 
                            id="outlined-basic"
                             label="Job Title" 
                             fullWidth
                             select
                            value={jobData.jobTitle}
                            name='jobTitle'
                            onChange={handleChange}
                            slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <WorkIcon />
                                            </InputAdornment>
                                        ),
                                    },
                                }} variant="outlined" >
                                   {jobTitleList.map((option) => (
            <MenuItem key={option} value={option}>
              {option }
            </MenuItem> ))}
                                  </TextField>
                            
                        </div>
                        
                        <div class="mt-4">
                            
                            <TextField 
                            id="outlined-basic"
                             label="Job Location" 
                             fullWidth
                            value={jobData.jobLocation}
                            name='jobLocation'
                            onChange={handleChange}
                            slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LocationOnIcon />
                                            </InputAdornment>
                                        ),
                                    },
                                }} variant="outlined" />
                            
                        </div>
                        <div class="mt-4">
                            
                            <TextField 
                            id="outlined-basic"
                             label="Job Type" 
                             select
                             fullWidth
                            value={jobData.jobType}
                            name='jobType'
                            onChange={handleChange}
                            slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CategoryIcon />
                                            </InputAdornment>
                                        ),
                                    },
                                }} variant="outlined" >
                                   {jobtypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
                                  </TextField>
                            
                        </div>
                        <div class="mt-4">
                            
                            <TextField 
                            id="outlined-basic"
                             label="Salary" 
                             fullWidth
                            value={jobData.jobSalary}
                            name='jobSalary'
                            onChange={handleChange}
                            slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AttachMoneyIcon />
                                            </InputAdornment>
                                        ),
                                    },
                                }} variant="outlined" />
                            
                        </div>
                        <div className='mt-4 mb-3'>
                          
                        <ReactQuill theme="snow"   
                        style={{ height: '250px' }}  value={editorValue}  name='jobDescription'
                        onChange={handleEditorChange} placeholder="Enter the job description here..."/>
                        </div>
                        
                        <div className="mt-5 text-center ">
                            <button class="btn w-100 text-white rounded-pill mt-5" type="button" style={{backgroundColor:'red'}} onClick={handleClick}>Add Job</button>
                        </div>
        </Offcanvas.Body>
      </Offcanvas>
      <Offcanvas show={show1} onHide={handleClose1} placement='end'>
        <Offcanvas.Header className='p-0'>
        <img style={{filter:'blur(2px)'}} src="data:image/jpeg;base64,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" alt="" width={400} height={200} />
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div class="mt-4">
                            
                            <TextField 
                            id="outlined-basic"
                             label="Job Title" 
                             fullWidth
                             select
                            value={singleJobDetail.jobTitle}
                            name='jobTitle'
                            onChange={handleUpdate}
                            slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <WorkIcon />
                                            </InputAdornment>
                                        ),
                                    },
                                }} variant="outlined" >
                                   {jobTitleList.map((option) => (
            <MenuItem key={option} value={option}>
              {option }
            </MenuItem> ))}
                                  </TextField>
                            
                        </div>
                       
                       
                        <div class="mt-4">
                            
                            <TextField 
                            id="outlined-basic"
                             label="Job Location" 
                             fullWidth
                            value={singleJobDetail.jobLocation}
                            name='jobLocation'
                            onChange={handleUpdate}
                            slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LocationOnIcon />
                                            </InputAdornment>
                                        ),
                                    },
                                }} variant="outlined" />
                            
                        </div>
                        <div class="mt-4">
                            
                            <TextField 
                            id="outlined-basic"
                             label="Job Type" 
                             select
                             fullWidth
                            value={singleJobDetail.jobType}
                            name='jobType'
                            onChange={handleUpdate}
                            slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CategoryIcon />
                                            </InputAdornment>
                                        ),
                                    },
                                }} variant="outlined" >
                                   {jobtypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
                                  </TextField>
                            
                        </div>
                        <div class="mt-4">
                            
                            <TextField 
                            id="outlined-basic"
                             label="Salary" 
                             fullWidth
                            value={singleJobDetail.jobSalary}
                            name='jobSalary'
                            onChange={handleUpdate}
                            slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AttachMoneyIcon />
                                            </InputAdornment>
                                        ),
                                    },
                                }} variant="outlined" />
                            
                        </div>
                        <div className='mt-4 mb-3'>
                          
                          <ReactQuill theme="snow"   
                          style={{ height: '250px' }}  value={jobDescriptionView}  name='jobDescription'
                          onChange={handleDescriptionUpdate} />
                          </div>
                        <div className="mt-4 text-center ">
                            <button className="btn w-100 text-white rounded-pill mt-5" type="button" style={{backgroundColor:'red'}} onClick={updateJobs}>update Job</button>
                        </div>
        </Offcanvas.Body>
      </Offcanvas>
      {/* mobile view */}
      <div className='d-md-none d-block'>
      <Bar/>
      {rows.map((job,index)=>(
        <div className="row justify-content-center mt-5" key={index}>
        <div className="col-10 ">
        <Card sx={{ minWidth: 100 }}>
      <CardContent>
        
        <Typography variant="h5" component="div" style={{fontFamily:'"Baskervville SC", serif'}}>
        {job.jobTitle}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mt:1 }} style={{fontFamily:'"Baskervville SC", serif'}}>📍{job.jobLocation}</Typography>
        
      </CardContent>
      
      <CardActions sx={{mb:1}}>
      <IconButton aria-label="add to favorites">
      <ContentCopyIcon  sx={{color:'red'}} onClick={()=>{copyToClipboard(job._id)}}/>
        </IconButton>
        <IconButton aria-label="share">
        <EditIcon sx={{color:'red'}} onClick={()=>{handleShow1(job)}}/>
        </IconButton>

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