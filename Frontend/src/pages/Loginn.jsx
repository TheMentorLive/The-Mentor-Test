
// <div className="CourseContent">
// <h2>Course content</h2>
// <div className="flex">
//   <p>15 sections • 110 lectures • 21h 5m total length</p>
//   <h5 className="Expand">Expand all sectons</h5>
// </div>

// <div className="CourceMainBox">
//   <div className="CourceBoxs">
//     <List sx={{ width: "100%" }}>
//       <ListItemButton onClick={handleClick}>
//         <div className="OpenBox flex">
//           {open ? (
//             <ExpandLess className="openArrow" />
//           ) : (
//             <ExpandMore className="openArrow" />
//           )}
//           <h4>Intro to Course and Python</h4>
//           <span className="CourseCTime">2 lecture • 7 min</span>
//         </div>
//       </ListItemButton>
//       <Collapse in={open} timeout="auto" unmountOnExit>
//         <List component="div" disablePadding>
//           <ListItemButton sx={{ pl: 3 }}></ListItemButton>
//           <div className="AfterOpendiv">
//             <div className="flex ConDiv">
//               <PlayCircleFilledRoundedIcon className="playIcon" />
//               <p className="courseInfo">Course Info</p>
//             </div>
//             <div className="flex ConDiv">
//               <PlayCircleFilledRoundedIcon className="playIcon" />
//               <p className="courseInfo">Course Info</p>
//             </div>
//             <div className="flex ConDiv">
//               <PlayCircleFilledRoundedIcon className="playIcon" />
//               <p className="courseInfo">Course Info</p>
//             </div>
//           </div>
//         </List>
//       </Collapse>
//     </List>
//   </div>

//   <div className="CourceBoxs">
//     <List sx={{ width: "100%" }}>
//       <ListItemButton onClick={handleClick2}>
//         <div className="OpenBox flex">
//           {open ? (
//             <ExpandLess className="openArrow" />
//           ) : (
//             <ExpandMore className="openArrow" />
//           )}
//           <h4>Setup</h4>
//           <span className="CourseCTime">3 lecture • 17 min</span>
//         </div>
//       </ListItemButton>
//       <Collapse in={open} timeout="auto" unmountOnExit>
//         <List component="div" disablePadding>
//           <ListItemButton sx={{ pl: 3 }}></ListItemButton>
//           <div className="AfterOpendiv">
//             <div className="flex ConDiv">
//               <PlayCircleFilledRoundedIcon className="playIcon" />
//               <p className="courseInfo">Course Info</p>
//             </div>
//             <div className="flex ConDiv">
//               <PlayCircleFilledRoundedIcon className="playIcon" />
//               <p className="courseInfo">Course Info</p>
//             </div>
//             <div className="flex ConDiv">
//               <PlayCircleFilledRoundedIcon className="playIcon" />
//               <p className="courseInfo">Course Info</p>
//             </div>
//           </div>
//         </List>
//       </Collapse>
//     </List>
//   </div>

//   <div className="CourceBoxs">
//     <List sx={{ width: "100%" }}>
//       <ListItemButton onClick={handleClick}>
//         <div className="OpenBox flex">
//           {open ? (
//             <ExpandLess className="openArrow" />
//           ) : (
//             <ExpandMore className="openArrow" />
//           )}
//           <h4>Learning Numpy</h4>
//           <span className="CourseCTime">8 lecture • 1hr 7 min</span>
//         </div>
//       </ListItemButton>
//       <Collapse in={open} timeout="auto" unmountOnExit>
//         <List component="div" disablePadding>
//           <ListItemButton sx={{ pl: 3 }}></ListItemButton>
//           <div className="AfterOpendiv">
//             <div className="flex ConDiv">
//               <PlayCircleFilledRoundedIcon className="playIcon" />
//               <p className="courseInfo">Course Info</p>
//             </div>
//             <div className="flex ConDiv">
//               <PlayCircleFilledRoundedIcon className="playIcon" />
//               <p className="courseInfo">Course Info</p>
//             </div>
//             <div className="flex ConDiv">
//               <PlayCircleFilledRoundedIcon className="playIcon" />
//               <p className="courseInfo">Course Info</p>
//             </div>
//           </div>
//         </List>
//       </Collapse>
//     </List>
//   </div>
// </div>

// <div className="moreSection">
//   <h5>5 more section</h5>
// </div>

// {/* <hr />
//  <hr /> */}
// {/* ========================================================== */}
// {/* ----------------------------------------------------------- */}

// {/* <Accordion>
     
// <AccordionSummary
// expandIcon={<ExpandMoreIcon />}
// aria-controls="panel1a-content"
// id="panel1a-header"
// >

 
// <Typography><h4>Intro to Course and Python</h4></Typography>
// </AccordionSummary>
// <AccordionDetails>
// <Typography>
//   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
//   malesuada lacus ex, sit amet blandit leo lobortis eget.
// </Typography>
// </AccordionDetails>
// </Accordion> */}
// {/* --------------------------------------------------------------- */}

// {/* <Accordion>
     
//      <AccordionSummary
//        expandIcon={<ExpandMoreIcon />}
//        aria-controls="panel1a-content"
//        id="panel1a-header"
//      >
       
        
//        <Typography><h4>Setup</h4></Typography>
//      </AccordionSummary>
//      <AccordionDetails>
//        <Typography>
//          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
//          malesuada lacus ex, sit amet blandit leo lobortis eget.
//        </Typography>
//      </AccordionDetails>
//    </Accordion>
  
//    <Accordion>
     
//      <AccordionSummary
//        expandIcon={<ExpandMoreIcon />}
       
//        aria-controls="panel1a-content"
//        id="panel1a-header"
//      >
         
       
        
//        <Typography><h4>Learning Numpy</h4></Typography>
       
//      </AccordionSummary>
//      <AccordionDetails>
//        <Typography>
//          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
//          malesuada lacus ex, sit amet blandit leo lobortis eget.
//        </Typography>
//      </AccordionDetails>
     
//    </Accordion>
  
//    <Accordion>
     
//      <AccordionSummary
//        expandIcon={<ExpandMoreIcon />}
//        aria-controls="panel1a-content"
//        id="panel1a-header"
//      >
       
        
//        <Typography><h4>Intro to Course and Python</h4></Typography>
//      </AccordionSummary>
//      <AccordionDetails>
//        <Typography>
//          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
//          malesuada lacus ex, sit amet blandit leo lobortis eget.
//        </Typography>
//      </AccordionDetails>
//    </Accordion>
  

// <Accordion>
// <AccordionSummary
// expandIcon={<ExpandMoreIcon />}
// aria-controls="panel2a-content"
// id="panel2a-header"
// >
  
// <Typography>Accordion 2</Typography>
// </AccordionSummary>
// <AccordionDetails>
// <Typography>
//   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
//   malesuada lacus ex, sit amet blandit leo lobortis eget.
// </Typography>
// </AccordionDetails>
// </Accordion>
// <Accordion disabled>
// <AccordionSummary
// expandIcon={<ExpandMoreIcon />}
// aria-controls="panel3a-content"
// id="panel3a-header"
// >
// <Typography>Disabled Accordion</Typography>
// </AccordionSummary>
// </Accordion> */}

// {/* ================================================================ */}
// </div>